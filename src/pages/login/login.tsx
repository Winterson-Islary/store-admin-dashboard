import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePermission } from "@/hooks/usePermission";
import { logout } from "@/http/api";
import { GetSelf, LoginUser } from "@/http/client";
import { useAuthStore } from "@/store";
import signInSchema from "@/validators/signIn-validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import type { z } from "zod";

const LoginPage = () => {
	const authStore = useAuthStore();
	const { isAllowed } = usePermission();
	const selfQuery = useQuery({
		queryKey: ["whoami"],
		queryFn: GetSelf,
		enabled: false,
	});
	const logoutMutation = useMutation({
		mutationKey: ["logout"],
		mutationFn: logout,
		onSuccess: async () => {
			authStore.logout();
			return;
		},
	});
	const loginMutation = useMutation({
		mutationKey: ["login"],
		mutationFn: LoginUser,
		onSuccess: async () => {
			console.info("Login Successful");
			const selfData = await selfQuery.refetch();
			if (!isAllowed(selfData.data ?? null)) {
				logoutMutation.mutate();
				return;
			}
			authStore.setUser(selfData.data ?? null);
			console.log("Userdata: ", authStore.User);
		},
	});
	const form = useForm<z.infer<typeof signInSchema>>({
		resolver: zodResolver(signInSchema),
		defaultValues: {
			email: "",
			password: "",
			remember: false,
		},
	});
	const onSubmit = (values: z.infer<typeof signInSchema>) => {
		console.info(values);
		loginMutation.mutate({
			email: values.email,
			password: values.password,
			remember: values.remember,
		});
	};
	return (
		<div className="h-screen w-full flex items-center justify-center">
			<Card className="w-[350px] h-min-[350px] flex flex-col items-center justify-center">
				<CardHeader>
					<CardTitle className="text-center font-bold text-2xl pb-2 flex gap-1 items-center justify-center">
						Sign In
					</CardTitle>
				</CardHeader>
				<CardContent className="flex flex-col gap-6 w-full">
					<Form {...form}>
						{loginMutation.isError && (
							<Alert>
								<AlertTitle className="font-bold">
									ERROR!
								</AlertTitle>
								<AlertDescription className="font-semibold">
									{loginMutation.error?.message.includes(
										"500",
									) ||
										(loginMutation.error?.message.includes(
											"401",
										) &&
											"Incorrect email or password.")}
								</AlertDescription>
							</Alert>
						)}
						<form
							onSubmit={form.handleSubmit((values) =>
								onSubmit(values),
							)}
							className="flex flex-col gap-6"
						>
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input
												type="text"
												placeholder="Email"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input
												type="password"
												placeholder="Password"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<section className="flex items-center justify-between ">
								<FormField
									control={form.control}
									name="remember"
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<section className="flex items-center gap-2">
													<Checkbox
														checked={field.value}
														onCheckedChange={
															field.onChange
														}
														id="remember-me"
													/>{" "}
													<Label htmlFor="remember-me">
														Remember me
													</Label>
												</section>
											</FormControl>

											<FormMessage />
										</FormItem>
									)}
								/>
								<Button variant="link">
									<a href="@">Forgot password</a>
								</Button>
							</section>
							{loginMutation.isPending ? (
								<Button disabled>
									<ReloadIcon className="mr-2 animate-spin" />{" "}
									Log in
								</Button>
							) : (
								<Button variant="default" type="submit">
									Log in
								</Button>
							)}
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	);
};

export default LoginPage;

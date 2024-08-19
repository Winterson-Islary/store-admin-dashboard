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
import { login, whoami } from "@/http/api";
import type { SelfData, UserLoginData } from "@/lib/types";
import signInSchema from "@/validators/signIn-validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import type { z } from "zod";

const LoginPage = () => {
	const selfQuery = useQuery({
		queryKey: ["whoami"],
		queryFn: GetSelf,
		enabled: false,
	});
	const mutation = useMutation({
		mutationKey: ["login"],
		mutationFn: LoginUser,
		onSuccess: async () => {
			console.info("Login Successful");
			selfQuery.refetch();
			console.log("Userdata: ", selfQuery.data);
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
		mutation.mutate({
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
						{mutation.isError && (
							<Alert>
								<AlertTitle className="font-bold">
									ERROR!
								</AlertTitle>
								<AlertDescription className="font-semibold">
									{mutation.error?.message}
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
							{mutation.isPending ? (
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

//* HELPER FUNCTIONS
const LoginUser = async (Data: UserLoginData) => {
	//TODO: SERVER CALL LOGIC
	const { data } = await login(Data);
	return data;
};

const GetSelf = async () => {
	const { data } = await whoami();
	return data as SelfData;
};

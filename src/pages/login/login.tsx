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
import signInSchema from "@/validators/signIn-validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";

const LoginPage = () => {
	const form = useForm<z.infer<typeof signInSchema>>({
		resolver: zodResolver(signInSchema),
		defaultValues: {
			username: "",
			password: "",
			remember: false,
		},
	});
	const onSubmit = (values: z.infer<typeof signInSchema>) => {
		console.info(values);
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
						<form
							onSubmit={form.handleSubmit((values) =>
								onSubmit(values),
							)}
							className="flex flex-col gap-6"
						>
							<FormField
								control={form.control}
								name="username"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input
												type="text"
												placeholder="Username"
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
							<Button variant="default" type="submit">
								Log in
							</Button>
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	);
};

export default LoginPage;

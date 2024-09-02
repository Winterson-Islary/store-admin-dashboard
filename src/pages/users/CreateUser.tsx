import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { type CreateUserData, CreateUserSchema } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";

const CreateUser = () => {
	const [passwordMatch, setPasswordMatch] = useState<boolean>(true);
	const passwordRef = useRef<HTMLInputElement>(null);
	const form = useForm<CreateUserData>({
		resolver: zodResolver(CreateUserSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
		},
	});
	const onSubmit = (values: CreateUserData) => {
		if (values.tenant === "none") {
			values.tenant = undefined;
		}
		const matchingPassword = passwordRef.current?.value === values.password;
		matchingPassword ? setPasswordMatch(true) : setPasswordMatch(false);
		if (!matchingPassword) {
			console.log("Passwords do not match");
			return;
		}
		console.log("Inside on Submit Success: ", values);
	};
	return (
		<div>
			<Dialog>
				<DialogTrigger>
					<div className="text-black  bg-[#dff265] hover:bg-[#daed62] flex gap-1 px-3 py-[0.35em] rounded-md items-center text-base w-[150px]">
						<Plus width={13} height={13} /> <span>CREATE USER</span>
					</div>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>CREATE NEW USER</DialogTitle>
						<DialogDescription>
							Provide valid user info for user creation
						</DialogDescription>
					</DialogHeader>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit((values) => {
								onSubmit(values);
							})}
						>
							<section className="flex flex-col gap-3">
								<FormField
									control={form.control}
									name="name"
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<div className=" grid w-full items-center gap-1.5">
													<Label htmlFor="name">
														Name
													</Label>
													<Input
														id="name"
														type="text"
														{...field}
													/>
												</div>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="email"
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<div className="grid w-full items-center gap-1.5">
													<Label htmlFor="email">
														Email
													</Label>
													<Input
														id="email"
														type="text"
														{...field}
													/>
												</div>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<section className="flex gap-5">
									<FormField
										control={form.control}
										name="role"
										render={({ field }) => (
											<FormItem>
												<FormControl>
													<div className="grid w-full max-w-sm items-center gap-1.5">
														<Label htmlFor="role">
															Role
														</Label>
														<Select
															onValueChange={
																field.onChange
															}
															defaultValue="customer"
														>
															<SelectTrigger
																id="role"
																className="w-[150px]"
															>
																<SelectValue placeholder="ROLE" />
															</SelectTrigger>
															<SelectContent>
																<SelectItem value="admin">
																	ADMIN
																</SelectItem>
																<SelectItem value="manager">
																	MANAGER
																</SelectItem>
																<SelectItem value="customer">
																	CUSTOMER
																</SelectItem>
															</SelectContent>
														</Select>
													</div>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="tenant"
										render={({ field }) => (
											<FormItem className="flex-grow">
												<FormControl>
													<div className="grid w-full max-w-sm items-center gap-1.5">
														<Label htmlFor="tenant">
															Tenant
														</Label>
														<Select
															onValueChange={
																field.onChange
															}
															defaultValue="none"
														>
															<SelectTrigger
																id="tenant"
																className="w-full"
															>
																<SelectValue placeholder="Select a Tenant" />
															</SelectTrigger>
															<SelectContent>
																<SelectItem
																	className="text-muted-foreground"
																	value="none"
																>
																	None
																</SelectItem>
																<SelectItem value="tenant1">
																	Tenant 1
																</SelectItem>
																<SelectItem value="tenant2">
																	Tenant 2
																</SelectItem>
																<SelectItem value="tenant3">
																	Tenant 3
																</SelectItem>
															</SelectContent>
														</Select>
													</div>
												</FormControl>
											</FormItem>
										)}
									/>
								</section>
								<FormField
									control={form.control}
									name="password"
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<div className="grid w-full items-center gap-1.5">
													<Label htmlFor="password">
														Password
													</Label>
													<Input
														id="password"
														type="password"
														{...field}
													/>
												</div>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<div className="grid w-full items-center gap-1.5">
									<Label htmlFor="retype-password">
										Confirm Password
									</Label>
									<Input
										ref={passwordRef}
										id="retype-password"
										type="password"
									/>
									{!passwordMatch && (
										<p className="text-destructive font-semibold text-[0.820rem]">
											Passwords do not match
										</p>
									)}
								</div>
								<Button type="submit" className="mt-5">
									SUBMIT
								</Button>
							</section>
						</form>
					</Form>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default CreateUser;

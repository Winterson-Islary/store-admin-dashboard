import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateUserData, CreateUserSchema, Tenants } from "@/lib/types";
import { useRef, useState } from "react";
import { useMutation, useQueryClient, UseQueryResult } from "@tanstack/react-query";
import { createUser } from "@/http/api";
import { TenantsList } from "@/pages/users/CreateUser";

const CreateUserModal = ({createUserQuery, setDialogOpen}: {createUserQuery: UseQueryResult<{data: Tenants[]}, Error>, setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>}) => {
	const [passwordMatch, setPasswordMatch] = useState<boolean>(true);
	const passwordRef = useRef<HTMLInputElement>(null);
	const queryClient = useQueryClient();
	const form = useForm<CreateUserData>({
		resolver: zodResolver(CreateUserSchema),
		defaultValues: {
			password: "",
		},
	});
	const createUserMutation = useMutation({
		mutationKey: ["usersMutate"],
		mutationFn: createUser,
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ["users"] });
			console.log("Query Invalidated");
			return;
		},
	});
	const onSubmit = async (values: CreateUserData) => {
		if (values.tenantId === "none") {
			values.tenantId = undefined;
		}
		const matchingPassword = passwordRef.current?.value === values.password;
		matchingPassword ? setPasswordMatch(true) : setPasswordMatch(false);
		if (!matchingPassword) {
			// console.log("Passwords do not match"); //! REMOVE LOG
			return;
		}
		// console.log("Inside on Submit Success: ", values); //! REMOVE LOG
		await createUserMutation.mutate(values);
	};
return (
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit((values) => {
								onSubmit(values);
								setDialogOpen((prev) => !prev);
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
														defaultValue={
															""
														}
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
														defaultValue={
															""
														}
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
															defaultValue={
																"customer"
															}
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
										name="tenantId"
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
															defaultValue={
																	"none"
															}
														>
															<SelectTrigger
																id="tenant"
																className="w-full"
															>
																<SelectValue placeholder="Select a Tenant" />
															</SelectTrigger>
															<SelectContent>
																{createUserQuery.isLoading ? (
																	<SelectItem value="none">
																		Loading...
																	</SelectItem>
																) : (
																	<>
																		<SelectItem
																			className="text-muted-foreground"
																			value="none"
																		>
																			None
																		</SelectItem>
																		{createUserQuery
																			.data
																			?.data && (
																			<TenantsList
																				tenants={
																					createUserQuery
																						.data
																						.data
																				}
																			/>
																		)}
																	</>
																)}
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
									<Button
										type="submit"
										className="mt-5"
										disabled={createUserQuery.isLoading}
									>
										SUBMIT
									</Button>
							</section>
						</form>
					</Form>
  )
}

export default CreateUserModal
import { updateUser } from "@/http/api";
import { Tenants, UpdateUser, UpdateUserSchema } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient, UseQueryResult } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Button } from "./ui/button";
import { TenantsList } from "@/pages/users/CreateUser";

const UpdateUserModal = ({
	currentEditUser,
	setCurrentEditUser,
	createUserQuery,
	setDialogOpen
}: {
	currentEditUser: UpdateUser | null;
	setCurrentEditUser: React.Dispatch<React.SetStateAction<UpdateUser | null>>;
	createUserQuery: UseQueryResult<{data: Tenants[]}, Error>
	setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
}) => {
	const queryClient = useQueryClient();
	const form = useForm<UpdateUser>({
		resolver: zodResolver(UpdateUserSchema),
		defaultValues: {
			id: currentEditUser?.id,
			name: currentEditUser?.name || "",
			email: currentEditUser?.email || "",
		}
	});

	const updateUserMutation = useMutation({
		mutationKey: ["updateUsersMutate"],
		mutationFn: updateUser,
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ["users"] });
			console.log("Query Invalidated");
			return;
		},
	})
	const onSubmit = async (values: UpdateUser) => {
		console.log("UPDATE USER PRESSED")
		if (values.tenantId === "none") {
			values.tenantId = undefined;
		}	
		await updateUserMutation.mutate(values);
	};
  return (
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit((values) => {
								console.log("HandleSubmit")
								onSubmit(values);
								setDialogOpen((prev) => !prev);
								setCurrentEditUser(null);
							})}
						>
							<section className="flex flex-col gap-3">
								<FormField
									control={form.control}
									name="id"
									render={() => (
										<FormItem />
									)}
								>
								</FormField>
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
															defaultValue={
																currentEditUser?.role ? currentEditUser?.role : "customer"
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
																currentEditUser?.tenantId ? currentEditUser.tenantId : "none"
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
									<Button
										type="submit"
										className="mt-5"
										disabled={createUserQuery.isLoading}
									>
										UPDATE
									</Button>
							</section>
						</form>
					</Form>
)
}

export default UpdateUserModal
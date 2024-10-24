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
import { createUser, getTenants } from "@/http/api";
import {
	type CreateUserData,
	CreateUserSchema,
	type Tenants,
	type UpdateUser,
} from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

const CreateUser = ({
	currentEditUser,
}: { currentEditUser: UpdateUser | null }) => {
	const [dialogOpen, setDialogOpen] = useState(false);
	const queryClient = useQueryClient();
	const [passwordMatch, setPasswordMatch] = useState<boolean>(true);
	const passwordRef = useRef<HTMLInputElement>(null);
	useEffect(() => {
		if (currentEditUser) {
			setDialogOpen(true);
		}
	}, [currentEditUser]);
	const form = useForm<CreateUserData>({
		resolver: zodResolver(CreateUserSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
		},
	});
	const createUserQuery = useQuery<{ data: Tenants[] }>({
		queryKey: ["tenants"],
		queryFn: () => {
			return getTenants("").then((res) => res.data);
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

	// console.log("Tenants List: ", createUserQuery.data?.data); //! LOG FOR DEBUGGING PURPOSES
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
		<div>
			<Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
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
															defaultValue="none"
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
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default CreateUser;

// Tenants List Display Component
const TenantsList = ({ tenants }: { tenants: Tenants[] }) => {
	return tenants.map((tenant) => (
		<SelectItem key={tenant.name} value={`${tenant.id}`}>
			{tenant.name}
		</SelectItem>
	));
};

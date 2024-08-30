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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	type CreateUserData,
	CreateUserSchema,
	type TFilterChange,
} from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Search } from "lucide-react";
import { useForm } from "react-hook-form";

const UsersFilter = ({ onFilterChange }: TFilterChange) => {
	const form = useForm<CreateUserData>({
		resolver: zodResolver(CreateUserSchema),
		defaultValues: {
			name: "",
			email: "",
			role: "customer",
			tenant: undefined,
		},
	});
	const onSubmit = (values: CreateUserData) => {
		console.log("Inside on Submit: ", values);
	};
	return (
		<div className="mb-2 flex gap-5 justify-between">
			<div className="flex gap-2">
				<div className="relative">
					<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
					<Input
						type="search"
						placeholder="Search User"
						className="appearance-none bg-background pl-8 shadow-none w-[200px]"
						onChange={(e) =>
							onFilterChange("searchFilter", e.target.value)
						}
					/>
				</div>
				<div className="flex gap-2">
					<Select
						onValueChange={(value) =>
							onFilterChange("roleFilter", value)
						}
					>
						<SelectTrigger className="w-[150px]">
							<SelectValue placeholder="ROLE" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="none">ROLE</SelectItem>
							<SelectItem value="admin">ADMIN</SelectItem>
							<SelectItem value="manager">MANAGER</SelectItem>
							<SelectItem value="customer">CUSTOMER</SelectItem>
						</SelectContent>
					</Select>
					<Select
						onValueChange={(value) =>
							onFilterChange("statusFilter", value)
						}
					>
						<SelectTrigger className="w-[150px]">
							<SelectValue placeholder="STATUS" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="none">STATUS</SelectItem>
							<SelectItem value="active">ACTIVE</SelectItem>
							<SelectItem value="inactive">INACTIVE</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</div>
			<div>
				<Dialog>
					<DialogTrigger>
						<div className="text-black  bg-[#dff265] hover:bg-[#daed62] flex gap-1 px-3 py-[0.35em] rounded-md items-center text-base w-[150px]">
							<Plus width={13} height={13} />{" "}
							<span>CREATE USER</span>
						</div>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>CREATE</DialogTitle>
							<DialogDescription>
								Create new user.
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
										name="role"
										render={({ field }) => (
											<FormItem>
												<FormControl>
													<Select
														onValueChange={
															field.onChange
														}
														defaultValue="customer"
													>
														<SelectTrigger className="w-[150px]">
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
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<Button type="submit">SUBMIT</Button>
								</section>
							</form>
						</Form>
					</DialogContent>
				</Dialog>
			</div>
		</div>
	);
};

export default UsersFilter;

import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import type { FilterParams, TPageStateChange } from "@/lib/types";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import CreateUser from "./CreateUser";
import UsersList from "./UsersList";

const UsersFilter = () => {
	const [pageState, setPageState] = useState<TPageStateChange>({
		curPage: 1,
		perPage: 5,
	});
	const [filterParams, setFilterParams] = useState<FilterParams>({});
	useEffect(() => {
		setPageState((prev: TPageStateChange) => {
			return { ...prev, ...filterParams, curPage: 1 };
		});
	}, [filterParams]);
	return (
		<main>
			<div className="mb-2 flex gap-5 justify-between">
				<div className="flex gap-2">
					<div className="relative">
						<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
						<Input
							type="search"
							placeholder="Search User"
							className="appearance-none bg-background pl-8 shadow-none w-[200px]"
							onChange={(e) =>
								setFilterParams((prev) => ({
									...prev,
									user: e.target.value,
								}))
							}
						/>
					</div>
					<div className="flex gap-2">
						<Select
							onValueChange={(value) =>
								setFilterParams((prev) => ({
									...prev,
									role: value === "none" ? undefined : value,
								}))
							}
						>
							<SelectTrigger className="w-[150px]">
								<SelectValue placeholder="ROLE" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="none">ROLE</SelectItem>
								<SelectItem value="admin">ADMIN</SelectItem>
								<SelectItem value="manager">MANAGER</SelectItem>
								<SelectItem value="customer">
									CUSTOMER
								</SelectItem>
							</SelectContent>
						</Select>
						<Select
							onValueChange={(value) =>
								setFilterParams((prev) => ({
									...prev,
									isActive:
										value === "active"
											? true
											: value === "inactive"
												? false
												: undefined,
								}))
							}
						>
							<SelectTrigger className="w-[150px]">
								<SelectValue placeholder="STATUS" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="none">STATUS</SelectItem>
								<SelectItem value="active">ACTIVE</SelectItem>
								<SelectItem value="inactive">
									INACTIVE
								</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</div>
				<div>
					<CreateUser />
				</div>
			</div>
			<div>
				<UsersList pageState={pageState} setPageState={setPageState} />
			</div>
		</main>
	);
};

export default UsersFilter;

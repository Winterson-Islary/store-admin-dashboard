import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import type { TFilterChange } from "@/lib/types";
import { Search } from "lucide-react";
import CreateUser from "./CreateUser";

const UsersFilter = ({ onFilterChange }: TFilterChange) => {
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
				<CreateUser />
			</div>
		</div>
	);
};

export default UsersFilter;

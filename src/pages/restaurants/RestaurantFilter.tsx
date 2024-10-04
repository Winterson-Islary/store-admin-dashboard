import { Input } from "@/components/ui/input";
import type { TenantFilterParams } from "@/lib/types";
import { Search } from "lucide-react";
import { useState } from "react";

const RestaurantFilter = () => {
	const [filterParams, setFilterParams] = useState<TenantFilterParams>({});
	return (
		<div className="flex gap-2">
			<div className="relative">
				<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
				<Input
					type="search"
					placeholder="Search Restaurant"
					className="appearance-none bg-background pl-8 shadow-none w-[200px]"
					onChange={(e) =>
						setFilterParams((prev) => ({
							...prev,
							search: e.target.value,
						}))
					}
				/>
			</div>
		</div>
	);
};

export default RestaurantFilter;

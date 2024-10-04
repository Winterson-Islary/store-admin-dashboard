import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";
import RestaurantList from "./RestaurantList";

const RestaurantFilter = () => {
	const [filterParams, setFilterParams] = useState<{ search: string }>({
		search: "",
	});
	const [pageState, setPageState] = useState({
		curPage: 1,
		perPage: 5,
	});
	return (
		<div className="flex flex-col gap-2">
			<div className="relative">
				<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
				<Input
					type="search"
					placeholder="Search Restaurant"
					className="appearance-none bg-background pl-8 shadow-none w-[300px]"
					onChange={(e) =>
						setFilterParams((prev) => ({
							...prev,
							search: e.target.value,
						}))
					}
				/>
			</div>
			<RestaurantList pageState={pageState} filterParams={filterParams} />
		</div>
	);
};

export default RestaurantFilter;

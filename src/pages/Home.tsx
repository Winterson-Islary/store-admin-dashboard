import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { useAuthStore } from "@/store";
import { BarChart4, Gift, Logs } from "lucide-react";

const Home = () => {
	const { User } = useAuthStore();
	return (
		<ScrollArea className="h-screen w-full">
			<div className="flex flex-col  h-screen w-full  p-2 ">
				<h1 className="text-lg font-bold md:text-3xl mt-5 px-7">
					Welcome, {User?.name}
				</h1>
				<main className="flex flex-col xl:flex-row mt-[5rem] justify-center gap-5 w-auto mx-auto">
					<div className="flex flex-col gap-5">
						<section className="flex justify-start gap-5">
							<Card className="px-2">
								<section className="flex flex-col justify-center items-start">
									<CardHeader className="pb-3">
										<CardTitle className="uppercase flex gap-2 items-end ">
											{" "}
											<Gift height={20} width={20} />{" "}
											<span>Total Orders</span>
										</CardTitle>
									</CardHeader>
									<CardContent>
										<div className="text-5xl font-bold">
											+12,453
										</div>
									</CardContent>
								</section>
							</Card>
							<Card className="px-2">
								<section className="flex flex-col justify-center items-center">
									<CardHeader className="pb-3 w-full">
										<CardTitle className="flex gap-2 items-end">
											{" "}
											<BarChart4 height={20} width={20} />{" "}
											<span className="uppercase">
												Total Sales
											</span>
										</CardTitle>
									</CardHeader>
									<CardContent>
										<div className="text-5xl font-bold ">
											$10,400
										</div>
									</CardContent>
								</section>
							</Card>
						</section>
						<section>
							<Card>
								<CardHeader className="px-7">
									<CardTitle className="uppercase">
										Sales
									</CardTitle>
									<CardDescription>
										Visualization of weekly sales
									</CardDescription>
								</CardHeader>
							</Card>
						</section>
					</div>
					<div>
						<Card>
							<CardHeader className="px-7">
								<CardTitle className="uppercase flex items-center gap-2">
									<Logs height={20} width={20} />
									<span>Recent Orders</span>
								</CardTitle>
								<CardDescription>
									Recent orders from your store
								</CardDescription>
							</CardHeader>
							<CardContent>
								<Table>
									<TableHeader>
										<TableRow>
											<TableHead className="w-[15rem]">
												CUSTOMER
											</TableHead>
											<TableHead className="w-[5rem]">
												AMOUNT
											</TableHead>
											<TableHead className="w-[5rem]">
												STATUS
											</TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										<TableRow>
											<TableCell className="font-bold w-[100px]">
												RAHUL
											</TableCell>
											<TableCell>$20</TableCell>
											<TableCell>DELIVERED</TableCell>
										</TableRow>
									</TableBody>
								</Table>
							</CardContent>
						</Card>
					</div>
				</main>
			</div>
		</ScrollArea>
	);
};

export default Home;

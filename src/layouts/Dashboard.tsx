import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { logout } from "@/http/api";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store";
import { useMutation } from "@tanstack/react-query";
import {
	Bell,
	CircleUser,
	Dot,
	Home,
	LineChart,
	Menu,
	Package,
	Package2,
	PartyPopper,
	Users,
} from "lucide-react";
import { Link, Navigate, Outlet, useLocation } from "react-router-dom";

const Dashboard = () => {
	const { User, logout: StoreLogout } = useAuthStore();
	const location = useLocation();
	const logoutMutation = useMutation({
		mutationKey: ["logout"],
		mutationFn: logout,
		onSuccess: async () => {
			StoreLogout();
			return;
		},
	});

	if (User === null) {
		return (
			<Navigate
				to={`/auth/login?returnTo=${location.pathname}`}
				replace
			/>
		);
	}
	const navItems = GetMenuItems(User.role);
	return (
		<div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] fixed">
			<div className="hidden border-r bg-muted/40 md:block">
				<div className="flex h-full max-h-screen flex-col gap-2">
					<div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
						<Link
							to="/"
							className="flex items-center gap-2 font-semibold"
						>
							<Package2 className="h-6 w-6" />
							<span className="">Pizza Corp.</span>
						</Link>
						<Button
							variant="outline"
							size="icon"
							className="ml-auto h-8 w-8"
						>
							<Bell className="h-4 w-4" />
							<span className="sr-only">
								Toggle notifications
							</span>
						</Button>
					</div>
					<div className="flex-1">
						<nav className="grid items-start px-2 text-sm font-medium lg:px-4">
							{navItems.map((item) => (
								<NavBarItem
									key={item.to}
									label={item.name}
									link={item.to}
									icon={item.icon}
								/>
							))}
						</nav>
					</div>
					<div className="mt-auto p-4">
						<Card x-chunk="dashboard-02-chunk-0">
							<CardHeader className="p-2 pt-0 md:p-4">
								<CardTitle>Upgrade to Pro</CardTitle>
								<CardDescription>
									Unlock all features and get unlimited access
									to our support team.
								</CardDescription>
							</CardHeader>
							<CardContent className="p-2 pt-0 md:p-4 md:pt-0">
								<Button size="sm" className="w-full">
									Upgrade
								</Button>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
			<div className="flex flex-col">
				<header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
					<Sheet>
						<SheetHeader>
							<SheetTitle hidden>Navbar</SheetTitle>
							<SheetDescription hidden>
								Navbar Container
							</SheetDescription>
						</SheetHeader>
						<SheetTrigger asChild>
							<Button
								variant="outline"
								size="icon"
								className="shrink-0 md:hidden"
							>
								<Menu className="h-5 w-5" />
								<span className="sr-only">
									Toggle navigation menu
								</span>
							</Button>
						</SheetTrigger>
						<SheetContent side="left" className="flex flex-col">
							<nav className="grid gap-2 text-lg font-medium mt-5">
								{navItems.map((item) => (
									<NavBarItem
										key={item.to}
										label={item.name}
										link={item.to}
										icon={item.icon}
									/>
								))}
							</nav>
							<div className="mt-auto">
								<Card>
									<CardHeader>
										<CardTitle>Upgrade to Pro</CardTitle>
										<CardDescription>
											Unlock all features and get
											unlimited access to our support
											team.
										</CardDescription>
									</CardHeader>
									<CardContent>
										<Button size="sm" className="w-full">
											Upgrade
										</Button>
									</CardContent>
								</Card>
							</div>
						</SheetContent>
					</Sheet>
					<div className="w-full flex items-center gap-10">
						<div className="flex items-center">
							<Dot
								height={40}
								width={40}
								className="text-green-400"
							/>
							<span className="-translate-x-2 text-sm font-medium pointer-events-none">
								{User.role === "admin" || User.role === "super"
									? "Global"
									: User.tenant?.address}
							</span>
						</div>
					</div>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant="secondary"
								size="icon"
								className="rounded-full"
							>
								<CircleUser className="h-5 w-5" />
								<span className="sr-only">
									Toggle user menu
								</span>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuLabel>My Account</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem>Settings</DropdownMenuItem>
							<DropdownMenuItem>Support</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem
								onClick={() => logoutMutation.mutate()}
							>
								Logout
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</header>
				<main className="">
					<Outlet />
				</main>
			</div>
		</div>
	);
};

export default Dashboard;

// Helper Functions

const NavBarItem = ({
	label,
	link,
	icon,
}: {
	label: string;
	link: string;
	icon: JSX.Element;
}) => {
	const location = useLocation();
	const isActive = location.pathname === link;

	return (
		<Link
			to={link}
			className={cn(
				"flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
				isActive && "text-primary bg-[#dff265] ",
			)}
		>
			{icon}
			{label}
		</Link>
	);
};

const GetMenuItems = (
	role: string,
): { name: string; to: string; icon: JSX.Element }[] => {
	const navItems = [
		{
			name: "Home",
			to: "/",
			icon: <Home className="h-4 w-4" />,
		},
		{
			name: "Users",
			to: "/users",
			icon: <Users className="h-4 w-4" />,
		},
		{
			name: "Restaurants",
			to: "/restaurants",
			icon: <LineChart className="h-4 w-4" />,
		},
		{
			name: "Products",
			to: "/products",
			icon: <Package className="h-4 w-4" />,
		},
		{
			name: "Promos",
			to: "/promos",
			icon: <PartyPopper className="h-4 w-4" />,
		},
	];

	if (role !== "admin" && role !== "super") {
		navItems.splice(1, 1);
	}

	return navItems;
};

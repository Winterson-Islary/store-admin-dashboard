import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const LoginPage = () => {
	return (
		<div className="h-screen w-full flex items-center justify-center">
			<Card className="w-[350px] h-[350px] flex flex-col items-center justify-center">
				<CardHeader>
					<CardTitle className="text-center font-bold text-xl pb-5">
						Sign In
					</CardTitle>
				</CardHeader>
				<CardContent className="flex flex-col gap-6 w-full">
					<Input type="text" placeholder="Username" />
					<Input type="password" placeholder="Password" />
					<section className="flex items-center justify-between ">
						<section className="flex items-center gap-2">
							<Checkbox id="remember-me" />
							<Label htmlFor="remember-me">Remember me</Label>
						</section>
						<Button variant="link">
							<a href="@">Forgot password</a>
						</Button>
					</section>
					<Button variant="default">Log in</Button>
				</CardContent>
			</Card>
		</div>
	);
};

export default LoginPage;

import CreateUserModal from "@/components/CreateUserModal";
import UpdateUserModal from "@/components/UpdateUserModal";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { SelectItem } from "@/components/ui/select";
import { getTenants } from "@/http/api";
import type { Tenants, UpdateUser } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";

const CreateUser = ({
	currentEditUser,
	setCurrentEditUser,
}: {
	currentEditUser: UpdateUser | null;
	setCurrentEditUser: React.Dispatch<React.SetStateAction<UpdateUser | null>>;
}) => {
	const isEditMode = !!currentEditUser;
	const [dialogOpen, setDialogOpen] = useState(false);
	useEffect(() => {
		if (currentEditUser) {
			setDialogOpen(true);
		}
	}, [currentEditUser]);
	const createUserQuery = useQuery<{ data: Tenants[] }>({
		queryKey: ["tenants"],
		queryFn: () => {
			return getTenants("").then((res) => res.data);
		},
	});
	function HandleOnOpenChange() {
		setCurrentEditUser(null);
		setDialogOpen((prev) => !prev);
	}

	return (
		<div>
			<Dialog open={dialogOpen} onOpenChange={HandleOnOpenChange}>
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
					{!isEditMode ? (
						<CreateUserModal
							createUserQuery={createUserQuery}
							setDialogOpen={setDialogOpen}
						/>
					) : (
						<UpdateUserModal
							createUserQuery={createUserQuery}
							setCurrentEditUser={setCurrentEditUser}
							currentEditUser={currentEditUser}
							setDialogOpen={setDialogOpen}
						/>
					)}
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default CreateUser;

// Tenants List Display Component
export const TenantsList = ({ tenants }: { tenants: Tenants[] }) => {
	return tenants.map((tenant) => (
		<SelectItem key={tenant.name} value={`${tenant.id}`}>
			{tenant.name}
		</SelectItem>
	));
};

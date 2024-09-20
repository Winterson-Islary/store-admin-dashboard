import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import type { PaginationData } from "@/lib/types";

const UserPagination = ({
	usersData,
	setPageState,
}: {
	usersData: PaginationData;
	setPageState: React.Dispatch<
		React.SetStateAction<{
			curPage: number;
			perPage: number;
		}>
	>;
}) => {
	const { curPage, perPage, count } = usersData;
	const pages = Math.ceil(count / perPage);
	const handleClick = (pageValue: number) => {
		setPageState((prev) => {
			return { ...prev, curPage: pageValue };
		});
	};
	return (
		<div>
			<Pagination>
				<PaginationContent>
					{curPage === 1 ? (
						<>
							<PaginationItem>
								<PaginationPrevious className="cursor-not-allowed opacity-50" />
							</PaginationItem>
							<PaginationItem>
								<PaginationLink
									onClick={() => handleClick(1)}
									isActive={curPage === 1}
									className="cursor-pointer"
								>
									1
								</PaginationLink>
							</PaginationItem>
							<PaginationItem>
								{pages !== 2 && (
									<PaginationLink
										onClick={() => handleClick(2)}
										className="cursor-pointer"
									>
										2
									</PaginationLink>
								)}
							</PaginationItem>
							<PaginationItem>
								{pages !== 3 && (
									<PaginationLink
										onClick={() => handleClick(3)}
										className="cursor-pointer"
									>
										3
									</PaginationLink>
								)}
							</PaginationItem>
							<PaginationItem>
								{pages > 3 && <PaginationEllipsis />}
							</PaginationItem>
						</>
					) : (
						<>
							<PaginationItem>
								<PaginationPrevious
									onClick={() => handleClick(curPage - 1)}
									className=" cursor-pointer"
								/>
							</PaginationItem>
							{curPage - 2 > 1 && (
								<>
									<PaginationItem>
										<PaginationLink
											onClick={() => handleClick(1)}
											className="cursor-pointer"
										>
											1
										</PaginationLink>
									</PaginationItem>
									<PaginationItem>
										<PaginationEllipsis />
									</PaginationItem>
								</>
							)}

							<PaginationItem>
								{curPage - 2 > 0 && (
									<PaginationLink
										onClick={() => handleClick(curPage - 2)}
										className="cursor-pointer"
									>
										{curPage - 2}
									</PaginationLink>
								)}
							</PaginationItem>
							<PaginationItem>
								<PaginationLink
									onClick={() => handleClick(curPage - 1)}
									className="cursor-pointer"
								>
									{curPage - 1}
								</PaginationLink>
							</PaginationItem>
							<PaginationItem>
								<PaginationLink
									onClick={() => handleClick(curPage)}
									isActive
									className="cursor-pointer"
								>
									{curPage}
								</PaginationLink>
							</PaginationItem>
							{curPage !== pages && (
								<PaginationItem>
									<PaginationEllipsis />
								</PaginationItem>
							)}
						</>
					)}
					{curPage !== pages ? (
						<>
							<PaginationItem>
								<PaginationLink
									onClick={() => handleClick(pages)}
								>
									{pages}
								</PaginationLink>
							</PaginationItem>
							<PaginationItem>
								<PaginationNext
									onClick={() => handleClick(curPage + 1)}
									className="cursor-pointer"
								/>
							</PaginationItem>
						</>
					) : (
						<PaginationItem>
							<PaginationNext className="cursor-not-allowed opacity-50" />
						</PaginationItem>
					)}
				</PaginationContent>
			</Pagination>
		</div>
	);
};

export default UserPagination;

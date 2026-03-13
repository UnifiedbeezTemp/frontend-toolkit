import Pagination from "../../../ui/Pagination";

interface ListsPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function ListsPagination({
  currentPage,
  totalPages,
  onPageChange,
}: ListsPaginationProps) {
  return (
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={onPageChange}
      className="border-none bg-transparent"
    />
  );
}

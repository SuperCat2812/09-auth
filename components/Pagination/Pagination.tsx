import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";

interface PaginationProps {
  handlePageClick: (nextPage: number) => void;
  pageCount: number;
  currentPage: number;
}
export default function Pagination({
  handlePageClick,
  pageCount,
  currentPage,
}: PaginationProps) {
  return (
    <ReactPaginate
      onPageChange={({ selected }) => handlePageClick(selected + 1)}
      forcePage={currentPage - 1}
      pageRangeDisplayed={pageCount}
      pageCount={pageCount}
      containerClassName={css.pagination}
      activeClassName={css.active}
      previousLabel="< previous"
      nextLabel="next >"
    />
  );
}

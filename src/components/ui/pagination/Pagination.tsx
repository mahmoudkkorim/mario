import React from "react";
import { useLocation, Link } from "react-router-dom";

import { PaginationInterface } from "../../../interfaces/public";

const Pagination = (props: PaginationInterface) => {
    const { items_per_page, total_pages } = props;

    const location = useLocation();
    const page = new URLSearchParams(location.search).get("page") || 1;

    const { search } = useLocation();
    const pathName = location.pathname;

    const currentPage = Number(page);
    let URL_WITHOUT_PAGE = pathName + search.split("&page")[0];
    !URL_WITHOUT_PAGE.includes("?") &&
        (URL_WITHOUT_PAGE = `${URL_WITHOUT_PAGE}?`);

    const pagesNumber = Math.ceil(total_pages / items_per_page);
    const pagesNumberMaping =
        pagesNumber <= 3
            ? Array.from({ length: pagesNumber }, (_, i) => i + 1)
            : Array.from({ length: pagesNumber }, (_, i) => i + 1).slice(
                  currentPage - 2 < 0 ? 0 : currentPage - 2,
                  currentPage + 1
              );

    return (
        <nav>
            <ul
                className={`${
                    pagesNumber === 1 && "hidden"
                } text-sm w-full flex justify-center mt-10 gap-1.5 sm:gap-3`}
            >
                <li className={`${currentPage === 1 && "hidden"}`}>
                    <Link
                        to={`${URL_WITHOUT_PAGE}&page=${currentPage - 1}`}
                        className="flex items-center justify-center px-2 sm:px-3 h-6 sm:h-8 ml-0 leading-tight text-gray-500 bg-white border border-darkGray/30 hover:shadow-lg hover:bg-lightDark/50 hover:text-white hover:border-darkGray/10 duration-300 rounded-md"
                    >
                        السابقه
                    </Link>
                </li>
                {/* first page */}
                {currentPage > 5 && (
                    <li>
                        <Link
                            to={`${URL_WITHOUT_PAGE}&page=1`}
                            className={`${
                                currentPage === 1
                                    ? "bg-darkGray/10 text-white border-darkGray/10"
                                    : "bg-white border-darkGray/30"
                            } flex items-center justify-center px-2 sm:px-3 h-6 sm:h-8 leading-tight text-gray-500 border hover:shadow-lg hover:bg-lightDark/50 hover:text-white hover:border-darkGray/10 duration-300 rounded-md`}
                        >
                            1{/* الاولى */}
                        </Link>
                    </li>
                )}

                {pagesNumberMaping.map(
                    (page, i) =>
                        page !== pagesNumber && (
                            <li key={i}>
                                <Link
                                    to={`${URL_WITHOUT_PAGE}&page=${page}`}
                                    className={`${
                                        currentPage === page
                                            ? "bg-darkGray/10 text-white border-darkGray/10"
                                            : "bg-white border-darkGray/30 "
                                    } flex items-center justify-center px-2 sm:px-3 h-6 sm:h-8 leading-tight text-gray-500 border hover:shadow-lg hover:bg-lightDark/50 hover:text-white hover:border-darkGray/10 duration-300 rounded-md`}
                                >
                                    {page}
                                </Link>
                            </li>
                        )
                )}
                {/* last page */}
                <li>
                    <Link
                        to={`${URL_WITHOUT_PAGE}&page=${pagesNumber}`}
                        className={`${
                            currentPage === pagesNumber
                                ? "bg-darkGray/10 text-white border-darkGray/10"
                                : "bg-white border-darkGray/30"
                        } flex items-center justify-center px-2 sm:px-3 h-6 sm:h-8 leading-tight text-gray-500 border hover:shadow-lg hover:bg-lightDark/50 hover:text-white hover:border-darkGray/10 duration-300 rounded-md`}
                    >
                        {pagesNumber}
                        {/* الاخيره */}
                    </Link>
                </li>
                <li
                    className={`${
                        pagesNumber > currentPage ? "inline" : "hidden"
                    }`}
                >
                    <Link
                        to={`${URL_WITHOUT_PAGE}&page=${currentPage + 1}`}
                        className="flex items-center justify-center px-2 sm:px-3 h-6 sm:h-8 leading-tight text-gray-500 bg-white border border-darkGray/30 hover:shadow-lg rounded-r-lg hover:bg-lightDark/50 hover:text-white hover:border-darkGray/10 duration-300 rounded-md"
                    >
                        التاليه
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;

import { useEffect, useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type PageInfo = {
    currentPage: number,
    hasNextPage: boolean,
    hasPreviousPage: boolean,
    itemCount: number,
    pageCount: number,
    perPage: number,
    totalCount: number
}

const showNumbers = [
    10, 50, 100, 300, 500, 700, 1000
];

const Pagination = ({ pageInfo, skip, take, setSkip, setTake }: { pageInfo: PageInfo, skip: any, take: any, setSkip: any, setTake: any }) => {
    const [pageNumbers, setPageNumbers] = useState<(number | string)[]>([]);

    useEffect(() => {
        const pageCount = pageInfo.pageCount;
        let numbers: (number | string)[] = [];
        if (pageCount <= 7) {
            numbers = Array.from({ length: pageCount }, (_, i) => i + 1);
        } else {
            if (pageInfo.currentPage <= 4) {
                numbers = [1, 2, 3, 4, 5, '...', pageCount];
            } else if (pageInfo.currentPage > pageCount - 4) {
                numbers = [1, '...', pageCount - 4, pageCount - 3, pageCount - 2, pageCount - 1, pageCount];
            } else {
                numbers = [1, '...', pageInfo.currentPage - 1, pageInfo.currentPage, pageInfo.currentPage + 1, '...', pageCount];
            }
        }
        setPageNumbers(numbers);
    }, [pageInfo]);

    const handleNextPage = () => {
        setSkip(prevSkip => prevSkip + take);
    };

    const handlePreviousPage = () => {
        setSkip(prevSkip => Math.max(prevSkip - take, 0));
    };

    const handleShow = (value: number) => {
        setTake(value);
    }
    const handlePageClick = (page: number) => {
        setSkip((page - 1) * take);
    };

    return (
        <div className='mt-16 flex justify-center items-center flex-col md:flex-row space-y-2 md:space-y-0'>
            <div className="me-4 text-sm">
                <label className="me-2">Show</label>
                <DropdownMenu>
                    <DropdownMenuTrigger className="px-4 py-2 rounded-lg border p-2 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-gray-400">{take == Infinity ? 'All' : take}</DropdownMenuTrigger>
                    <DropdownMenuContent>
                        {
                            showNumbers.map((number, index) => (
                                <DropdownMenuItem key={index} onSelect={() => handleShow(number)}>{number == Infinity ? 'All' : number}</DropdownMenuItem>
                            ))
                        }
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <ol className="flex justify-center gap-1 text-xs font-medium" >

                <li>
                    <button
                        onClick={handlePreviousPage} disabled={skip === 0}
                        className={`inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white rtl:rotate-180 ${pageInfo.hasPreviousPage ? 'text-gray-900' : 'text-gray-500 cursor-not-allowed pointer-events-none'}`}
                    >
                        <span className="sr-only">Prev Page</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3 w-3"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                </li>
                {
                    pageNumbers.map((pagination, index) => (
                        <li key={index}>
                            <button
                                onClick={() => handlePageClick(pagination)}
                                className={`block size-8 rounded border border-gray-100 text-center leading-8 
                            ${pageInfo.currentPage == pagination ? 'bg-blue-600 text-white' : 'bg-white text-gray-900'}
                            ${typeof pagination == "string" && 'bg-white text-gray-500 cursor-not-none pointer-events-none'}
                            `}
                            >
                                {pagination}
                            </button>
                        </li>
                    ))
                }

                <li>
                    <button
                        onClick={handleNextPage} disabled={!pageInfo.hasNextPage}
                        className={`inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white rtl:rotate-180 ${pageInfo.hasNextPage ? 'text-gray-900' : 'text-gray-500 cursor-not-allowed pointer-events-none'}`}
                    >
                        <span className="sr-only">Next Page</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3 w-3"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                </li>
            </ol>
        </div>
    )
}

export default Pagination

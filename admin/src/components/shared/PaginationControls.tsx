"use client"
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
} from "@/components/ui/pagination";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "@/hooks/useNavigate";


interface PaginationProps {
    meta: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
    onPageChange?: (pageNumber: number) => void;
}

export function PaginationControls({ meta, onPageChange }: PaginationProps = { meta: { total: 0, page: 1, limit: 10, totalPages: 1 } }) {
    const { total, page, limit, totalPages } = meta;

    const { navigateToPage } = useNavigate();

    const handlePageChange = (pageNumber: number) => {
        if (onPageChange) {
            onPageChange(pageNumber);
        } else {
            navigateToPage("page", pageNumber);
        }
    };

    let startPage = Math.max(1, page - 1);
    const endPage = Math.min(totalPages, startPage + 2);

    if (endPage - startPage < 2 && totalPages > 2) {
        startPage = Math.max(1, endPage - 2);
    }

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
    }

    return (
        <Pagination className="mt-10">
            <PaginationContent className="bg-fh-cream-dark rounded-md p-1.5">
                <PaginationItem className="sm:block hidden">
                    <Button
                        onClick={() => handlePageChange(page - 1)}
                        variant="ghost"
                        disabled={page === 1}
                        className="bg-secondary hover:bg-primary rounded-xl text-white hover:text-white cursor-pointer"
                    >
                        <ChevronLeft /> Previous
                    </Button>
                </PaginationItem>

                {pages.map((pageNumber) => (
                    <PaginationItem key={pageNumber}>
                        <Button
                            variant="ghost"
                            onClick={() => handlePageChange(pageNumber)}
                            className={`bg-secondary hover:bg-primary rounded-xl text-white hover:text-white cursor-pointer ${pageNumber === page ? "bg-primary" : ""}`}
                        >
                            {pageNumber}
                        </Button>
                    </PaginationItem>
                ))}

                {endPage < totalPages && (
                    <>
                        {endPage < totalPages - 1 && (
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                        )}
                        <PaginationItem>
                            <Button
                                variant="ghost"
                                onClick={() => handlePageChange(totalPages)}
                                className="bg-secondary hover:bg-primary rounded-xl text-white hover:text-white cursor-pointer"
                            >
                                {totalPages}
                            </Button>
                        </PaginationItem>
                    </>
                )}

                <PaginationItem className="hidden sm:block">
                    <Button
                        onClick={() => handlePageChange(page + 1)}
                        disabled={page === totalPages}
                        variant="ghost"
                        className="bg-secondary hover:bg-primary rounded-xl text-white hover:text-white cursor-pointer"
                    >
                        Next <ChevronRight />
                    </Button>
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
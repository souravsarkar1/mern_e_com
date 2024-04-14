import React from 'react';
import { Button } from '@chakra-ui/react';

function createArrayOfSize(n) {
  return new Array(n).fill(0);
}

function PaginationAllPage({ currentPage, totalPages, handlePageChange }) {
  const showPageButtons = 5;
  // console.log({totalPages})

  const startPage = Math.max(1, currentPage - 2);
  const endPage = Math.min(totalPages, startPage + showPageButtons - 1);

  const pages = createArrayOfSize(endPage - startPage + 1).map((_, index) => {
    const pageNumber = startPage + index;
    const isActive = pageNumber === currentPage;

    return (
      <Button
        key={pageNumber}
        colorScheme="teal"
        m={2}
        onClick={() => handlePageChange(pageNumber)}
        isDisabled={isActive}
      >
        {pageNumber}
      </Button>
    );
  });

  return <div>{pages}</div>;
}

export default PaginationAllPage;

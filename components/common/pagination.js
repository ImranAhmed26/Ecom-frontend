import React from "react";

const Pagination = ({ page, setPage, pages }) => {
  let midPagination;

  if (pages <= 5) {
    midPagination = [...Array(pages)].map((_, idx) => (
      <button
        className="w-6 mx-2 rounded-sm  border-gray-400 border shadow-md cursor-pointer"
        key={idx + 1}
        onClick={() => setPage(idx + 1)}
        disabled={page === idx + 1}
      >
        {idx + 1}
      </button>
    ));
  } else {
    const startValue = Math.floor((page - 1) / 5) * 5;
    midPagination = (
      <>
        {[...Array(5)].map((_, idx) => (
          <button
            className="w-6 mx-2 rounded-sm border-gray-400 border shadow-md cursor-pointer"
            key={startValue + idx + 1}
            onClick={() => setPage(startValue + idx + 1)}
            disabled={page === startValue + idx + 1}
          >
            {startValue + idx + 1}
          </button>
        ))}
        <button className="w-6 mx-2 rounded-sm border-gray-400 border shadow-md cursor-pointer">
          ...
        </button>
        <button onClick={() => setPage(pages)}>{pages}</button>
      </>
    );
    if (page > 5) {
      if (pages - page >= 5) {
        midPagination = (
          <>
            <button
              className="w-6 mx-2 rounded-sm border-gray-400 border shadow-md cursor-pointer"
              onClick={() => setPage(1)}
            >
              1
            </button>
            <button className="w-6 mx-2 rounded-sm border-gray-400 border shadow-md cursor-pointer">
              ...
            </button>
            <button
              className="w-6 mx-2 rounded-sm border-gray-400 border shadow-md cursor-pointer"
              onClick={() => setPage(startValue)}
            >
              {startValue}
            </button>
            {[...Array(5)].map((_, idx) => (
              <button
                className="w-6 mx-2 rounded-sm border-gray-400 border shadow-md cursor-pointer"
                key={startValue + idx + 1}
                disabled={page === startValue + idx + 1}
                onClick={() => setPage(startValue + idx + 1)}
              >
                {startValue + idx + 1}
              </button>
            ))}

            <button className="w-6 mx-2 rounded-sm border-gray-400 border shadow-md cursor-pointer">
              ...
            </button>
            <button
              className="w-6 mx-2 rounded-sm border-gray-400 border shadow-md cursor-pointer"
              onClick={() => setPage(pages)}
            >
              {pages}
            </button>
          </>
        );
      } else {
        let amountLeft = pages - page + 5;
        midPagination = (
          <>
            <button
              className="w-6 mx-2 rounded-sm border-gray-400 border shadow-md cursor-pointer"
              onClick={() => setPage(1)}
            >
              1
            </button>
            <button className="w-6 mx-2 rounded-sm border-gray-400 border shadow-md cursor-pointer">
              ...
            </button>
            <button
              className="w-6 mx-2 rounded-sm border-gray-400 border shadow-md cursor-pointer"
              onClick={() => setPage(startValue)}
            >
              {startValue}
            </button>
            {[...Array(amountLeft)].map((_, idx) => (
              <button
                className="w-6 mx-2 rounded-sm border-gray-400 border shadow-md cursor-pointer"
                key={startValue + idx + 1}
                disabled={page === startValue + idx + 1}
                style={pages < startValue + idx + 1 ? { display: "none" } : null}
                onClick={() => setPage(startValue + idx + 1)}
              >
                {startValue + idx + 1}
              </button>
            ))}
          </>
        );
      }
    }
  }
  return (
    pages > 1 && (
      <div>
        <button
          className={`w-6 mx-2 rounded-sm border-gray-400 border shadow-md cursor-pointer ${
            page !== 1
              ? "hover:bg-indigo-500 hover:text-white transition-all duration-100 "
              : "bg-gray-100"
          }`}
          onClick={() => setPage((page) => page - 1)}
          disabled={page === 1}
        >
          &#171;
        </button>
        {midPagination}
        <button
          className={`w-6 rounded-sm  border-gray-400 border shadow-md cursor-pointer ${
            page !== pages
              ? "hover:bg-indigo-500 hover:text-white transition-all duration-100 "
              : "bg-gray-100"
          }`}
          onClick={() => setPage((page) => page + 1)}
          disabled={page === pages}
        >
          &#187;
        </button>
      </div>
    )
  );
};

export default Pagination;

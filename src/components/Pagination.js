import React from "react";

function Pagination({ prevPage, nextPage, curr_page }) {
  return (
    <div className="pagination">
      <button className="btn" onClick={prevPage}>
        Prev
      </button>

      <h3>Page: {curr_page}</h3>

      <button className="btn" onClick={nextPage}>
        Next
      </button>
    </div>
  );
}

export default Pagination;

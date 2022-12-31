import React from "react";

function Search({value,setValue}) {
  return (
    <div id="top-div" className="d-flex m-3 mt-5">
      <div className="form-inline active-cyan-3 active-cyan-4">
        <input
          className="form-control form-control-sm ml-3 w-75"
          type="text"
          placeholder="Search"
          aria-label="Search"
          value={value}
          onChange={(e)=>setValue(e.target.value)}
        />
        <i className="fas fa-search" aria-hidden="true"></i>
      </div>
    </div>
  );
}

export default Search;

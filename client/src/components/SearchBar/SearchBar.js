import React from "react";
import "./SearchBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const searchBar = props => (
  <div className="form-group search-bar">
    <FontAwesomeIcon icon={faSearch} className="form-control-feedback" />
    <input
      onChange={props.onChange.bind(this)}
      type="text"
      className="form-control"
      placeholder="Search"
    />
  </div>
);

export default searchBar;

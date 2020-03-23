import React, { Component } from "react";
import "./PlayerList.css";
import * as sortTypes from "../../constants/sortTypes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsAltV } from "@fortawesome/free-solid-svg-icons";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";

class PlayerList extends Component {
  state = {
    sort: {
      column: null,
      direction: sortTypes.DEFAULT_ORDER
    },
    columns: this.props.columns
  };

  compareRows = (a, b, column) => {
    if (isNaN(a[column])) {
      const nameA = a[column].toUpperCase();
      const nameB = b[column].toUpperCase();      
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      else return 0;
    } else {
      return a[column] - b[column];
    }
  };

  onSort = column => {
    return e => {
      const direction = this.state.sort.column
        ? this.state.sort.direction === sortTypes.ASC_ORDER
          ? sortTypes.DESC_ORDER
          : sortTypes.ASC_ORDER
        : sortTypes.DESC_ORDER;
      this.props.players.sort((a, b) => {
        return this.compareRows(a, b, column);
      });

      if (direction === sortTypes.DESC_ORDER) {
        this.props.players.reverse();
      }

      this.setState({
        sort: {
          column,
          direction
        }
      });
    };
  };

  setArrow = column => {
    let iconName = faArrowsAltV;
    if (this.state.sort.column === column) {
      if (this.state.sort.direction === sortTypes.DESC_ORDER) {
        iconName = faArrowDown;
      } else if (this.state.sort.direction === sortTypes.ASC_ORDER) {
        iconName = faArrowUp;
      }
    }

    return iconName;
  };

  render() {
    return (
      <table className="player-table table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
          {this.state.columns.map(column => (
            <th key={column.name} onClick={this.onSort(column.name)} scope="col">
              {column.label}
              <FontAwesomeIcon
                className="arrow"
                icon={this.setArrow(column.name)}
              />
            </th>
          ))}
          </tr>
        </thead>
        <tbody>
          {this.props.players.map(player => (
            <tr key={player.number}>
              <th scope="row">{player.number}</th>
              <td>{player.name}</td>
              <td>{player.pos}</td>
              <td>{player.nat}</td>
              <td>{player.height}</td>
              <td>{player.weight}</td>
              <td>{player.dob}</td>
              <td>{player.birthplace}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default PlayerList;

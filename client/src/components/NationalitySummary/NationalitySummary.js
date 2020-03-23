import React from "react";

const nationalitySummary = props => {
  function groupBy(arr, prop, id) {
    const map = new Map(Array.from(arr, obj => [obj[prop], []]));
    arr.forEach(obj => map.get(obj[prop]).push(obj[id]));
    return map;
  }

  const natGroup = groupBy(props.players, "nat", "number");

  return (
    <table className="table table-bordered">
      <tbody>
        <tr>
          {[...natGroup.keys()].map(key => (
            <td key={key}>
              {key} : {natGroup.get(key).length}
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  );
};

export default nationalitySummary;

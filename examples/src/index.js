import React from "react";
import { render } from "react-dom";
import GeneReactTable from "../../src";

let counter = 0;
function createData(name, calories, fat, carbs, protein) {
  counter += 1;
  return { id: counter, name, calories, fat, carbs, protein };
}
class Example extends React.Component {
  render() {
    const columns = ["Name", "Title", "Location", "Age", "Salary"];

    const rows = [
      {
        id: "name",
        numeric: false,
        disablePadding: true,
        label: "Dessert (100g serving)"
      },
      {
        id: "calories",
        numeric: true,
        disablePadding: false,
        label: "Calories"
      },
      { id: "fat", numeric: true, disablePadding: false, label: "Fat (g)" },
      { id: "carbs", numeric: true, disablePadding: false, label: "Carbs (g)" },
      {
        id: "protein",
        numeric: true,
        disablePadding: false,
        label: "Protein (g)"
      }
    ];

    const data = [
      createData("Cupcake", 305, 3.7, 67, 4.3),
      createData("Donut", 452, 25.0, 51, 4.9),
      createData("Eclair", 262, 16.0, 24, 6.0),
      createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
      createData("Gingerbread", 356, 16.0, 49, 3.9),
      createData("Honeycomb", 408, 3.2, 87, 6.5),
      createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
      createData("Jelly Bean", 375, 0.0, 94, 0.0),
      createData("KitKat", 518, 26.0, 65, 7.0),
      createData("Lollipop", 392, 0.2, 98, 0.0),
      createData("Marshmallow", 318, 0, 81, 2.0),
      createData("Nougat", 360, 19.0, 9, 37.0),
      createData("Oreo", 437, 18.0, 63, 4.0)
    ];

    const options = {
      filter: true,
      selectableRows: true,
      filterType: "dropdown",
      responsive: "stacked",
      rowsPerPage: 10,
      onRowsSelect: (rowsSelected, allRows) => {
        console.log(rowsSelected, allRows);
      },
      onRowsDelete: rowsDeleted => {
        console.log(rowsDeleted, "were deleted!");
      },
      onChangePage: numberRows => {
        console.log(numberRows);
      },
      onSearchChange: searchText => {
        console.log(searchText);
      },
      onColumnSortChange: (column, direction) => {
        console.log(column, direction);
      },
      onColumnViewChange: (column, action) => {
        console.log(column, action);
      },
      onFilterChange: (column, filters) => {
        console.log(column, filters);
      },
      onCellClick: (cellIndex, rowIndex) => {
        console.log(cellIndex, rowIndex);
      },
      onRowClick: (rowData, rowState) => {
        console.log(rowData, rowState);
      }
    };

    return (
      <GeneReactTable
        title={"ACME Employee list"}
        order={"asc"}
        orderBy={"calories"}
        selected={[]}
        page={0}
        rowsPerPage={5}
        rows={rows}
        data={data}
        columns={columns}
        options={options}
      />
    );
  }
}

render(<Example />, document.getElementById("root"));

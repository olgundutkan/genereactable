import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TablePagination from "@material-ui/core/TablePagination";
import Paper from "@material-ui/core/Paper";

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import GeneReactTableHead from "./GeneReactTableHead";
import GeneReactTableToolbar from "./GeneReactTableToolbar";
import GeneReactTableBody from "./GeneReactTableBody";

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === "desc"
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
}

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  }
});

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3
  },
  table: {
    minWidth: 1020
  },
  tableWrapper: {
    overflowX: "auto"
  }
});

class GeneReactTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      order: props.order,
      orderBy: props.orderBy,
      selected: props.selected,
      rows: props.rows,
      data: props.data,
      page: props.page,
      rowsPerPage: props.rowsPerPage
    };
  }
  /**
   * GeneReactTable Component Will Mount
   * @return {[type]}
   */
  componentWillMount() {
    console.log("GeneReactTable componentWillMount");
  }
  /**
   * GeneReactTable Component Will Receive Props
   * @param  {[type]} nextProps
   * @return {[type]}
   */
  componentWillReceiveProps(nextProps, nextContext) {
    console.log("GeneReactTable componentWillReceiveProps ", nextProps);
    // this.setState({ ...nextProps });
  }
  /**
   * GeneReactTable Component Did Mount
   * @return {[type]}
   */
  componentDidMount() {
    console.log("GeneReactTable componentDidMount");
  }
  /**
   * GeneReactTable Component Should Update
   * @param  {[type]} nextProps
   * @param  {[type]} nextState
   * @return {[type]}
   */
  shouldComponentUpdate(nextProps, nextState) {
    console.log("GeneReactTable shouldComponentUpdate");
    return true;
  }
  /**
   * GeneReactTable Component Will Update
   * @param  {[type]} nextProps
   * @param  {[type]} nextState
   * @return {[type]}
   */
  componentWillUpdate(nextProps, nextState) {
    console.log("GeneReactTable componentWillUpdate");
  }
  /**
   * GeneReactTable Component Did Update
   * @param  {[type]} nextProps [description]
   * @param  {[type]} nextState [description]
   * @return {[type]}           [description]
   */
  componentDidUpdate(nextProps, nextState) {
    console.log("GeneReactTable componentDidUpdate");
  }
  /**
   * GeneReactTable Component Will Unmount
   * @return {[type]}
   */
  componentWillUnmount() {
    console.log("GeneReactTable componentWillUnmount");
  }
  /**
   * GeneReactTable Component Did Catch Error
   * @return {[type]}
   */
  componentDidCatch(error, info) {
    console.log("GeneReactTable componentDidCatch");
  }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = "desc";

    if (this.state.orderBy === property && this.state.order === "desc") {
      order = "asc";
    }

    this.setState({ order, orderBy });
  };

  handleSelectAllClick = event => {
    if (event.target.checked) {
      this.setState(state => ({ selected: state.data.map(n => n.id) }));
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    this.setState({ selected: newSelected });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  render() {
    const { classes } = this.props;
    const {
      rows,
      data,
      order,
      orderBy,
      selected,
      rowsPerPage,
      page
    } = this.state;
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
      <MuiThemeProvider theme={theme}>
        <Paper className={classes.root}>
          <GeneReactTableToolbar numSelected={selected.length} />
          <div className={classes.tableWrapper}>
            <Table className={classes.table} aria-labelledby="tableTitle">
              <GeneReactTableHead
                rows={rows}
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={this.handleSelectAllClick}
                onRequestSort={this.handleRequestSort}
                rowCount={data.length}
              />
              <GeneReactTableBody
                data={data}
                selected={selected}
                order={order}
                orderBy={orderBy}
                page={page}
                rowsPerPage={rowsPerPage}
                emptyRows={emptyRows}
              />
            </Table>
          </div>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            backIconButtonProps={{
              "aria-label": "Previous Page"
            }}
            nextIconButtonProps={{
              "aria-label": "Next Page"
            }}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
          />
        </Paper>
      </MuiThemeProvider>
    );
  }
}

/**
 * Set default props of GeneReactTable component
 * @type {Object}
 */
GeneReactTable.defaultProps = {
  order: "asc",
  orderBy: "",
  selected: [],
  rows: [],
  data: [],
  page: 0,
  rowsPerPage: 5
};

/**
 * Validate props of GeneReactTable component
 * @type {Object}
 */
GeneReactTable.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  selected: PropTypes.array.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  rows: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  options: PropTypes.object.isRequired
};

export default withStyles(styles, { name: "GeneReactTable" })(GeneReactTable);

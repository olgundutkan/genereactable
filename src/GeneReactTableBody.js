import React, { Component } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";
import { lighten } from "@material-ui/core/styles/colorManipulator";

const styles = theme => ({});

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

class GeneReactTableBody extends React.Component {
  // state = {
  //   order: "asc",
  //   orderBy: "calories",
  //   selected: [],
  //   data: [],
  //   page: 0,
  //   rowsPerPage: 5
  // };
  /**
   * GeneReactTableBody componentWillMount
   * @return {[type]} [description]
   */
  componentWillMount() {
    console.log("GeneReactTableBody componentWillMount");
  }
  /**
   * GeneReactTableBody componentWillMount
   * @return {[type]} [description]
   */
  componentDidMount() {
    console.log("GeneReactTableBody componentDidMount");
  }
  /**
   * GeneReactTableBody componentWillMount
   * @return {[type]} [description]
   */
  componentWillUpdate() {
    console.log("GeneReactTableBody componentWillUpdate");
  }
  /**
   * GeneReactTableBody componentWillMount
   * @return {[type]} [description]
   */
  componentDidUpdate() {
    console.log("GeneReactTableBody componentDidUpdate");
  }
  /**
   * GeneReactTableBody componentWillMount
   * @return {[type]} [description]
   */
  componentWillReceiveProps(nextProps, nextContext) {
    console.log("GeneReactTableBody componentWillReceiveProps");
    this.setState({ ...nextProps });
  }
  /**
   * GeneReactTableBody componentWillMount
   * @return {[type]} [description]
   */
  componentWillUnmount() {
    console.log("GeneReactTableBody componentWillUnmount");
  }
  /**
   * GeneReactTableBody componentWillMount
   * @return {[type]} [description]
   */
  componentDidCatch() {
    console.log("GeneReactTableBody componentDidCatch");
  }

  isSelected = id => this.props.selected.indexOf(id) !== -1;

  render() {
    let { classes } = this.props;
    let { data, order, orderBy, page, rowsPerPage, emptyRows } = this.props;

    return (
      <TableBody>
        {stableSort(data, getSorting(order, orderBy))
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map(n => {
            const isSelected = this.isSelected(n.id);
            return (
              <TableRow
                hover
                onClick={event => this.handleClick(event, n.id)}
                role="checkbox"
                aria-checked={isSelected}
                tabIndex={-1}
                key={n.id}
                selected={isSelected}
              >
                <TableCell padding="checkbox">
                  <Checkbox checked={isSelected} />
                </TableCell>
                <TableCell component="th" scope="row" padding="none">
                  {n.name}
                </TableCell>
                <TableCell numeric>{n.calories}</TableCell>
                <TableCell numeric>{n.fat}</TableCell>
                <TableCell numeric>{n.carbs}</TableCell>
                <TableCell numeric>{n.protein}</TableCell>
              </TableRow>
            );
          })}
        {emptyRows > 0 && (
          <TableRow style={{ height: 49 * emptyRows }}>
            <TableCell colSpan={6} />
          </TableRow>
        )}
      </TableBody>
    );
  }
}

/**
 * Validate props of GeneReactTableBody component
 * @type {Object}
 */
GeneReactTableBody.propTypes = {
  classes: PropTypes.object.isRequired
};

/**
 * Set default props of GeneReactTableBody component
 * @type {Object}
 */
GeneReactTableBody.defaultProps = {
  rows: []
};

export default withStyles(styles)(GeneReactTableBody);

import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Checkbox from "@material-ui/core/Checkbox";

const styles = theme => ({
  row: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  }
});

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

class GeneReactTableBody extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  /**
   * GeneReactTableBody Component Will Mount
   * @return {[type]}
   */
  componentWillMount() {
    console.log("GeneReactTableBody componentWillMount");
  }
  /**
   * GeneReactTableBody Component Will Receive Props
   * @param  {[type]} nextProps
   * @return {[type]}
   */
  componentWillReceiveProps(nextProps, nextContext) {
    console.log("GeneReactTableBody componentWillReceiveProps ", nextProps);
    this.setState({ ...nextProps });
  }
  /**
   * GeneReactTableBody Component Did Mount
   * @return {[type]}
   */
  componentDidMount() {
    console.log("GeneReactTableBody componentDidMount");
  }
  /**
   * GeneReactTableBody Component Should Update
   * @param  {[type]} nextProps
   * @param  {[type]} nextState
   * @return {[type]}
   */
  shouldComponentUpdate(nextProps, nextState) {
    console.log("GeneReactTableBody shouldComponentUpdate");
    return true;
  }
  /**
   * GeneReactTableBody Component Will Update
   * @param  {[type]} nextProps
   * @param  {[type]} nextState
   * @return {[type]}
   */
  componentWillUpdate(nextProps, nextState) {
    console.log("GeneReactTableBody componentWillUpdate");
  }
  /**
   * GeneReactTableBody Component Did Update
   * @param  {[type]} nextProps [description]
   * @param  {[type]} nextState [description]
   * @return {[type]}           [description]
   */
  componentDidUpdate(nextProps, nextState) {
    console.log("GeneReactTableBody componentDidUpdate");
  }
  /**
   * GeneReactTableBody Component Will Unmount
   * @return {[type]}
   */
  componentWillUnmount() {
    console.log("GeneReactTableBody componentWillUnmount");
  }
  /**
   * GeneReactTableBody Component Did Catch Error
   * @return {[type]}
   */
  componentDidCatch(error, info) {
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
                className={classes.row}
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
  rows: [],
  data: [],
  order: "asc",
  orderBy: "",
  page: 0,
  rowsPerPage: 5,
  emptyRows: 0
};

export default withStyles(styles, { name: "GeneReactTableBody" })(
  GeneReactTableBody
);

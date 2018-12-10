import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Tooltip from "@material-ui/core/Tooltip";

const styles = theme => ({
  checkAll: {
    color: "rgba(255, 255, 255, 0.84)"
  },
  tableSortLabel: {
    color: "rgba(255, 255, 255, 0.84)",
    "&:hover": {
      color: "inherit"
    },
    "&:active": {
      color: "inherit"
    },
    "&:focus": {
      color: "inherit"
    }
  }
});

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

class GeneReactTableHead extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  /**
   * GeneReactTableHead Component Will Mount
   * @return {[type]}
   */
  componentWillMount() {
    console.log("GeneReactTableHead componentWillMount");
  }
  /**
   * GeneReactTableHead Component Will Receive Props
   * @param  {[type]} nextProps
   * @return {[type]}
   */
  componentWillReceiveProps(nextProps, nextContext) {
    console.log("GeneReactTableHead componentWillReceiveProps ", nextProps);
    this.setState({ ...nextProps });
  }
  /**
   * GeneReactTableHead Component Did Mount
   * @return {[type]}
   */
  componentDidMount() {
    console.log("GeneReactTableHead componentDidMount");
  }
  /**
   * GeneReactTableHead Component Should Update
   * @param  {[type]} nextProps
   * @param  {[type]} nextState
   * @return {[type]}
   */
  shouldComponentUpdate(nextProps, nextState) {
    console.log("GeneReactTableHead shouldComponentUpdate");
    return true;
  }
  /**
   * GeneReactTableHead Component Will Update
   * @param  {[type]} nextProps
   * @param  {[type]} nextState
   * @return {[type]}
   */
  componentWillUpdate(nextProps, nextState) {
    console.log("GeneReactTableHead componentWillUpdate");
  }
  /**
   * GeneReactTableHead Component Did Update
   * @param  {[type]} nextProps [description]
   * @param  {[type]} nextState [description]
   * @return {[type]}           [description]
   */
  componentDidUpdate(nextProps, nextState) {
    console.log("GeneReactTableHead componentDidUpdate");
  }
  /**
   * GeneReactTableHead Component Will Unmount
   * @return {[type]}
   */
  componentWillUnmount() {
    console.log("GeneReactTableHead componentWillUnmount");
  }
  /**
   * GeneReactTableHead Component Did Catch Error
   * @return {[type]}
   */
  componentDidCatch(error, info) {
    console.log("GeneReactTableHead componentDidCatch");
  }
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    let { classes } = this.props;
    const {
      onSelectAllClick,
      order,
      orderBy,
      numSelected,
      rowCount,
      rows
    } = this.props;

    return (
      <TableHead>
        <TableRow>
          <CustomTableCell padding="checkbox">
            <Checkbox
              className={classes.checkAll}
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </CustomTableCell>
          {rows.map(row => {
            return (
              <CustomTableCell
                key={row.id}
                numeric={row.numeric}
                padding={row.disablePadding ? "none" : "default"}
                sortDirection={orderBy === row.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={row.numeric ? "bottom-end" : "bottom-start"}
                  enterDelay={300}
                >
                  <TableSortLabel
                    className={classes.tableSortLabel}
                    active={orderBy === row.id}
                    direction={order}
                    onClick={this.createSortHandler(row.id)}
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              </CustomTableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}

/**
 * Validate props of GeneReactTableHead component
 * @type {Object}
 */
GeneReactTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  rows: PropTypes.array.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
};

/**
 * Set default props of GeneReactTableHead component
 * @type {Object}
 */
GeneReactTableHead.defaultProps = {
  rows: [],
  order: "asc",
  numSelected: 0,
  rowCount: 0
};

export default withStyles(styles, { name: "GeneReactTableHead" })(
  GeneReactTableHead
);

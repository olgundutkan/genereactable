import React, { Component } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";
import { lighten } from "@material-ui/core/styles/colorManipulator";

const styles = theme => ({
  root: {
    paddingRight: theme.spacing.unit
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85)
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark
        },
  spacer: {
    flex: "1 1 100%"
  },
  actions: {
    color: theme.palette.text.secondary
  },
  title: {
    flex: "0 0 auto"
  }
});

class GeneReactTableToolbar extends Component {
  /**
   * GeneReactTableToolbar Component Will Mount
   * @return {[type]}
   */
  componentWillMount() {
    console.log("GeneReactTableToolbar componentWillMount");
  }
  /**
   * GeneReactTableToolbar Component Will Receive Props
   * @param  {[type]} nextProps
   * @return {[type]}
   */
  componentWillReceiveProps(nextProps, nextContext) {
    console.log("GeneReactTableToolbar componentWillReceiveProps ", nextProps);
    this.setState({ ...nextProps });
  }
  /**
   * GeneReactTableToolbar Component Did Mount
   * @return {[type]}
   */
  componentDidMount() {
    console.log("GeneReactTableToolbar componentDidMount");
  }
  /**
   * GeneReactTableToolbar Component Should Update
   * @param  {[type]} nextProps
   * @param  {[type]} nextState
   * @return {[type]}
   */
  shouldComponentUpdate(nextProps, nextState) {
    console.log("GeneReactTableToolbar shouldComponentUpdate");
    return true;
  }
  /**
   * GeneReactTableToolbar Component Will Update
   * @param  {[type]} nextProps
   * @param  {[type]} nextState
   * @return {[type]}
   */
  componentWillUpdate(nextProps, nextState) {
    console.log("GeneReactTableToolbar componentWillUpdate");
  }
  /**
   * GeneReactTableToolbar Component Did Update
   * @param  {[type]} nextProps [description]
   * @param  {[type]} nextState [description]
   * @return {[type]}           [description]
   */
  componentDidUpdate(nextProps, nextState) {
    console.log("GeneReactTableToolbar componentDidUpdate");
  }
  /**
   * GeneReactTableToolbar Component Will Unmount
   * @return {[type]}
   */
  componentWillUnmount() {
    console.log("GeneReactTableToolbar componentWillUnmount");
  }
  /**
   * GeneReactTableToolbar Component Did Catch Error
   * @return {[type]}
   */
  componentDidCatch(error, info) {
    console.log("GeneReactTableToolbar componentDidCatch");
  }

  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { classes } = this.props;
    const { numSelected } = this.props;

    return (
      <Toolbar
        className={classNames(classes.root, {
          [classes.highlight]: numSelected > 0
        })}
      >
        <div className={classes.title}>
          {numSelected > 0 ? (
            <Typography color="inherit" variant="subtitle1">
              {numSelected} selected
            </Typography>
          ) : (
            <Typography variant="h6" id="tableTitle">
              Nutrition
            </Typography>
          )}
        </div>
        <div className={classes.spacer} />
        <div className={classes.actions}>
          {numSelected > 0 ? (
            <Tooltip title="Delete">
              <IconButton aria-label="Delete">
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Filter list">
              <IconButton aria-label="Filter list">
                <FilterListIcon />
              </IconButton>
            </Tooltip>
          )}
        </div>
      </Toolbar>
    );
  }
}
/**
 * Validate props of GeneReactTableToolbar component
 * @type {Object}
 */
GeneReactTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired
};

/**
 * Set default props of GeneReactTableToolbar component
 * @type {Object}
 */
GeneReactTableToolbar.defaultProps = {
  numSelected: 0
};

export default withStyles(styles, { name: "GeneReactTableToolbar" })(
  GeneReactTableToolbar
);

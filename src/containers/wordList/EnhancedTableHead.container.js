import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined';

import ActionTypes from '../../redux/actions';
import { CHECK, LEARN } from '../../constants/listTypes.constants';
import { ACTIONS, COLUMNS } from '../../constants/tableHeader.constants';

const { SET_TABLE_HIDDEN_COLUMNS, SET_TABLE_SORT_SETTINGS } = ActionTypes;

const useStyles = makeStyles(() => ({
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

const EnhancedTableHead = ({ listType, setHiddenColumns, setSortSettings, tables }) => {
  const classes = useStyles();
  const actions = ACTIONS[listType];
  const columns = COLUMNS[listType];
  const columnsHidden = tables[`${listType}_hiddenColumns`];
  const { sortDirection, sortProp } = tables[`${listType}_sortSettings`];

  const onToggleShowHide = (column) => {
    let hiddenColumns = [ ...columnsHidden ];
    const index = columnsHidden.findIndex(col => col === column);

    index >= 0
      ? hiddenColumns.splice(index, 1)
      : hiddenColumns.push(column);

    setHiddenColumns({ data: hiddenColumns, listType });
  };

  return (
    <TableHead>
      <TableRow>
        {columns.map((column) => (
          <TableCell
            key={column.prop}
            sortDirection={sortProp === column.prop ? sortDirection : false}
          >
            {
              columnsHidden.includes(column.prop)
                ? <VisibilityOffOutlinedIcon className="mr-1" color="primary" onClick={() => onToggleShowHide(column.prop)} />
                : < VisibilityOutlinedIcon className="mr-1" color="primary" onClick={() => onToggleShowHide(column.prop)} />
            }

            <TableSortLabel
              active={sortProp === column.prop}
              direction={sortProp === column.prop ? sortDirection : 'asc'}
              onClick={() => setSortSettings({ listType, sortProp: column.prop })}
            >
              {column.label}

              {
                sortProp === column.prop
                  ? (
                    <span className={classes.visuallyHidden}>
                      {sortDirection === 'desc' ? 'sorted descending' : 'sorted ascending'}
                    </span>
                    )
                  : null
              }
            </TableSortLabel>
          </TableCell>
        ))}
        {
          (actions && actions.length) &&
          <TableCell key="actions">&nbsp;</TableCell>
        }
      </TableRow>
    </TableHead>
  );
};

EnhancedTableHead.propTypes = {
  listType: PropTypes.oneOf([CHECK, LEARN]).isRequired,
  setHiddenColumns: PropTypes.func.isRequired,
  setSortSettings: PropTypes.func.isRequired,
  tables: PropTypes.object
};

const mapStateToProps = state => ({
  tables: state.tables
});

const mapDispatchToProps = dispatch => ({
  setHiddenColumns: payload => dispatch({ type: SET_TABLE_HIDDEN_COLUMNS, payload }),
  setSortSettings: payload => dispatch({ type: SET_TABLE_SORT_SETTINGS, payload })
});

export default connect(mapStateToProps, mapDispatchToProps)(EnhancedTableHead);

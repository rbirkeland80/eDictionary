import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined';

import ActionTypes from '../redux/actions';
import { CHECK, LEARN } from '../constants/listTypes.constants';

const { SET_TABLE_HIDDEN_COLUMNS } = ActionTypes;

const EnhancedTableHead = ({
  actions,
  classes,
  listType,
  columns,
  order,
  orderBy,
  onRequestSort,
  setHiddenColumns,
  tables
}) => {
  const columnsHidden = tables[`${listType}_hiddenColumns`];

  const toggleShowHide = (column) => {
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
            sortDirection={orderBy === column.prop ? order : false}
          >
            {
              columnsHidden.includes(column.prop)
                ? <VisibilityOffOutlinedIcon className="mr-1" color="primary" onClick={() => toggleShowHide(column.prop)} />
                :< VisibilityOutlinedIcon className="mr-1" color="primary" onClick={() => toggleShowHide(column.prop)} />
            }

            <TableSortLabel
              active={orderBy === column.prop}
              direction={orderBy === column.prop ? order : 'asc'}
              onClick={() => onRequestSort(column.prop)}
            >
              {column.label}

              {
                orderBy === column.prop
                  ? (
                    <span className={classes.visuallyHidden}>
                      {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
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
  actions: PropTypes.arrayOf(PropTypes.shape()),
  classes: PropTypes.object.isRequired,
  columns: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  listType: PropTypes.oneOf([CHECK, LEARN]).isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']),
  orderBy: PropTypes.string,
  setHiddenColumns: PropTypes.func.isRequired,
  tables: PropTypes.object
};

const mapStateToProps = state => ({
  tables: state.tables
});

const mapDispatchToProps = dispatch => ({
  setHiddenColumns: payload => dispatch({ type: SET_TABLE_HIDDEN_COLUMNS, payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(EnhancedTableHead);

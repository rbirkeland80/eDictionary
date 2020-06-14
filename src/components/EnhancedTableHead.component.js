import React from 'react';
import PropTypes from 'prop-types';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';

const EnhancedTableHead = ({ actions, classes, columns, order, orderBy, onRequestSort }) => (
  <TableHead>
    <TableRow>
      {columns.map((column) => (
        <TableCell
          key={column.prop}
          sortDirection={orderBy === column.prop ? order : false}
        >
          <TableSortLabel
            active={orderBy === column.prop}
            direction={orderBy === column.prop ? order : 'asc'}
            onClick={() => onRequestSort(column.prop)}
          >
            {column.label}
            {orderBy === column.prop ? (
              <span className={classes.visuallyHidden}>
                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
              </span>
            ) : null}
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

EnhancedTableHead.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.shape()),
  classes: PropTypes.object.isRequired,
  columns: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']),
  orderBy: PropTypes.string
};

export default EnhancedTableHead;

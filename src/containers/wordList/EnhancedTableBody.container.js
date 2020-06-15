import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { format } from 'date-fns';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Icon from '@material-ui/core/Icon';
import Switch from '@material-ui/core/Switch';

import ActionTypes from '../../redux/actions';
import { CHECK, LEARN } from '../../constants/listTypes.constants';
import { CONFIRM_DELETE_WORD } from '../../constants/modals.constants';
import { ACTION_DELETE, ACTIONS, COLUMNS } from '../../constants/tableHeader.constants';

const { SET_MODAL_DATA, SET_MODAL_STATE, UPDATE_WORD_REQUEST } = ActionTypes;

const parseValue = (type, prop, row, cb) => {
  if (type === 'date') {
    return row[prop]
      ? format(new Date(row[prop]), 'MMM dd, yyyy')
      : null;
  }

  if (type === 'bool') {
    return (
      <Switch
        checked={row[prop]}
        onChange={(_, value) => cb(value, prop, row._id)}
        color="primary"
        name={prop}
        inputProps={{ 'aria-label': 'primary checkbox' }}
      />
    );
  }

  return row[prop];
};

const EnhancedTableBody = ({
  listType,
  setModalData,
  setModalState,
  tables,
  updateWord,
  words
}) => {
  const actions = ACTIONS[listType];
  const columns = COLUMNS[listType];
  const hiddenColumns = tables[`${listType}_hiddenColumns`];
  const list = words[listType] && words[listType].list;

  const tryUpdateWord = (value, prop, id) => {
    updateWord({ id, listType, data: { [`${prop}`]: value } });
  };

  const formatCellData = (col, row) => {
    const prop = parseValue(col.type, col.prop, row, tryUpdateWord);
    const additionalProp = parseValue(col.additionalPropType, col.additionalProp, row);
    const val = additionalProp && typeof prop === 'string'
      ? `${prop} (pl: ${additionalProp})`
      : prop;

    return val;
  };

  const onActionClick = (type, id, word) => {
    if (type === ACTION_DELETE.type) {
      setModalData({ id, word });
      setModalState(CONFIRM_DELETE_WORD, true);
    }
  };

  return (
    (list && list.length) && 
    <TableBody>
      {
        list.map(row => (
          <TableRow tabIndex={-1} key={`row-${row.word}`}>
            {
              columns.map(col => (
                <TableCell key={`cell-${col.label}-${row[col.prop]}`}>
                  <span className={`${hiddenColumns.includes(col.prop) ? "invisible" : ""}`}>
                    {formatCellData(col, row)}
                  </span>
                </TableCell>
              ))
            }
            {
              (actions && actions.length) &&
              <TableCell key="actions">
                {
                  actions.map(action => (
                    <Icon
                      key={action.type}
                      color="secondary"
                      onClick={() => onActionClick(action.type, row._id, row.word)}
                    >
                      {action.type}
                    </Icon>
                  ))
                }
              </TableCell>
            }
          </TableRow>
        ))
      }
    </TableBody>
  );
};

EnhancedTableBody.propTypes = {
  listType: PropTypes.oneOf([CHECK, LEARN]).isRequired,
  setModalData: PropTypes.func.isRequired,
  setModalState: PropTypes.func.isRequired,
  tables: PropTypes.object,
  updateWord: PropTypes.func.isRequired,
  words: PropTypes.object
};

const mapStateToProps = state => ({
  tables: state.tables,
  words: state.words
});

const mapDispatchToProps = dispatch => ({
  setModalData: payload => dispatch({ type: SET_MODAL_DATA, payload }),
  setModalState: (type, value) => dispatch({ type: SET_MODAL_STATE, payload: { type, value } }),
  updateWord: payload => dispatch({ type: UPDATE_WORD_REQUEST, payload })
});

export default connect(mapStateToProps, mapDispatchToProps)(EnhancedTableBody);

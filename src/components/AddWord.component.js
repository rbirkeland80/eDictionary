import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
import TextField from '@material-ui/core/TextField';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHoriz from '@material-ui/icons/MoreHoriz';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

const AddWord = ({
  fields,
  tryAddWord,
  tryDeleteWord
}) => {
  const expandWord = () => {
    console.log('expand option below or in dialog')
  };

  return (
    <>
      {
        fields.map((word, index) => (
          <div key={index} className="d-flex justify-content-between align-items-end mb-2">
            <Field
              required
              render={({ input }) => <TextField label="Word" onChange={evt => input.onChange(evt.target.value)} />}
              name={`${word}.word`}
            />

            <Field
              render={({ input }) => <TextField label="Plural" onChange={evt => input.onChange(evt.target.value)} />}
              name={`${word}.plural`}
            />

            <Field
              render={({ input }) => <TextField label="Translation" onChange={evt => input.onChange(evt.target.value)} />}
              name={`${word}.translation`}
            />

            <MoreHoriz color="secondary" onClick={expandWord} />

            <DeleteIcon color="error" onClick={() => tryDeleteWord(fields, index)} />
          </div>
        ))
      }

      <AddCircleOutlineIcon className="my-3" color="primary" onClick={() => tryAddWord(fields)} />
    </>
  );
};

AddWord.propTypes = {
  fields: PropTypes.object,
  tryAddWord: PropTypes.func.isRequired,
  tryDeleteWord: PropTypes.func.isRequired
};

export default AddWord;

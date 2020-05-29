import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { FieldArray } from 'react-final-form-arrays';
import Button from '@material-ui/core/Button';

import ActionTypes from '../redux/actions';
import AddWord from '../components/AddWord.component';

const { SAVE_WORDS_REQUEST } = ActionTypes;

const AddWords = ({ saveWords }) => {
  const initialValues = { words: [{ word: '' }] };

  const onSubmit = (formData) => {
    saveWords(formData.words);
  };

  const tryAddWord = fields => {
    fields.push({ word: '' });
  };

  const tryDeleteWord = (fields, index) => {
    fields.remove(index);
  };

  return (
    <div>
      <Form
        onSubmit={onSubmit}
        initialValues={initialValues}
        mutators={{ ...arrayMutators }}
        render={({ handleSubmit, form, submitting, pristine }) => (
          <form onSubmit={handleSubmit} className="w-50 mx-auto my-o">
            <FieldArray
              component={AddWord}
              name="words"
              tryAddWord={tryAddWord}
              tryDeleteWord={tryDeleteWord}
            />

            <div className="buttons text-right">
              <Button className="mr-2" variant="contained" color="primary" type="submit" disabled={submitting || pristine}>
                Save
              </Button>

              <Button variant="contained" onClick={form.reset} disabled={submitting || pristine}>
                Reset
              </Button>
            </div>
          </form>
        )}
      />
    </div>
  );
};

AddWords.propTypes = {
  saveWords: PropTypes.func.isRequired
};

const mapStateToProps = state => ({ });

const mapDispatchToProps = dispatch => ({
  saveWords: payload => dispatch({ type: SAVE_WORDS_REQUEST, payload })
});

export default connect(mapStateToProps, mapDispatchToProps)(AddWords);

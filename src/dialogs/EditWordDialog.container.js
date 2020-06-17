import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form } from 'react-final-form';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';

import EditWord from '../components/EditWord.component';
import ActionTypes from '../redux/actions';

const { GET_WORD_REQUEST, UPDATE_WORD_REQUEST } = ActionTypes;

const EditWordDialog = ({
  handleClose,
  getWord,
  modalData,
  modalOpened,
  updateWord,
  word
}) => {
  const { id, listType } = modalData;

  useEffect(() => {
    if (!id) {
      return;
    }

    getWord(id);
  }, []);

  const onSubmit = (formData) => {
    updateWord({ id, listType, data: formData });
    handleClose();
  };

  return (
    <Dialog
      fullWidth
      open={modalOpened}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="md"
    >
      <DialogTitle id="alert-dialog-title">{"Update the word"}</DialogTitle>

      <DialogContent>
        {
          word &&
          <Form onSubmit={onSubmit} initialValues={word} render={EditWord} />
        }
      </DialogContent>
    </Dialog>
  );
};

EditWordDialog.propTypes = {
  getWord: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  modalData: PropTypes.shape({
    id: PropTypes.string.isRequired
  }).isRequired,
  modalOpened: PropTypes.bool.isRequired,
  updateWord: PropTypes.func.isRequired,
  word: PropTypes.object
};

const mapStateToProps = state => ({
  modalData: state.modals.modalData,
  word: state.words.item
});

const mapDispatchToProps = dispatch => ({
  getWord: payload => dispatch({ type: GET_WORD_REQUEST, payload }),
  updateWord: payload => dispatch({ type: UPDATE_WORD_REQUEST, payload })
});

export default connect(mapStateToProps, mapDispatchToProps)(EditWordDialog);

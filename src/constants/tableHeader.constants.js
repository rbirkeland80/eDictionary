import { CHECK, LEARN } from './listTypes.constants';

export const ACTION_DELETE = {
  type: 'delete'
};

export const ACTION_EDIT = {
  type: 'edit'
};

export const ADDED = {
  label:'Added',
  prop: 'createdAt',
  type: 'date'
};

export const DESCRIPTION = {
  label: 'Description',
  prop: 'description'
};

export const E_TO_U = {
  label: 'Eng to Ukr',
  prop: 'canEToU',
  size: 'small',
  type: 'bool'
};

export const TO_CHECK_NEXT_TIME = {
  label: 'Check again',
  prop: 'toVerifyNextTime',
  size: 'small',
  type: 'bool'
};

export const TRANSLATION = {
  label: 'Translation',
  prop: 'translation'
};

export const WORD = {
  label: 'Word',
  prop: 'word',
  additionalProp: 'plural'
};

export const U_TO_E = {
  label: 'Ukr to Eng',
  prop: 'canUToE',
  size: 'small',
  type: 'bool'
};

export const VERIFIED_AT = {
  label: 'Verified at',
  prop: 'lastVerifiedAt',
  type: 'date'
};

export const ACTIONS = {
  [`${LEARN}`]: [ ACTION_EDIT, ACTION_DELETE ],
  size: 'small'
};

export const COLUMNS = {
  [`${CHECK}`]: [ WORD, TRANSLATION, VERIFIED_AT, E_TO_U, U_TO_E, TO_CHECK_NEXT_TIME ],
  [`${LEARN}`]: [ WORD, TRANSLATION, DESCRIPTION, ADDED ]
};

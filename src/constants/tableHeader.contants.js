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
  type: 'bool'
};

export const TO_CHECK_NEXT_TIME = {
  label: 'Check next time',
  prop: 'toVerifyNextTime',
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
  type: 'bool'
};

export const COLUMNS = {
  check: [ WORD, TRANSLATION, ADDED, E_TO_U, U_TO_E, TO_CHECK_NEXT_TIME ],
  learn: [ WORD, TRANSLATION, DESCRIPTION, ADDED ]
};

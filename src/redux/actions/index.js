import { mergeAll } from 'ramda';

import asyncActions from './asyncActions';
import syncActions from './syncActions';

const createSyncActions = actions =>
  mergeAll(actions.map(action => ({ [action]: action })));

const createAsyncActions = actions =>
  mergeAll(
    actions.map(action => ({
      [`${action}_REQUEST`]: `${action}_REQUEST`,
      [`${action}_SUCCESS`]: `${action}_SUCCESS`,
      [`${action}_FAILURE`]: `${action}_FAILURE`,
    })),
  );

export default {
  ...createAsyncActions(asyncActions),
  ...createSyncActions(syncActions),
};

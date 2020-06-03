import currentTab from '../redux/reducers/currentTab.reducer';
import modals from '../redux/reducers/modals.reducer';
import tables from '../redux/reducers/tables.reducer';
import words from '../redux/reducers/words.reducer';

export default () => ({
  currentTab,
  modals,
  tables,
  words
});

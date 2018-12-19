// @flow
import {combineReducers} from 'redux';
import network           from 'reducers/network.reducer';
import localization      from 'reducers/localization.reducer';
import issues            from "../components/issues/issues.reducer";

export const reducersMap = {
  network,
  localization,
  issues


};

export default combineReducers(reducersMap);

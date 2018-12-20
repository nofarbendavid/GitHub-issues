import { handleActions } from 'redux-actions';
import { get, set, keyBy, castArray } from 'lodash/fp';
import * as AT from 'actions/issues.actions';

const initialState = {
  issues: {},
  comments: {}
};

const issuesReducer = handleActions(
  {
    [AT.SET_ISSUES]: (state = initialState, action) =>
      set(
        'issues',
        keyBy('number', castArray(get('payload.issues', action))),
        state
      ),

    [AT.SET_COMMENTS]: (state = initialState, action) =>
      set('comments', keyBy('id', get('payload.comments', action)), state)
  },
  initialState
);

export default issuesReducer;

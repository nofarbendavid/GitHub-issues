import {handleActions}   from 'redux-actions';
import {get, set, keyBy} from 'lodash/fp';
import * as AT           from "actions/issues.actions";



const initialState = {
  issues: {}
}


const issuesReducer = handleActions(
  {
    [AT.SET_ISSUES]: (state = initialState, action) =>
      set('issues', keyBy('id', get('payload.issues', action)), state)
  }, initialState


)






export default issuesReducer
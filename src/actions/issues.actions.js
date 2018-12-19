import {apiAction} from "actions/api.actions";


export const ISSUES_LABEL = 'issues';
export const FETCH_ISSUES = '[issues] Fetch issues';
export const SET_ISSUES = '[issues] Set issues';




export const fetchIssues = () =>
  apiAction({
    type: FETCH_ISSUES,
    payload: {
      networkLabel: ISSUES_LABEL,
      method: 'GET',
      baseUrl: 'https://api.github.com',
      path: 'repos/facebook/react/issues',
      onSuccess: setIssues
    }
  });

export const setIssues = (issues) => ({
  type: SET_ISSUES,
  payload: {
    issues
  }
})
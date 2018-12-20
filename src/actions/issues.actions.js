import { apiAction } from 'actions/api.actions';

export const ISSUES_LABEL = 'issues';

export const FETCH_ISSUES = '[issues] Fetch issues';
export const SET_ISSUES = '[issues] Set issues';

export const FETCH_COMMENTS = '[issues] Fetch comments';
export const SET_COMMENTS = '[issues] Set comments';

const BASE_URL = 'https://api.github.com';
const PATH = 'repos/facebook/react/issues';

export const fetchIssues = (id) => {
  const path = id ? PATH + `/${id}` : PATH;

  return apiAction({
    type: FETCH_ISSUES,
    payload: {
      networkLabel: ISSUES_LABEL,
      method: 'GET',
      baseUrl: BASE_URL,
      path: path,
      onSuccess: setIssues
    }
  });
};

export const setIssues = (issues) => ({
  type: SET_ISSUES,
  payload: {
    issues
  }
});

export const fetchComments = (id) =>
  apiAction({
    type: FETCH_COMMENTS,
    payload: {
      networkLabel: ISSUES_LABEL,
      method: 'GET',
      baseUrl: BASE_URL,
      path: `${PATH}/${id}/comments`,
      onSuccess: setComments
    }
  });

export const setComments = (comments) => ({
  type: SET_COMMENTS,
  payload: {
    comments
  }
});

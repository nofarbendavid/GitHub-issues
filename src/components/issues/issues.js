import * as React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { map } from 'lodash/fp';

import * as issuesActions from 'actions/issues.actions';
import { isLoadingSelector } from 'selectors/network.selectors';

import { Issue } from 'components/issue/issue';

export class Issues extends React.PureComponent {
  componentDidMount() {
    this.props.fetchIssues();
  }

  openIssue = id => {
    const history = this.props.history;
    history.push(`${history.location.pathname}/${id}`);
  };

  renderIssues = () => {
    return map(issue => (
      <Issue key={issue.id} issue={issue} openIssue={this.openIssue} />
    ))(this.props.issues);
  };

  render() {
    return (
      <StyledContainer>
        {this.props.isLoading ? <div>Loading...</div> : this.renderIssues()}
      </StyledContainer>
    );
  }
}

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const mapStateToProps = state => ({
  issues: state.issues.issues,
  isLoading: isLoadingSelector(state, issuesActions.ISSUES_LABEL)
});

export default connect(mapStateToProps, {
  fetchIssues: issuesActions.fetchIssues
})(Issues);

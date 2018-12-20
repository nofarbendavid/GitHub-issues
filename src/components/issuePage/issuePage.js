import * as React from 'react';
import styled from 'styled-components';
import connect from 'react-redux/es/connect/connect';
import { FormattedMessage } from 'react-intl';
import { calcTimeDeltaFromCurrentTime } from 'utils/issue.utills';
import * as issuesActions from 'actions/issues.actions';
import { map, isEmpty } from 'lodash/fp';

class IssuePage extends React.PureComponent {
  componentDidMount() {
    if (isEmpty(this.props.issueData)) {
      this.props.fetchIssues(this.props.match.params.id);
    }
    this.props.fetchComments(this.props.match.params.id);
  }

  renderComments = () =>
    map((comment) => <IssueBody key={ comment.id }>{comment.body}</IssueBody>)(
      this.props.comments
    );

  render() {
    if (isEmpty(this.props.issueData)) {
      return null;
    }

    const {
      title,
      number,
      state,
      user,
      created_at,
      comments,
      body
    } = this.props.issueData;

    return (
      <StyledContainer>
        <Header>
          <Title>{title}</Title>
          <IssueNumber>#{number}</IssueNumber>
        </Header>
        <SubHeader>
          <Status>{state}</Status>
          <FormattedMessage
            id="issuePage.subHeader"
            values={ {
              issueCreationDelta: calcTimeDeltaFromCurrentTime(created_at),
              issueAuthor: user.login,
              numberOfComments: comments
            } }/>
        </SubHeader>
        <IssueBody>{body}</IssueBody>
        {comments > 0 && this.renderComments()}
      </StyledContainer>
    );
  }
}

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.div`
  font-size: 26px;
  font-weight: bold;
  display: flex;
  width: 50%;
  justify-content: center;
  align-items: center;
`;

const Title = styled.div``;

const IssueNumber = styled.div`
  color: #a3aab0;
  margin-left: 10px;
`;

const SubHeader = styled.div`
  display: flex;
  align-items: baseline;
  margin-top: 5px;
`;

const Status = styled.div`
  color: white;
  font-weight: bold;
  background-color: #37be4e;
  margin-right: 10px;
  padding: 5px;
  border-radius: 5px;
`;

const IssueBody = styled.pre`
  margin: 20px 10px 0px 10px;
  width: 45%;
  justify-content: center;
  border: 1px solid #d1d5da;
  border-radius: 5px;
  padding: 15px;
  white-space: pre-wrap;
`;

const mapStateToProps = (state, props) => ({
  issueData: state.issues.issues[props.match.params.id],
  comments: state.issues.comments
});

export default connect(mapStateToProps, {
  fetchComments: issuesActions.fetchComments,
  fetchIssues: issuesActions.fetchIssues
})(IssuePage);

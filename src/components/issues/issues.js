import * as React                     from 'react';
import styled                         from 'styled-components';
import {connect}                      from 'react-redux';
import * as issuesActions             from '../../actions/issues.actions.js';
import {isLoadingSelector}            from '../../selectors/network.selectors';
import {values}                       from 'lodash/fp';
import {FormattedMessage}             from 'react-intl';
import {calcTimeDeltaFromCurrentTime} from '../../utils/issue.utills';
import statusIcon                     from '../../assets/images/exclamation-button.svg';

export class Issues extends React.PureComponent {
  componentDidMount() {
    this.props.fetchIssues();
  }

  renderIssueFooter = (number, created_at, user) => {
    return (
      <div className="issue-footer">
        <FormattedMessage
          id="issue.footer"
          values={{
            issueNumber: number,
            issueCreationDelta: calcTimeDeltaFromCurrentTime(created_at),
            issueAuthor: user.login
          }}
        />
      </div>
    );
  };

  renderIssue = issue => {
    const { id, title, comments, number, created_at, user } = issue;
    return (
      <StyledIssue key={id}>
        <div className="Issue-container">
          <div className="Issue-container-state-icon">
            <img src={statusIcon} alt="status" />
          </div>
          <div className="Issue-container-main">
            <div
              className="Issue-container-main-title"
              onClick={() =>
                this.props.history.push(`${this.props.location.pathname}/${id}`)
              }>
              {title}
            </div>
            {this.renderIssueFooter(number, created_at, user)}
          </div>
          <div className="Issue-container-comments">{comments}</div>
        </div>
      </StyledIssue>
    );
  };

  renderIssues = () => {
    return values(this.props.issues).map(this.renderIssue);
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

const StyledIssue = styled.div`
border: 1px solid #E0E4E8;
padding: 10px 10px;
width: 50%;

.Issue-container{
display: flex;

.Issue-container-main{
width: 90%;
}


.Issue-container-comments{
width: 5%;
}

.Issue-container-state-icon{
width: 17px;
height: 17px;
margin-right: 5px;
}

.Issue-container-comments{
display: flex;
flex-direction: row-reverse;
}

.Issue-container-main-title{
font-weight: bold;
font-size: 16px;
margin-bottom: 5px;
}

.Issue-container-main-title:hover{
color: #3E6CD5;
cursor: pointer;
}

.issue-footer{
font-size: 12px;
color: #666069;
}
`;

const mapStateToProps = state => ({
  issues: state.issues.issues,
  isLoading: isLoadingSelector(state, issuesActions.ISSUES_LABEL)
});

export default connect(mapStateToProps, {
  fetchIssues: issuesActions.fetchIssues
})(Issues);

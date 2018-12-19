import * as React                     from 'react';
import styled                         from 'styled-components';
import statusIcon                     from "assets/images/exclamation-button.svg";
import {FormattedMessage}             from "react-intl";
import {calcTimeDeltaFromCurrentTime} from "utils/issue.utills";


export const Issue = ({issue, history}) => {
  const { id, title, comments, number, created_at, user } = issue;
  return (
    <StyledIssue>
      <div className="Issue-container">
        <div className="Issue-container-state-icon">
          <img src={statusIcon} alt="status" />
        </div>
        <div className="Issue-container-main">
          <div
            className="Issue-container-main-title"
            onClick={() =>
              history.push(`${history.location.pathname}/${id}`)
            }>
            {title}
          </div>
          {renderIssueFooter(number, created_at, user)}
        </div>
        <div className="Issue-container-comments">{comments}</div>
      </div>
    </StyledIssue>
  )
}

const renderIssueFooter = (number, created_at, user) => {
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
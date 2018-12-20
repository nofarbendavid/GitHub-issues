import * as React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import statusIcon from 'assets/images/exclamation-button.svg';
import { calcTimeDeltaFromCurrentTime } from 'utils/issue.utills';

const Issue = ({ issue, openIssue }) => {
  const { title, comments, number, created_at, user } = issue;

  return (
    <StyledIssue>
      <Icon src={ statusIcon } alt="status"/>
      <div className="Issue-container-main">
        <Title onClick={ () => openIssue(number) }>{title}</Title>
        <Footer>
          <FormattedMessage
            id="issue.footer"
            values={ {
              issueNumber: number,
              issueCreationDelta: calcTimeDeltaFromCurrentTime(created_at),
              issueAuthor: user.login
            } }/>
        </Footer>
      </div>
      <Comments>{comments}</Comments>
    </StyledIssue>
  );
};

const StyledIssue = styled.div`
  border: 1px solid #e0e4e8;
  padding: 10px 10px;
  width: 50%;
  display: flex;

  .Issue-container-main {
    flex-grow: 1;
  }
`;

const Icon = styled.img`
  width: 17px;
  height: 17px;
  margin-right: 5px;
  flex-shrink: 0;
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 5px;

  &:hover {
    color: #3e6cd5;
    cursor: pointer;
  }
`;

const Comments = styled.div`
  display: flex;
  flex-direction: row-reverse;
  flex-shrink: 0;
`;

const Footer = styled.div`
  font-size: 12px;
  color: #666069;
`;

export default Issue;

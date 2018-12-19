import * as React          from 'react';
import styled              from 'styled-components';
import {connect}           from 'react-redux';
import * as issuesActions  from 'actions/issues.actions';
import {values}            from 'lodash/fp';
import {Issue}             from "components/issue/issue";
import {isLoadingSelector} from "selectors/network.selectors";

export class Issues extends React.PureComponent {
  componentDidMount() {
    this.props.fetchIssues();
  }

  renderIssues = () => {
    const history = this.props.history
    return values(this.props.issues).map((issue)=> <Issue key={issue.id} {...{issue, history}} />);
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

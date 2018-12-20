// @flow
import * as React from 'react';
import { ThemeProvider } from 'styled-components';
import { Router, Redirect } from 'react-router-dom';
import { Route } from 'react-router';
import { Provider } from 'react-redux';

import history from 'utils/history.utils';
import store from 'store';
import theme from 'constants/themes.constants';

import Localization from 'components/localization';
import Layout from 'components/layout/layout';
import Issues from 'components/issues/issues';
import IssuePage from 'components/issuePage/issuePage';

class App extends React.Component<{||}> {
  render() {
    return (
      <Provider store={ store }>
        <Localization>
          <ThemeProvider theme={ theme }>
            <Router history={ history }>
              <Layout>
                <Route
                  exact
                  path="/"
                  render={ () => <Redirect to="/facebook/react/issues"/> }/>
                <Route exact path="/facebook/react/issues" component={ Issues }/>
                <Route
                  path="/facebook/react/issues/:id"
                  component={ IssuePage }/>
              </Layout>
            </Router>
          </ThemeProvider>
        </Localization>
      </Provider>
    );
  }
}

export default App;

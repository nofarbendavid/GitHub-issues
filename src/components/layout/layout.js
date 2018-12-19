// @flow
import * as React         from 'react';
import styled             from 'styled-components';
import {FormattedMessage} from "react-intl";

type Props = {
  children: React.Node
};

const Layout = ({ children }: Props) => (
  <StyledLayout>
    <header>
      <h1>
        <FormattedMessage id="homepage.title"/>
      </h1>
    </header>
    {children}
  </StyledLayout>
);

const StyledLayout = styled.div`

header{
display: flex;
justify-content: center;

`;

export default Layout;

import { FC } from "react";
import { Grid } from "@components/molecules";
import { Wrapper } from "./styles";
import { Footer, Header, Settings, Sidebar } from "@components/organisms";
import { Main } from "@components/organisms/Main";

export const Dashboard: FC = () => {
  return (
    <Wrapper
      templateColumns="60px 1fr 350px"
      templateRows="60px 1fr 50px"
      templateAreas={`
      'header header header'
      'sidebar main settings'
      'sidebar footer footer'
    `}
    >
      <Grid.Item area="header">
        <Header />
      </Grid.Item>
      <Grid.Item area="sidebar">
        <Sidebar />
      </Grid.Item>
      <Grid.Item area="main">
        <Main />
      </Grid.Item>
      <Grid.Item area="settings">
        <Settings />
      </Grid.Item>
      <Grid.Item area="footer">
        <Footer />
      </Grid.Item>
    </Wrapper>
  );
};

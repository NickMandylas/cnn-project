import { Button, PageWithHeader, TopNav, Text, Paragraph } from "bumbag";

const Dashboard = () => {
  return (
    <PageWithHeader
      header={
        <TopNav>
          <TopNav.Section>
            <TopNav.Item href="http://localhost" fontWeight="semibold">
              <Text font="mono">Skin Cancer Detection Platform</Text>
            </TopNav.Item>
          </TopNav.Section>
          <TopNav.Section marginRight="major-2">
            <TopNav.Item>
              <Button palette="primary">Sign Out</Button>
            </TopNav.Item>
          </TopNav.Section>
        </TopNav>
      }
      border="default"
    >
      <Paragraph>Information will go here.</Paragraph>
    </PageWithHeader>
  );
};

export default Dashboard;

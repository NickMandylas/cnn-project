import { Loading } from "@app/components";
import useAuth from "@app/utils/useAuth";
import withApollo from "@app/utils/withApollo";
import { Button, PageWithHeader, TopNav, Text, Paragraph } from "bumbag";

const Dashboard = () => {
  const status = useAuth();

  if (!status) {
    return <Loading />;
  }

  return (
    <PageWithHeader
      header={
        <TopNav backgroundColor="primary">
          <TopNav.Section>
            <TopNav.Item fontWeight="semibold">
              <Text font="mono" color="default" marginLeft="10px">
                Skin Cancer Detection Platform
              </Text>
            </TopNav.Item>
          </TopNav.Section>
          <TopNav.Section marginRight="major-2">
            <TopNav.Item>
              <Button palette="default" size="small">
                Sign Out
              </Button>
            </TopNav.Item>
          </TopNav.Section>
        </TopNav>
      }
    >
      <Paragraph>Information will go here.</Paragraph>
    </PageWithHeader>
  );
};

export default withApollo({ ssr: false })(Dashboard);

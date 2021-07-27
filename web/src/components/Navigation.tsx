import React from "react";
import { useAccountQuery, useLogoutMutation } from "@app/generated/graphql";
import { TopNav, Text, Button, usePage, Hide } from "bumbag";
import { useRouter } from "next/router";
import { useApolloClient } from "@apollo/client";

interface NavigationProps {
  selectedId?: string;
}

const Navigation: React.FC<NavigationProps> = ({ selectedId }) => {
  const { data } = useAccountQuery();
  const { collapseBelow } = usePage();
  const [logout, { loading: loading }] = useLogoutMutation();
  const router = useRouter();
  const apolloClient = useApolloClient();

  return (
    <TopNav backgroundColor="primary" selectedId={selectedId}>
      <TopNav.Section>
        <TopNav.Item
          fontWeight="semibold"
          onClick={() => router.push("/dashboard")}
        >
          <Text font="default" color="default" marginLeft="15px">
            Skin Cancer Detection Platform
          </Text>
        </TopNav.Item>
        <TopNav.Item
          palette="default"
          color="white800"
          navId="Home"
          onClick={() => router.push("/dashboard")}
        >
          Home
        </TopNav.Item>
        {/* <TopNav.Item
          palette="default"
          borderColor="default"
          color="white800"
          href="#"
        >
          Search
        </TopNav.Item> */}
      </TopNav.Section>
      <TopNav.Section marginRight="major-2">
        <Hide below={collapseBelow}>
          <TopNav.Item>
            <Text fontSize="400" marginRight="5px">
              💊
            </Text>
            <Text color="default" font="default">
              {data?.account?.account?.firstName}{" "}
              {data?.account?.account?.lastName}
            </Text>
          </TopNav.Item>
          <TopNav.Item>
            <div
              style={{
                height: "40px",
                border: "0.5px solid #fff",
                marginLeft: "10px",
                marginRight: "10px",
              }}
            />
          </TopNav.Item>
          <TopNav.Item>
            <Button
              palette="default"
              size="small"
              isLoading={loading}
              onClick={async () => {
                await logout();
                await apolloClient.resetStore();
              }}
            >
              Sign Out
            </Button>
          </TopNav.Item>
        </Hide>
        <Hide above={collapseBelow}>
          <TopNav.Item>
            <Button
              palette="default"
              size="small"
              isLoading={loading}
              onClick={async () => {
                await logout();
                await apolloClient.resetStore();
              }}
            >
              Sign Out
            </Button>
          </TopNav.Item>
        </Hide>
      </TopNav.Section>
    </TopNav>
  );
};

export default Navigation;

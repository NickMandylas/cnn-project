import React from "react";
import { useAccountQuery } from "@app/generated/graphql";
import { TopNav, Text, Button, usePage, Hide } from "bumbag";
import { useRouter } from "next/router";

interface NavigationProps {}

const Navigation: React.FC<NavigationProps> = () => {
  const { data } = useAccountQuery();
  const { collapseBelow } = usePage();
  const router = useRouter();

  return (
    <TopNav backgroundColor="primary">
      <TopNav.Section>
        <TopNav.Item
          fontWeight="semibold"
          onClick={() => router.push("/dashboard")}
        >
          <Text font="default" color="default" marginLeft="15px">
            Skin Cancer Detection Platform
          </Text>
        </TopNav.Item>
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
            <Button palette="default" size="small">
              Sign Out
            </Button>
          </TopNav.Item>
        </Hide>
        <Hide above={collapseBelow}>
          <TopNav.Item>
            <Button palette="default" size="small">
              Sign Out
            </Button>
          </TopNav.Item>
        </Hide>
      </TopNav.Section>
    </TopNav>
  );
};

export default Navigation;

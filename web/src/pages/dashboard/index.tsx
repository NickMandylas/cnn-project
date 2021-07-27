import React from "react";
import { Box, Columns, Heading, Paragraph } from "bumbag";
import {
  Head,
  Loading,
  OptionBox,
  PatientSearch,
  Wrapper,
} from "@app/components";
import useAuth from "@app/utils/useAuth";
import withApollo from "@app/utils/withApollo";
import { useRouter } from "next/router";

const Dashboard = () => {
  const status = useAuth();
  const router = useRouter();

  if (!status) {
    return <Loading />;
  }

  return (
    <Wrapper>
      <Head title="Dashboard" content="Dashboard for Platform" />
      <Box
        border="3px solid"
        borderColor="primary"
        borderRadius="2"
        padding="20px"
      >
        <Heading use="h4" marginBottom="25px">
          Patient Search
        </Heading>
        <PatientSearch firstName="" lastName="" router={router} />
      </Box>
      <Columns marginTop="20px">
        <OptionBox
          title="Create Patient"
          buttonTitle="Create"
          onClick={() => router.push("/dashboard/patient/create")}
        />
        <OptionBox
          title="Add Historical Data"
          buttonTitle="Create"
          onClick={() => router.push("/dashboard")}
        />
        <OptionBox
          title="Perform Cancer Check"
          buttonTitle="Check"
          onClick={() => router.push("/dashboard")}
        />
      </Columns>
      <Box
        border="3px solid"
        borderColor="primary"
        borderRadius="2"
        padding="20px"
        marginTop="20px"
      >
        <Heading use="h4" marginBottom="25px">
          Recent Checks
        </Heading>
        <Paragraph>TODO</Paragraph>
      </Box>
    </Wrapper>
  );
};

export default withApollo({ ssr: false })(Dashboard);

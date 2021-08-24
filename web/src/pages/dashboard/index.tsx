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
    <Wrapper selectedId="Home">
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
        <PatientSearch type="view" firstName="" lastName="" router={router} />
      </Box>
      <Columns marginTop="20px">
        <OptionBox
          title="Create Patient"
          buttonTitle="Create"
          description="Add a new patient to the system to perform future skin
          cancer checks."
          onClick={() => router.push("/dashboard/patient/create")}
        />
        <OptionBox
          title="Perform Cancer Check"
          buttonTitle="Check"
          description="Perform cancer check with image processing of the patient’s skin lesion."
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
        <Paragraph font="mono">TODO</Paragraph>
      </Box>
    </Wrapper>
  );
};

export default withApollo({ ssr: false })(Dashboard);

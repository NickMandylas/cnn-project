import { Box, Columns, Heading, Button } from "bumbag";
import { Loading, PatientSearch, Wrapper } from "@app/components";
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
        <Columns.Column spread={4}>
          <Box
            border="3px solid"
            borderColor="primary"
            borderRadius="2"
            padding="20px"
          >
            <Heading use="h4" marginBottom="25px" textAlign="center">
              Create Patient
            </Heading>
            <Button width="100%">Create</Button>
          </Box>
        </Columns.Column>
        <Columns.Column spread={4}>
          <Box
            border="3px solid"
            borderColor="primary"
            borderRadius="2"
            padding="20px"
          >
            <Heading use="h4" marginBottom="25px" textAlign="center">
              Add Historical Data
            </Heading>
            <Button width="100%">Add</Button>
          </Box>
        </Columns.Column>
        <Columns.Column spread={4}>
          <Box
            border="3px solid"
            borderColor="primary"
            borderRadius="2"
            padding="20px"
          >
            <Heading use="h4" marginBottom="25px" textAlign="center">
              Perform Cancer Check
            </Heading>
            <Button width="100%">Start</Button>
          </Box>
        </Columns.Column>
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
      </Box>
    </Wrapper>
  );
};

export default withApollo({ ssr: false })(Dashboard);

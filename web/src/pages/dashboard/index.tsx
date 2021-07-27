import { Box, Heading } from "bumbag";
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
    </Wrapper>
  );
};

export default withApollo({ ssr: false })(Dashboard);

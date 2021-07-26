import { Text } from "bumbag";
import { Loading, Wrapper } from "@app/components";
import useAuth from "@app/utils/useAuth";
import withApollo from "@app/utils/withApollo";

const Patient = () => {
  const status = useAuth();

  if (!status) {
    return <Loading />;
  }

  return (
    <Wrapper>
      <Text>Hello</Text>
    </Wrapper>
  );
};

export default withApollo({ ssr: false })(Patient);

import { useAccountQuery } from "@app/generated/graphql";
import withApollo from "@app/utils/withApollo";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Loading } from "@app/components";

const Index = () => {
  const { data, loading } = useAccountQuery();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !data?.account?.account) {
      router.replace("/login?redirected=true");
    } else {
      router.replace("/dashboard?redirected=true");
    }
  });

  return <Loading />;
};

export default withApollo({ ssr: false })(Index);

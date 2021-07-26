import { useAccountQuery } from "@app/generated/graphql";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const useAuth = () => {
  const { data, loading } = useAccountQuery();
  const [status, setStatus] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !data?.account?.account) {
      router.replace("/login");
    } else if (!loading && data?.account?.account) {
      setStatus(true);
    }
  }, [loading, data, router]);

  return status;
};

export default useAuth;

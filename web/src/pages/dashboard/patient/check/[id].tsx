import React from "react";
import { Loading, Wrapper, Head } from "@app/components";
import { useCheckQuery } from "@app/generated/graphql";
import useAuth from "@app/utils/useAuth";
import withApollo from "@app/utils/withApollo";
import { useRouter } from "next/router";
import {
  Box,
  Paragraph,
  Text,
  Heading,
  Set,
  Button,
  Image,
  Table,
} from "bumbag";

const Patient = () => {
  const router = useRouter();
  const auth = useAuth();
  const { id } = router.query;

  const { data, loading } = useCheckQuery({
    variables: { id: id as string },
  });

  const check = data?.check?.check;

  if (!auth || loading) {
    return <Loading />;
  }

  return (
    <Wrapper>
      <Head title={`Check - ${check?.id}`} content="Patient Information View" />
      {check ? (
        <React.Fragment>
          <Heading use="h5" paddingBottom="5px">
            Results
          </Heading>
          <Table
            borderColor="primary"
            borderWidth="3px"
            marginTop="15px"
            marginBottom="20px"
          >
            <Table.Head>
              <Table.Row>
                <Table.HeadCell>Scan Image</Table.HeadCell>
                <Table.HeadCell>Scan Date</Table.HeadCell>
                <Table.HeadCell>Cancer Variant</Table.HeadCell>
                <Table.HeadCell>Localisation</Table.HeadCell>
                <Table.HeadCell>Confidence</Table.HeadCell>
                {/* <Table.HeadCell textAlign="right"></Table.HeadCell> */}
              </Table.Row>
            </Table.Head>
            <Table.Body>
              <Table.Row>
                <Table.Cell>
                  <Image
                    src={check.scan}
                    style={{ width: "250px" }}
                    alt={`${check.scan}`}
                  />
                </Table.Cell>
                <Table.Cell>
                  {new Date(Number(check.scanDate as string)).toDateString()}
                </Table.Cell>
                <Table.Cell>{check.variant}</Table.Cell>
                <Table.Cell>{check.localisation}</Table.Cell>
                <Table.Cell>{check.confidence}</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </React.Fragment>
      ) : (
        <Heading use="h4" paddingBottom="15px">
          Check ID Not Found
        </Heading>
      )}
      <Set marginTop="10px">
        <Button palette="primary" onClick={() => router.push("/dashboard")}>
          Return to Dashboard
        </Button>
      </Set>
    </Wrapper>
  );
};

export default withApollo({ ssr: false })(Patient);

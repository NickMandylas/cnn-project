import React from "react";
import { Box, Columns, Heading, Image, Table } from "bumbag";
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
import { useChecksQuery } from "@app/generated/graphql";

const Dashboard = () => {
  const status = useAuth();
  const router = useRouter();

  const { data, loading } = useChecksQuery({});
  const checks = data?.checks?.checks;

  if (!status || loading) {
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
          onClick={() => router.push("/dashboard/patient/check")}
        />
      </Columns>
      <Box
        border="3px solid"
        borderColor="primary"
        borderRadius="2"
        marginTop="20px"
      >
        <Heading use="h4" padding="20px" paddingBottom="15px">
          Recent Checks
        </Heading>
        <Table>
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
            {checks &&
              checks.map((check, id) => {
                return (
                  <Table.Row key={id}>
                    <Table.Cell>
                      <Image
                        src={check.scan}
                        style={{ width: "250px" }}
                        alt={`${check.scan}`}
                      />
                    </Table.Cell>
                    <Table.Cell>
                      {new Date(
                        Number(check.scanDate as string)
                      ).toDateString()}
                    </Table.Cell>
                    <Table.Cell>{check.variant}</Table.Cell>
                    <Table.Cell>{check.localisation}</Table.Cell>
                    <Table.Cell>{check.confidence}</Table.Cell>
                  </Table.Row>
                );
              })}
          </Table.Body>
        </Table>
      </Box>
    </Wrapper>
  );
};

export default withApollo({ ssr: false })(Dashboard);

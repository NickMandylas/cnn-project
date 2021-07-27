import React from "react";
import { Text, Table, Button, Heading, Box } from "bumbag";
import { Head, Loading, PatientSearch, Wrapper } from "@app/components";
import useAuth from "@app/utils/useAuth";
import withApollo from "@app/utils/withApollo";
import { NextRouter, useRouter } from "next/router";
import { PatientsQuery, usePatientsQuery } from "@app/generated/graphql";

const Patient = () => {
  const status = useAuth();
  const router = useRouter();
  const { firstName, lastName } = router.query;

  const { data, loading } = usePatientsQuery({
    variables: {
      firstName: firstName as string,
      lastName: lastName as string,
    },
    notifyOnNetworkStatusChange: true,
  });

  if (!status || loading) {
    return <Loading />;
  }

  return (
    <Wrapper>
      <Head
        title="Patient - Search"
        content="Search for patient information."
      />
      <Text>
        <Heading use="h4" paddingBottom="15px">
          Patient Search
        </Heading>
        <PatientSearch
          firstName={firstName}
          lastName={lastName}
          router={router}
        />
        <Box
          style={{ width: "100%", border: "1px solid" }}
          borderColor="primary"
          marginTop="20px"
          marginBottom="20px"
        />
        <Heading use="h5">Results</Heading>
        <PatientsResultsTable data={data} router={router} />
      </Text>
    </Wrapper>
  );
};

interface PatientsResultsTableProps {
  data: PatientsQuery | undefined;
  router: NextRouter;
}

const PatientsResultsTable: React.FC<PatientsResultsTableProps> = ({
  data,
  router,
}) => {
  if (data?.patients?.patients?.length !== 0) {
    return (
      <Table borderColor="primary" borderWidth="3px" marginTop="15px">
        <Table.Head>
          <Table.Row>
            <Table.HeadCell>Full Name</Table.HeadCell>
            <Table.HeadCell>Email Address</Table.HeadCell>
            <Table.HeadCell textAlign="right"></Table.HeadCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {data?.patients?.patients?.map((patient, id) => {
            return (
              <Table.Row key={id}>
                <Table.Cell>{`${patient.firstName} ${patient.lastName}`}</Table.Cell>
                <Table.Cell>{`${patient.email}`}</Table.Cell>
                <Table.Cell textAlign="right">
                  <Button
                    size="small"
                    palette="secondary"
                    onClick={() =>
                      router.push(`/dashboard/patient/${patient.id}`)
                    }
                  >
                    View Patient
                  </Button>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    );
  } else {
    return (
      <Text font="mono" fontSize="200" color="warning">
        Could not find any patients!
      </Text>
    );
  }
};

export default withApollo({ ssr: false })(Patient);

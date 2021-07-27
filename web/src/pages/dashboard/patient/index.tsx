import React from "react";
import { Text, Table, Button, Heading, Box, Columns, InputField } from "bumbag";
import { Loading, Wrapper } from "@app/components";
import useAuth from "@app/utils/useAuth";
import withApollo from "@app/utils/withApollo";
import { NextRouter, useRouter } from "next/router";
import { PatientsQuery, usePatientsQuery } from "@app/generated/graphql";
import { Form, Formik, Field } from "formik";
import * as yup from "yup";

const Patient = () => {
  const status = useAuth();
  const router = useRouter();
  const { firstName, lastName } = router.query;

  const { data, loading } = usePatientsQuery({
    variables: {
      firstName: firstName as string,
      lastName: lastName as string,
    },
  });

  if (!status || loading) {
    return <Loading />;
  }

  return (
    <Wrapper>
      <Text>
        <Heading use="h4" paddingBottom="15px">
          Patient Search
        </Heading>
        <Formik
          initialValues={{
            firstName: firstName === undefined ? "" : firstName,
            lastName: lastName === undefined ? "" : lastName,
          }}
          onSubmit={(values) => {
            router.push(
              `/dashboard/patient?firstName=${values.firstName}&lastName=${values.lastName}`
            );
          }}
        >
          <Form>
            <Box>
              <Columns>
                <Columns.Column spread={5}>
                  <Field
                    component={InputField.Formik}
                    name="firstName"
                    label="First Name"
                    placeholder="John"
                  />
                </Columns.Column>
                <Columns.Column spread={5}>
                  <Field
                    component={InputField.Formik}
                    name="lastName"
                    label="Last Name"
                    placeholder="Doe"
                  />
                </Columns.Column>
                <Columns.Column spread={2}>
                  <Button
                    type="submit"
                    palette="primary"
                    marginTop="23px"
                    width="100%"
                  >
                    Submit
                  </Button>
                </Columns.Column>
              </Columns>
            </Box>
          </Form>
        </Formik>
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

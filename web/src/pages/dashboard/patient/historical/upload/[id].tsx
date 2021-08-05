import React from "react";
import { Loading, Wrapper, Head } from "@app/components";
import {
  useDeletePatientMutation,
  useHistoricalsQuery,
  usePatientQuery,
} from "@app/generated/graphql";
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
  Input,
  FieldStack,
  FieldWrapper,
  InputField,
  RadioGroup,
} from "bumbag";
import { Field, Form, Formik } from "formik";

const Patient = () => {
  const router = useRouter();
  const auth = useAuth();
  const { id } = router.query;

  const patientQuery = usePatientQuery({
    variables: { id: id as string },
  });

  const historicalsQuery = useHistoricalsQuery({
    variables: { patientId: id as string },
  });

  const [deletePatient, { loading: loadingDelete }] =
    useDeletePatientMutation();

  const patient = patientQuery.data?.patient?.patient;
  const historicals = historicalsQuery.data?.historicals?.historicals;

  if (!auth || patientQuery.loading || historicalsQuery.loading) {
    return <Loading />;
  }

  return (
    <Wrapper>
      <Head
        title={`Patient - ${patient?.firstName} ${patient?.lastName}`}
        content="Patient Information View"
      />
      {patient ? (
        <React.Fragment>
          <PatientInformation patient={patient as any} />{" "}
        </React.Fragment>
      ) : (
        <Heading use="h4" paddingBottom="15px">
          Patient Not Found
        </Heading>
      )}
      <Set marginTop="10px">
        <Button palette="primary" onClick={() => router.back()}>
          Back
        </Button>
        {patient ? (
          <React.Fragment>
            <Button
              palette="success"
              onClick={() =>
                router.push(`/dashboard/patient/edit/${patient.id}`)
              }
            >
              Upload
            </Button>
          </React.Fragment>
        ) : null}
      </Set>
    </Wrapper>
  );
};

interface PatientInformationProps {
  patient: {
    id: string;
    firstName: string;
    lastName: string;
    sex: string;
    dateOfBirth: string;
    notes: string | null;
  };
}

const PatientInformation: React.FC<PatientInformationProps> = ({ patient }) => {
  const dt = new Date(Number(patient?.dateOfBirth));

  return (
    <React.Fragment>
      <Heading use="h5" paddingBottom="5px">
        Patient Information
      </Heading>
      <Box
        padding="20px"
        border="3px solid"
        borderColor="primary"
        borderRadius="2"
        marginBottom="20px"
      >
        <Formik>
          <Form>
            <FieldStack>
              <FieldStack orientation="horizontal">
                <Field
                  component={InputField.Formik}
                  name="firstName"
                  label="First Name"
                  placeholder="John"
                />
                <Field
                  component={InputField.Formik}
                  name="lastName"
                  label="Last Name"
                  placeholder="Doe"
                />
              </FieldStack>
              <Field
                component={InputField.Formik}
                name="email"
                label="Email Address"
                placeholder="john.doe@cancer.org"
              />
              <FieldStack orientation="horizontal">
                <Field
                  component={InputField.Formik}
                  name="dateOfBirth"
                  label="Date of Birth (DD/MM/YYYY)"
                  placeholder="20/11/1996"
                />
                <FieldWrapper label="Sex">
                  <Field
                    component={RadioGroup.Formik}
                    orientation="horizontal"
                    name="sex"
                    defaultValue="Male"
                    options={[
                      { label: "Male", value: "Male" },
                      { label: "Female", value: "Female" },
                    ]}
                  />
                </FieldWrapper>
              </FieldStack>
              <Set>
                <Button palette="secondary">Go Back</Button>
                <Button type="submit" palette="primary">
                  Submit Edit
                </Button>
              </Set>
            </FieldStack>
          </Form>
        </Formik>
      </Box>
    </React.Fragment>
  );
};

export default withApollo({ ssr: false })(Patient);

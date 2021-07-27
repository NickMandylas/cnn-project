import React from "react";
import { Loading, Wrapper } from "@app/components";
import withApollo from "@app/utils/withApollo";
import {
  Box,
  Button,
  FieldStack,
  FieldWrapper,
  Heading,
  InputField,
  RadioGroup,
  Textarea,
  Set,
} from "bumbag";
import { Field, Form, Formik } from "formik";
import * as yup from "yup";
import {
  PatientDocument,
  PatientQuery,
  useEditPatientMutation,
  usePatientQuery,
} from "@app/generated/graphql";
import useAuth from "@app/utils/useAuth";
import { useRouter } from "next/router";
import { DateTime } from "luxon";

const EditPatientSchema = yup.object().shape({
  firstName: yup.string().required("First name is required!"),
  lastName: yup.string().required("Last name is required!"),
  email: yup
    .string()
    .email("Doesn't look like a valid email!")
    .required("Email is required!"),
  dateOfBirth: yup
    .string()
    .matches(
      /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})/,
      "Format is not DD/MM/YYYY"
    )
    .required("Date is required!"),
});

const Edit = () => {
  const router = useRouter();
  const auth = useAuth();
  const { id } = router.query;

  const { data, loading } = usePatientQuery({
    variables: { id: id as string },
  });

  const [editPatient, { loading: loadingEdit }] = useEditPatientMutation();

  if (!auth || loading) {
    return <Loading />;
  }

  const patient = data?.patient?.patient;

  if (patient) {
  }
  return (
    <Wrapper>
      <Box
        padding="20px"
        border="3px solid"
        borderColor="primary"
        borderRadius="2"
        marginBottom="20px"
      >
        {!!patient ? (
          <React.Fragment>
            <Heading use="h4" paddingBottom="15px">
              Edit Patient
            </Heading>
            <Formik
              initialValues={{
                firstName: patient!.firstName,
                lastName: patient!.lastName,
                email: patient!.email,
                dateOfBirth: DateTime.fromMillis(
                  Number(patient!.dateOfBirth)
                ).toFormat("dd/MM/yyyy"),
                sex: patient!.sex,
                notes: patient!.notes,
              }}
              validationSchema={EditPatientSchema}
              validateOnBlur={true}
              validateOnChange={false}
              onSubmit={async (input, { setErrors }) => {
                const response = await editPatient({
                  variables: { id: patient!.id, ...input },
                  update: (cache, { data }) => {
                    cache.writeQuery<PatientQuery>({
                      query: PatientDocument,
                      data: {
                        __typename: "Query",
                        patient: { patient: data?.editPatient.patient },
                      },
                    });
                  },
                });

                if (response.data?.editPatient.errors) {
                  setErrors({ email: "Email address is already in use." });
                } else if (response.data?.editPatient.patient) {
                  router.push(
                    `/dashboard/patient/${response.data.editPatient.patient.id}`
                  );
                }
              }}
            >
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
                  <FieldWrapper label="Notes">
                    <Field
                      component={Textarea.Formik}
                      name="notes"
                      placeholder="Enter notes here..."
                    />
                  </FieldWrapper>
                  <Set>
                    <Button palette="secondary" onClick={() => router.back()}>
                      Go Back
                    </Button>
                    <Button
                      type="submit"
                      palette="primary"
                      isLoading={loadingEdit}
                      disabled={loadingEdit}
                    >
                      Submit Edit
                    </Button>
                  </Set>
                </FieldStack>
              </Form>
            </Formik>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Heading use="h4" paddingBottom="15px">
              Patient Not Found
            </Heading>
            <Button palette="primary" onClick={() => router.back()}>
              Go Back
            </Button>
          </React.Fragment>
        )}
      </Box>
    </Wrapper>
  );
};

export default withApollo({ ssr: false })(Edit);

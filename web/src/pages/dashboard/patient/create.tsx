import {
  InputField,
  Box,
  Heading,
  FieldStack,
  RadioGroup,
  FieldWrapper,
  Textarea,
  Button,
} from "bumbag";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import { Loading, Wrapper, Head } from "@app/components";
import useAuth from "@app/utils/useAuth";
import withApollo from "@app/utils/withApollo";
import {
  PatientDocument,
  PatientQuery,
  useCreatePatientMutation,
} from "@app/generated/graphql";
import { useRouter } from "next/router";

const CreatePatientSchema = yup.object().shape({
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

const Create = () => {
  const status = useAuth();
  const router = useRouter();
  const [createPatient, { loading: loading }] = useCreatePatientMutation();

  if (!status) {
    return <Loading />;
  }

  return (
    <Wrapper>
      <Head title="Patient - Create" content="Dashboard for Platform" />
      <Box
        padding="20px"
        border="3px solid"
        borderColor="primary"
        borderRadius="2"
        marginBottom="20px"
      >
        <Heading use="h4" paddingBottom="15px">
          Create Patient
        </Heading>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            dateOfBirth: "",
            sex: "Male",
            notes: "",
          }}
          validationSchema={CreatePatientSchema}
          validateOnBlur={true}
          validateOnChange={false}
          onSubmit={async (input, { setErrors }) => {
            const response = await createPatient({
              variables: input,
              update: (cache, { data }) => {
                cache.writeQuery<PatientQuery>({
                  query: PatientDocument,
                  data: {
                    __typename: "Query",
                    patient: { patient: data?.createPatient.patient },
                  },
                });
              },
            });

            if (response.data?.createPatient.errors) {
              setErrors({ email: "Email address is already in use." });
            } else if (response.data?.createPatient.patient) {
              router.push(
                `/dashboard/patient/${response.data.createPatient.patient.id}`
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
              <Button
                type="submit"
                palette="primary"
                isLoading={loading}
                disabled={loading}
              >
                Create
              </Button>
            </FieldStack>
          </Form>
        </Formik>
      </Box>
    </Wrapper>
  );
};

export default withApollo({ ssr: false })(Create);

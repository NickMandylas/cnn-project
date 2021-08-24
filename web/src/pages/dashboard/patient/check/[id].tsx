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
  FieldStack,
  FieldWrapper,
  InputField,
  SelectField,
} from "bumbag";
import * as yup from "yup";
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
    fetchPolicy: "network-only",
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
          <HistoricalUploadForm id={patient.id} />
          {/* TODO - Fix lazy typing*/}
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
        <Paragraph>
          <Text fontWeight="bold">ID:</Text> {`${patient?.id}`}
        </Paragraph>
        <Paragraph>
          <Text fontWeight="bold">First Name:</Text> {`${patient?.firstName}`}
        </Paragraph>
        <Paragraph>
          <Text fontWeight="bold">Last Name:</Text> {`${patient?.lastName}`}
        </Paragraph>
        <Paragraph>
          <Text fontWeight="bold">Date Of Birth:</Text>{" "}
          {`${dt.getDate()}/${dt.getMonth() + 1}/${dt.getUTCFullYear()}`}
        </Paragraph>
        <Paragraph>
          <Text fontWeight="bold">Sex:</Text> {`${patient?.sex}`}
        </Paragraph>
        <Paragraph>
          <Text fontWeight="bold">Notes:</Text>{" "}
          {`${
            patient?.notes === null || patient?.notes === ""
              ? "N/A"
              : patient?.notes
          }`}
        </Paragraph>
      </Box>
    </React.Fragment>
  );
};

const HistoricalUploadSchema = yup.object().shape({
  localisation: yup.mixed().required("Localisation is required!"),
  file: yup.mixed().required("An image is required"),
});
interface HistoricalUploadFormProps {
  id: string;
}

const HistoricalUploadForm: React.FC<HistoricalUploadFormProps> = ({ id }) => {
  const router = useRouter();

  return (
    <React.Fragment>
      <Heading use="h5" paddingBottom="5px">
        Deep Learning - Cancer Check
      </Heading>
      <Box
        padding="20px"
        border="3px solid"
        borderColor="primary"
        borderRadius="2"
        marginBottom="20px"
        backgroundColor="primary"
      >
        <Formik
          initialValues={{
            file: undefined,
            localisation: "abdomen",
          }}
          validationSchema={HistoricalUploadSchema}
          validateOnBlur={false}
          validateOnChange={false}
          onSubmit={async (input) => {
            // const response = await createHistorical({
            //   variables: {
            //     file: input.file,
            //     localisation: input.localisation,
            //     variant: input.variant,
            //     scanDate: input.scanDate,
            //     patientId: id,
            //   },
            // });
            // if (response.data?.createHistorical) {
            //   router.push(`/dashboard/patient/${id}`);
            // }
          }}
        >
          {(formik) => (
            <Form>
              <FieldStack>
                <FieldStack orientation="horizontal">
                  <FieldWrapper label="Scan Image" color="white">
                    <React.Fragment>
                      <input
                        name="file"
                        placeholder="John"
                        type="file"
                        value={undefined}
                        onChange={(event: any) => {
                          formik.setFieldValue("file", event.target.files[0]);
                        }}
                      />
                      {formik.errors.file && (
                        <Paragraph marginTop="10px" color="warning">
                          {formik.errors.file}
                        </Paragraph>
                      )}
                    </React.Fragment>
                  </FieldWrapper>
                </FieldStack>
                <FieldWrapper label="Localisation" color="white">
                  <Field
                    component={SelectField.Formik}
                    name="localisation"
                    placeholder="Select Localisation..."
                    options={[
                      { key: 1, label: "Abdomen", value: "abdomen" },
                      { key: 2, label: "Acral", value: "acral" },
                      { key: 3, label: "Back", value: "back" },
                      { key: 4, label: "Chest", value: "chest" },
                      { key: 5, label: "Ear", value: "ear" },
                      { key: 6, label: "Face", value: "face" },
                      { key: 7, label: "Foot", value: "foot" },
                      { key: 8, label: "Genital", value: "genital" },
                      { key: 9, label: "Hand", value: "ahnd" },
                      {
                        key: 10,
                        label: "Lower Extremity",
                        value: "lower extremity",
                      },
                      { key: 11, label: "Neck", value: "neck" },
                      { key: 12, label: "Scalp", value: "scalp" },
                      { key: 13, label: "Trunk", value: "trunk" },
                      { key: 14, label: "Unknown", value: "unkown" },
                      {
                        key: 15,
                        label: "Upper Extremity",
                        value: "upper extremity",
                      },
                    ]}
                  />
                </FieldWrapper>
                <Set>
                  <Button
                    type="submit"
                    // isLoading={loadingCreate}
                    // disabled={loadingCreate}
                  >
                    Perform Check
                  </Button>
                </Set>
              </FieldStack>
            </Form>
          )}
        </Formik>
      </Box>
    </React.Fragment>
  );
};

export default withApollo({ ssr: false })(Patient);

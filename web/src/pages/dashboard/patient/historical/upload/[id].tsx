import React from "react";
import { Loading, Wrapper, Head } from "@app/components";
import {
  useCreateHistoricalMutation,
  usePatientQuery,
} from "@app/generated/graphql";
import useAuth from "@app/utils/useAuth";
import withApollo from "@app/utils/withApollo";
import { useRouter } from "next/router";
import {
  Box,
  Heading,
  Set,
  Button,
  FieldStack,
  FieldWrapper,
  InputField,
  SelectField,
} from "bumbag";
import { Field, Form, Formik } from "formik";
import * as yup from "yup";

const Patient = () => {
  const router = useRouter();
  const auth = useAuth();
  const { id } = router.query;

  const patientQuery = usePatientQuery({
    variables: { id: id as string },
  });

  const patient = patientQuery.data?.patient?.patient;

  if (!auth || patientQuery.loading) {
    return <Loading />;
  }

  return (
    <Wrapper>
      <Head
        title={`Patient - ${patient?.firstName} ${patient?.lastName}`}
        content="Patient Historical Scan Upload"
      />
      {patient ? (
        <React.Fragment>
          <HistoricalUploadForm id={id as string} />{" "}
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

const HistoricalUploadSchema = yup.object().shape({
  variant: yup.mixed().required("Variant is required!"),
  localisation: yup.mixed().required("Localisation is required!"),
  file: yup.mixed().required("An image is required"),
  scanDate: yup
    .string()
    .matches(
      /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})/,
      "Format is not DD/MM/YYYY"
    )
    .required("Date is required!"),
});

interface HistoricalUploadFormProps {
  id: string;
}

const HistoricalUploadForm: React.FC<HistoricalUploadFormProps> = ({ id }) => {
  const router = useRouter();

  const [createHistorical, { loading: loadingCreate }] =
    useCreateHistoricalMutation();

  return (
    <React.Fragment>
      <Heading use="h5" paddingBottom="5px">
        Historical Check Upload
      </Heading>
      <Box
        padding="20px"
        border="3px solid"
        borderColor="primary"
        borderRadius="2"
        marginBottom="20px"
      >
        <Formik
          initialValues={{
            file: undefined,
            scanDate: "",
            localisation: "abdomen",
            variant: "nv",
          }}
          validationSchema={HistoricalUploadSchema}
          validateOnBlur={false}
          validateOnChange={false}
          onSubmit={async (input) => {
            const response = await createHistorical({
              variables: {
                file: input.file,
                localisation: input.localisation,
                variant: input.variant,
                scanDate: input.scanDate,
                patientId: id,
              },
            });

            if (response.data?.createHistorical) {
              router.push(`/dashboard/patient/${id}`);
            }
          }}
        >
          {(formik) => (
            <Form>
              <FieldStack>
                <FieldStack orientation="horizontal">
                  <FieldWrapper label="Scan Image">
                    <input
                      name="file"
                      placeholder="John"
                      type="file"
                      value={undefined}
                      onChange={(event: any) => {
                        formik.setFieldValue("file", event.target.files[0]);
                      }}
                    />
                  </FieldWrapper>
                </FieldStack>
                <Field
                  component={InputField.Formik}
                  name="scanDate"
                  label="Date of Scan (DD/MM/YYYY)"
                  placeholder="01/11/2020"
                  width="30%"
                />
                <FieldWrapper label="Variant">
                  <Field
                    component={SelectField.Formik}
                    name="variant"
                    placeholder="Select Variant..."
                    options={[
                      { key: 1, label: "Melanocytic nevi (NV)", value: "nv" },
                      { key: 2, label: "Melanoma (MEL)", value: "mel" },
                      {
                        key: 3,
                        label: "Benign keratosis-like lesions (BKL)",
                        value: "bkl",
                      },
                      {
                        key: 4,
                        label: "Basal cell carcinoma (BCC)",
                        value: "bcc",
                      },
                      {
                        key: 5,
                        label: "Actinic keratoses (AKIEC)",
                        value: "akiec",
                      },
                      { key: 6, label: "Dermatofibroma (DF)", value: "df" },
                      {
                        key: 7,
                        label: "Vascular lesions (VASC)",
                        value: "vasc",
                      },
                    ]}
                  />
                </FieldWrapper>
                <FieldWrapper label="Localisation">
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
                    palette="success"
                    type="submit"
                    isLoading={loadingCreate}
                    disabled={loadingCreate}
                  >
                    Upload
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

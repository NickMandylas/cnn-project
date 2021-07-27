import React from "react";
import { Loading, Wrapper, Head } from "@app/components";
import { usePatientQuery } from "@app/generated/graphql";
import useAuth from "@app/utils/useAuth";
import withApollo from "@app/utils/withApollo";
import { useRouter } from "next/router";
import { Box, Paragraph, Text, Heading, Set, Button } from "bumbag";

const Patient = () => {
  const router = useRouter();
  const auth = useAuth();
  const { id } = router.query;

  const { data, loading } = usePatientQuery({
    variables: { id: id as string },
  });

  const patient = data?.patient?.patient;

  if (!auth || loading) {
    return <Loading />;
  }

  return (
    <Wrapper>
      <Head
        title={`Patient - ${patient?.firstName} ${patient?.lastName}`}
        content="Dashboard for Platform"
      />
      <PatientInformation patient={patient} />
      <PatientCheckHistory />
      <Set>
        <Button palette="primary" onClick={() => router.back()}>
          Back
        </Button>
        <Button
          palette="secondary"
          onClick={() => router.push(`/dashboard/patient/edit/${patient?.id}`)}
        >
          Edit
        </Button>
      </Set>
    </Wrapper>
  );
};

interface PatientInformationProps {
  patient: any;
}

const PatientInformation: React.FC<PatientInformationProps> = ({ patient }) => {
  const dt = new Date(Number(patient?.dateOfBirth));

  return (
    <Box
      padding="20px"
      border="3px solid"
      borderColor="primary"
      borderRadius="2"
      marginBottom="20px"
    >
      <Heading use="h4" paddingBottom="15px">
        Patient Information
      </Heading>
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
  );
};

const PatientCheckHistory = () => {
  return (
    <Box
      padding="20px"
      border="3px solid"
      borderColor="primary"
      borderRadius="2"
      marginBottom="20px"
    >
      <Heading use="h4" paddingBottom="15px">
        Check History
      </Heading>
      <Paragraph>TODO</Paragraph>
    </Box>
  );
};

export default withApollo({ ssr: false })(Patient);

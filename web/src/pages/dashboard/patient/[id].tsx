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
  Image,
  Table,
} from "bumbag";

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
          {/* TODO - Fix lazy typing*/}
          <PatientCheckHistory />
          <PatientHistorical historicals={historicals as any} />
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
        {patient && (
          <React.Fragment>
            <Button
              palette="secondary"
              onClick={() =>
                router.push(`/dashboard/patient/edit/${patient.id}`)
              }
            >
              Edit
            </Button>
            <Button
              palette="success"
              onClick={() =>
                router.push(
                  `/dashboard/patient/historical/upload/${patient.id}`
                )
              }
            >
              Upload Historical
            </Button>
            <Button
              palette="danger"
              isLoading={loadingDelete}
              disabled={loadingDelete}
              onClick={async () => {
                const response = await deletePatient({
                  variables: { id: patient.id },
                  update: (cache) => {
                    cache.evict({ id: "Patient:" + patient.id });
                  },
                });

                if (response.data?.deletePatient) {
                  router.push("/dashboard");
                }
              }}
            >
              Delete
            </Button>
          </React.Fragment>
        )}
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

const PatientCheckHistory = () => {
  return (
    <React.Fragment>
      <Heading use="h5" paddingBottom="5px">
        Deep Learning Checks
      </Heading>
      <Box
        padding="20px"
        border="3px solid"
        borderColor="primary"
        borderRadius="2"
        marginBottom="20px"
      >
        <Paragraph>TODO</Paragraph>
      </Box>
    </React.Fragment>
  );
};

type HistoricalsType = {
  id: string;
  scanDate: string;
  scan: string;
  variant: string;
  localisation: string;
};
interface PatientHistoricalProps {
  historicals: HistoricalsType[];
}

const PatientHistorical: React.FC<PatientHistoricalProps> = ({
  historicals,
}) => {
  return (
    <React.Fragment>
      <Heading use="h5" paddingBottom="5px">
        Historical Checks
      </Heading>
      <Table borderColor="primary" borderWidth="3px" marginTop="15px">
        <Table.Head>
          <Table.Row>
            <Table.HeadCell>Scan Image</Table.HeadCell>
            <Table.HeadCell>Scan Date</Table.HeadCell>
            <Table.HeadCell>Cancer Variant</Table.HeadCell>
            <Table.HeadCell>Localisation</Table.HeadCell>
            {/* <Table.HeadCell textAlign="right"></Table.HeadCell> */}
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {historicals.map((historical, id) => {
            return (
              <Table.Row key={id}>
                <Table.Cell>
                  <Image
                    src={historical.scan}
                    style={{ width: "250px" }}
                    alt={`${historical.scan}`}
                  />
                </Table.Cell>
                <Table.Cell>
                  {new Date(
                    Number(historical.scanDate as string)
                  ).toDateString()}
                </Table.Cell>
                <Table.Cell>{historical.variant}</Table.Cell>
                <Table.Cell>{historical.localisation}</Table.Cell>
                {/* <Table.Cell textAlign="right">
                  <Button size="small" palette="secondary">
                    View Historical
                  </Button>
                </Table.Cell> */}
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </React.Fragment>
  );
};

export default withApollo({ ssr: false })(Patient);

import { Box, Button, Columns, InputField } from "bumbag";
import { Field, Form, Formik } from "formik";
import { NextRouter } from "next/router";
import React from "react";

interface PatientSearchProps {
  firstName: string | string[] | undefined;
  lastName: string | string[] | undefined;
  router: NextRouter;
}

const PatientSearch: React.FC<PatientSearchProps> = ({
  firstName,
  lastName,
  router,
}) => {
  return (
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
  );
};

export default PatientSearch;

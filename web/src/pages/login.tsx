import React, { useState } from "react";
import {
  Heading,
  PageContent,
  Box,
  InputField,
  FieldStack,
  Button,
  Paragraph,
} from "bumbag";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import { useRouter } from "next/router";
import { Head } from "@app/components";
import {
  AccountDocument,
  AccountQuery,
  useLoginMutation,
} from "@app/generated/graphql";
import withApollo from "@app/utils/withApollo";

const LoginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Doesn't look like a valid email!")
    .required("An email is required to sign in!"),
  password: yup.string().required("Looks like you forgot your password!"),
});

const Login = () => {
  const router = useRouter();
  const [login, { loading: loginLoading }] = useLoginMutation();

  return (
    <React.Fragment>
      <Head title="Sign In" content="Sign in to view and use platform" />
      <PageContent height="100vh" alignY="center" alignX="center">
        <Box marginBottom="30px" alignX="center">
          <Heading use="h3" fontWeight="bold" color="primary">
            Login
          </Heading>
          <Paragraph font="mono" fontWeight="bold" marginTop="5px">
            Skin Cancer Detection Platform
          </Paragraph>
        </Box>
        <Box
          width={{ default: "400px", mobile: "300px" }}
          border="3px solid"
          borderColor="primary"
          borderRadius="2"
          paddingTop="30px"
          paddingBottom="30px"
          paddingLeft="20px"
          paddingRight="20px"
        >
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={LoginSchema}
            validateOnBlur={true}
            validateOnChange={false}
            onSubmit={async (input, { setErrors }) => {
              const response = await login({
                variables: input,
                update: (cache, { data }) => {
                  cache.writeQuery<AccountQuery>({
                    query: AccountDocument,
                    data: {
                      __typename: "Query",
                      account: { account: data?.login.account },
                    },
                  });
                },
              });
              if (response.data?.login.errors) {
                setErrors({
                  email: "Email or password is incorrect.",
                  password: "Email or password is incorrect.",
                });
              } else if (response.data?.login.account) {
                router.push("/dashboard");
              }
            }}
          >
            <Form style={{ width: "100%" }}>
              <FieldStack>
                <Field
                  component={InputField.Formik}
                  name="email"
                  label="Email Address"
                  placeholder="john.doe@cancer.org"
                />
                <Field
                  component={InputField.Formik}
                  name="password"
                  label="Password"
                  placeholder="●●●●●●●●"
                  type="password"
                />
                <Button
                  type="submit"
                  palette="primary"
                  width="100%"
                  isLoading={loginLoading}
                >
                  Sign In
                </Button>
              </FieldStack>
            </Form>
          </Formik>
        </Box>
        <Box
          paddingTop="30px"
          paddingBottom="30px"
          paddingLeft="20px"
          paddingRight="20px"
          marginTop="20px"
          backgroundColor="primary"
          borderRadius="2"
          width={{ default: "400px", mobile: "300px" }}
        >
          <Paragraph
            textAlign="center"
            width="100%"
            marginBottom="25px"
            color="white"
            fontWeight="bold"
          >
            {"Haven't got an account yet?"}
          </Paragraph>
          <Button
            palette="default"
            width="100%"
            onClick={() => router.push("/register")}
          >
            Register
          </Button>
        </Box>
      </PageContent>
    </React.Fragment>
  );
};

export default withApollo({ ssr: false })(Login);

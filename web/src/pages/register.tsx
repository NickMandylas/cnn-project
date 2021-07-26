import { useState } from "react";
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
import { useRegisterMutation } from "@app/generated/graphql";

const RegisterSchema = yup.object().shape({
  firstName: yup.string().required("First name is required!"),
  lastName: yup.string().required("Last name is required!"),
  email: yup
    .string()
    .email("Doesn't look like a valid email!")
    .required("An email is required to register!"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters.")
    .required("Looks like you forgot your password!"),
});

const Register = () => {
  const router = useRouter();
  const [register] = useRegisterMutation();
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <PageContent height="100vh" alignY="center" alignX="center">
      <Head title="Register" content="Create an account to use the platform." />
      <Box marginBottom="30px" alignX="center">
        <Heading use="h3" fontWeight="bold" color="primary">
          Register
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
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
          }}
          validationSchema={RegisterSchema}
          validateOnBlur={true}
          validateOnChange={false}
          onSubmit={async (input, { setErrors }) => {
            setLoading(true);
            const response = await register({ variables: input });

            if (response.data?.register.errors) {
              setErrors({ email: "Email address is already in use." });
            } else if (response.data?.register.account) {
              router.push("/dashboard");
            }
            setLoading(false);
          }}
        >
          <Form style={{ width: "100%" }}>
            <FieldStack>
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
                isLoading={loading}
              >
                Register
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
          Already have an account?
        </Paragraph>
        <Button
          palette="default"
          width="100%"
          onClick={() => router.push("/login")}
        >
          Sign In
        </Button>
      </Box>
    </PageContent>
  );
};

export default Register;

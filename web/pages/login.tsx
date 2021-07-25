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

const Login = () => {
  return (
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
          onSubmit={(data) => console.log(data)}
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
              <Button palette="primary" width="100%">
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
        <Button palette="default" width="100%">
          Register
        </Button>
      </Box>
    </PageContent>
  );
};

export default Login;

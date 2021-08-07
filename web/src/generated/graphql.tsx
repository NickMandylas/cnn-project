import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Account = {
  __typename?: 'Account';
  id: Scalars['ID'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type AccountResponse = {
  __typename?: 'AccountResponse';
  errors?: Maybe<Array<FieldError>>;
  account?: Maybe<Account>;
};

export type CreatePatientInput = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  dateOfBirth: Scalars['String'];
  sex: Scalars['String'];
  notes?: Maybe<Scalars['String']>;
};

export type EditPatientInput = {
  id: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  dateOfBirth: Scalars['String'];
  sex: Scalars['String'];
  notes?: Maybe<Scalars['String']>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Historical = {
  __typename?: 'Historical';
  id: Scalars['ID'];
  localisation: Scalars['String'];
  variant: Scalars['String'];
  scanDate: Scalars['String'];
  scan: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type HistoricalResponse = {
  __typename?: 'HistoricalResponse';
  errors?: Maybe<Array<FieldError>>;
  historical?: Maybe<Historical>;
};

export type HistoricalsResponse = {
  __typename?: 'HistoricalsResponse';
  errors?: Maybe<Array<FieldError>>;
  historicals?: Maybe<Array<Historical>>;
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  login: AccountResponse;
  logout: Scalars['Boolean'];
  register: AccountResponse;
  createHistorical: Scalars['Boolean'];
  createPatient: PatientResponse;
  deletePatient: Scalars['Boolean'];
  editPatient: PatientResponse;
};


export type MutationLoginArgs = {
  data: LoginInput;
};


export type MutationRegisterArgs = {
  data: RegisterInput;
};


export type MutationCreateHistoricalArgs = {
  file: Scalars['Upload'];
  patientId: Scalars['String'];
  scanDate: Scalars['String'];
  variant: Scalars['String'];
  localisation: Scalars['String'];
};


export type MutationCreatePatientArgs = {
  data: CreatePatientInput;
};


export type MutationDeletePatientArgs = {
  id: Scalars['String'];
};


export type MutationEditPatientArgs = {
  data: EditPatientInput;
};

export type Patient = {
  __typename?: 'Patient';
  id: Scalars['ID'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  dateOfBirth: Scalars['String'];
  sex: Scalars['String'];
  notes?: Maybe<Scalars['String']>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  historicals: Array<Historical>;
};

export type PatientResponse = {
  __typename?: 'PatientResponse';
  errors?: Maybe<Array<FieldError>>;
  patient?: Maybe<Patient>;
};

export type PatientsResponse = {
  __typename?: 'PatientsResponse';
  errors?: Maybe<Array<FieldError>>;
  patients?: Maybe<Array<Patient>>;
};

export type Query = {
  __typename?: 'Query';
  account?: Maybe<AccountResponse>;
  historical?: Maybe<HistoricalResponse>;
  historicals?: Maybe<HistoricalsResponse>;
  patient?: Maybe<PatientResponse>;
  patients?: Maybe<PatientsResponse>;
};


export type QueryHistoricalArgs = {
  id?: Maybe<Scalars['String']>;
};


export type QueryHistoricalsArgs = {
  patientId?: Maybe<Scalars['String']>;
};


export type QueryPatientArgs = {
  id?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
};


export type QueryPatientsArgs = {
  lastName?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
};

export type RegisterInput = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};


export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'AccountResponse' }
    & { account?: Maybe<(
      { __typename?: 'Account' }
      & Pick<Account, 'id' | 'firstName' | 'lastName' | 'email' | 'createdAt'>
    )>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type RegisterMutationVariables = Exact<{
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'AccountResponse' }
    & { account?: Maybe<(
      { __typename?: 'Account' }
      & Pick<Account, 'id' | 'firstName' | 'lastName' | 'email' | 'createdAt'>
    )>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
  ) }
);

export type AccountQueryVariables = Exact<{ [key: string]: never; }>;


export type AccountQuery = (
  { __typename?: 'Query' }
  & { account?: Maybe<(
    { __typename?: 'AccountResponse' }
    & { account?: Maybe<(
      { __typename?: 'Account' }
      & Pick<Account, 'id' | 'firstName' | 'lastName' | 'email' | 'createdAt'>
    )>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
  )> }
);

export type CreateHistoricalMutationVariables = Exact<{
  file: Scalars['Upload'];
  localisation: Scalars['String'];
  variant: Scalars['String'];
  scanDate: Scalars['String'];
  patientId: Scalars['String'];
}>;


export type CreateHistoricalMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'createHistorical'>
);

export type HistoricalQueryVariables = Exact<{
  id?: Maybe<Scalars['String']>;
}>;


export type HistoricalQuery = (
  { __typename?: 'Query' }
  & { historical?: Maybe<(
    { __typename?: 'HistoricalResponse' }
    & { historical?: Maybe<(
      { __typename?: 'Historical' }
      & Pick<Historical, 'id' | 'scan' | 'scanDate' | 'localisation' | 'variant' | 'createdAt'>
    )> }
  )> }
);

export type HistoricalsQueryVariables = Exact<{
  patientId: Scalars['String'];
}>;


export type HistoricalsQuery = (
  { __typename?: 'Query' }
  & { historicals?: Maybe<(
    { __typename?: 'HistoricalsResponse' }
    & { historicals?: Maybe<Array<(
      { __typename?: 'Historical' }
      & Pick<Historical, 'id' | 'variant' | 'scan' | 'scanDate' | 'localisation'>
    )>>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
  )> }
);

export type CreatePatientMutationVariables = Exact<{
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  dateOfBirth: Scalars['String'];
  sex: Scalars['String'];
  notes?: Maybe<Scalars['String']>;
}>;


export type CreatePatientMutation = (
  { __typename?: 'Mutation' }
  & { createPatient: (
    { __typename?: 'PatientResponse' }
    & { patient?: Maybe<(
      { __typename?: 'Patient' }
      & Pick<Patient, 'id' | 'firstName' | 'lastName' | 'email' | 'dateOfBirth' | 'sex' | 'notes' | 'createdAt'>
    )>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
  ) }
);

export type DeletePatientMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeletePatientMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deletePatient'>
);

export type EditPatientMutationVariables = Exact<{
  id: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  dateOfBirth: Scalars['String'];
  sex: Scalars['String'];
  notes?: Maybe<Scalars['String']>;
}>;


export type EditPatientMutation = (
  { __typename?: 'Mutation' }
  & { editPatient: (
    { __typename?: 'PatientResponse' }
    & { patient?: Maybe<(
      { __typename?: 'Patient' }
      & Pick<Patient, 'id' | 'firstName' | 'lastName' | 'email' | 'dateOfBirth' | 'sex' | 'notes' | 'createdAt'>
    )>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
  ) }
);

export type PatientQueryVariables = Exact<{
  id?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
}>;


export type PatientQuery = (
  { __typename?: 'Query' }
  & { patient?: Maybe<(
    { __typename?: 'PatientResponse' }
    & { patient?: Maybe<(
      { __typename?: 'Patient' }
      & Pick<Patient, 'id' | 'firstName' | 'lastName' | 'email' | 'dateOfBirth' | 'sex' | 'notes' | 'createdAt'>
    )>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
  )> }
);

export type PatientsQueryVariables = Exact<{
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
}>;


export type PatientsQuery = (
  { __typename?: 'Query' }
  & { patients?: Maybe<(
    { __typename?: 'PatientsResponse' }
    & { patients?: Maybe<Array<(
      { __typename?: 'Patient' }
      & Pick<Patient, 'id' | 'firstName' | 'lastName' | 'email' | 'dateOfBirth' | 'sex' | 'notes' | 'createdAt'>
    )>>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
  )> }
);


export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(data: {email: $email, password: $password}) {
    account {
      id
      firstName
      lastName
      email
      createdAt
    }
    errors {
      field
      message
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
  register(
    data: {firstName: $firstName, lastName: $lastName, email: $email, password: $password}
  ) {
    account {
      id
      firstName
      lastName
      email
      createdAt
    }
    errors {
      field
      message
    }
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      firstName: // value for 'firstName'
 *      lastName: // value for 'lastName'
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const AccountDocument = gql`
    query Account {
  account {
    account {
      id
      firstName
      lastName
      email
      createdAt
    }
    errors {
      field
      message
    }
  }
}
    `;

/**
 * __useAccountQuery__
 *
 * To run a query within a React component, call `useAccountQuery` and pass it any options that fit your needs.
 * When your component renders, `useAccountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAccountQuery({
 *   variables: {
 *   },
 * });
 */
export function useAccountQuery(baseOptions?: Apollo.QueryHookOptions<AccountQuery, AccountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AccountQuery, AccountQueryVariables>(AccountDocument, options);
      }
export function useAccountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AccountQuery, AccountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AccountQuery, AccountQueryVariables>(AccountDocument, options);
        }
export type AccountQueryHookResult = ReturnType<typeof useAccountQuery>;
export type AccountLazyQueryHookResult = ReturnType<typeof useAccountLazyQuery>;
export type AccountQueryResult = Apollo.QueryResult<AccountQuery, AccountQueryVariables>;
export const CreateHistoricalDocument = gql`
    mutation CreateHistorical($file: Upload!, $localisation: String!, $variant: String!, $scanDate: String!, $patientId: String!) {
  createHistorical(
    file: $file
    localisation: $localisation
    scanDate: $scanDate
    variant: $variant
    patientId: $patientId
  )
}
    `;
export type CreateHistoricalMutationFn = Apollo.MutationFunction<CreateHistoricalMutation, CreateHistoricalMutationVariables>;

/**
 * __useCreateHistoricalMutation__
 *
 * To run a mutation, you first call `useCreateHistoricalMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateHistoricalMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createHistoricalMutation, { data, loading, error }] = useCreateHistoricalMutation({
 *   variables: {
 *      file: // value for 'file'
 *      localisation: // value for 'localisation'
 *      variant: // value for 'variant'
 *      scanDate: // value for 'scanDate'
 *      patientId: // value for 'patientId'
 *   },
 * });
 */
export function useCreateHistoricalMutation(baseOptions?: Apollo.MutationHookOptions<CreateHistoricalMutation, CreateHistoricalMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateHistoricalMutation, CreateHistoricalMutationVariables>(CreateHistoricalDocument, options);
      }
export type CreateHistoricalMutationHookResult = ReturnType<typeof useCreateHistoricalMutation>;
export type CreateHistoricalMutationResult = Apollo.MutationResult<CreateHistoricalMutation>;
export type CreateHistoricalMutationOptions = Apollo.BaseMutationOptions<CreateHistoricalMutation, CreateHistoricalMutationVariables>;
export const HistoricalDocument = gql`
    query Historical($id: String) {
  historical(id: $id) {
    historical {
      id
      scan
      scanDate
      localisation
      variant
      createdAt
    }
  }
}
    `;

/**
 * __useHistoricalQuery__
 *
 * To run a query within a React component, call `useHistoricalQuery` and pass it any options that fit your needs.
 * When your component renders, `useHistoricalQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHistoricalQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useHistoricalQuery(baseOptions?: Apollo.QueryHookOptions<HistoricalQuery, HistoricalQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HistoricalQuery, HistoricalQueryVariables>(HistoricalDocument, options);
      }
export function useHistoricalLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HistoricalQuery, HistoricalQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HistoricalQuery, HistoricalQueryVariables>(HistoricalDocument, options);
        }
export type HistoricalQueryHookResult = ReturnType<typeof useHistoricalQuery>;
export type HistoricalLazyQueryHookResult = ReturnType<typeof useHistoricalLazyQuery>;
export type HistoricalQueryResult = Apollo.QueryResult<HistoricalQuery, HistoricalQueryVariables>;
export const HistoricalsDocument = gql`
    query Historicals($patientId: String!) {
  historicals(patientId: $patientId) {
    historicals {
      id
      variant
      scan
      scanDate
      localisation
    }
    errors {
      field
      message
    }
  }
}
    `;

/**
 * __useHistoricalsQuery__
 *
 * To run a query within a React component, call `useHistoricalsQuery` and pass it any options that fit your needs.
 * When your component renders, `useHistoricalsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHistoricalsQuery({
 *   variables: {
 *      patientId: // value for 'patientId'
 *   },
 * });
 */
export function useHistoricalsQuery(baseOptions: Apollo.QueryHookOptions<HistoricalsQuery, HistoricalsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HistoricalsQuery, HistoricalsQueryVariables>(HistoricalsDocument, options);
      }
export function useHistoricalsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HistoricalsQuery, HistoricalsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HistoricalsQuery, HistoricalsQueryVariables>(HistoricalsDocument, options);
        }
export type HistoricalsQueryHookResult = ReturnType<typeof useHistoricalsQuery>;
export type HistoricalsLazyQueryHookResult = ReturnType<typeof useHistoricalsLazyQuery>;
export type HistoricalsQueryResult = Apollo.QueryResult<HistoricalsQuery, HistoricalsQueryVariables>;
export const CreatePatientDocument = gql`
    mutation CreatePatient($firstName: String!, $lastName: String!, $email: String!, $dateOfBirth: String!, $sex: String!, $notes: String) {
  createPatient(
    data: {firstName: $firstName, lastName: $lastName, email: $email, dateOfBirth: $dateOfBirth, sex: $sex, notes: $notes}
  ) {
    patient {
      id
      firstName
      lastName
      email
      dateOfBirth
      sex
      notes
      createdAt
    }
    errors {
      field
      message
    }
  }
}
    `;
export type CreatePatientMutationFn = Apollo.MutationFunction<CreatePatientMutation, CreatePatientMutationVariables>;

/**
 * __useCreatePatientMutation__
 *
 * To run a mutation, you first call `useCreatePatientMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePatientMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPatientMutation, { data, loading, error }] = useCreatePatientMutation({
 *   variables: {
 *      firstName: // value for 'firstName'
 *      lastName: // value for 'lastName'
 *      email: // value for 'email'
 *      dateOfBirth: // value for 'dateOfBirth'
 *      sex: // value for 'sex'
 *      notes: // value for 'notes'
 *   },
 * });
 */
export function useCreatePatientMutation(baseOptions?: Apollo.MutationHookOptions<CreatePatientMutation, CreatePatientMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePatientMutation, CreatePatientMutationVariables>(CreatePatientDocument, options);
      }
export type CreatePatientMutationHookResult = ReturnType<typeof useCreatePatientMutation>;
export type CreatePatientMutationResult = Apollo.MutationResult<CreatePatientMutation>;
export type CreatePatientMutationOptions = Apollo.BaseMutationOptions<CreatePatientMutation, CreatePatientMutationVariables>;
export const DeletePatientDocument = gql`
    mutation DeletePatient($id: String!) {
  deletePatient(id: $id)
}
    `;
export type DeletePatientMutationFn = Apollo.MutationFunction<DeletePatientMutation, DeletePatientMutationVariables>;

/**
 * __useDeletePatientMutation__
 *
 * To run a mutation, you first call `useDeletePatientMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePatientMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePatientMutation, { data, loading, error }] = useDeletePatientMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeletePatientMutation(baseOptions?: Apollo.MutationHookOptions<DeletePatientMutation, DeletePatientMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePatientMutation, DeletePatientMutationVariables>(DeletePatientDocument, options);
      }
export type DeletePatientMutationHookResult = ReturnType<typeof useDeletePatientMutation>;
export type DeletePatientMutationResult = Apollo.MutationResult<DeletePatientMutation>;
export type DeletePatientMutationOptions = Apollo.BaseMutationOptions<DeletePatientMutation, DeletePatientMutationVariables>;
export const EditPatientDocument = gql`
    mutation EditPatient($id: String!, $firstName: String!, $lastName: String!, $email: String!, $dateOfBirth: String!, $sex: String!, $notes: String) {
  editPatient(
    data: {id: $id, firstName: $firstName, lastName: $lastName, email: $email, dateOfBirth: $dateOfBirth, sex: $sex, notes: $notes}
  ) {
    patient {
      id
      firstName
      lastName
      email
      dateOfBirth
      sex
      notes
      createdAt
    }
    errors {
      field
      message
    }
  }
}
    `;
export type EditPatientMutationFn = Apollo.MutationFunction<EditPatientMutation, EditPatientMutationVariables>;

/**
 * __useEditPatientMutation__
 *
 * To run a mutation, you first call `useEditPatientMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditPatientMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editPatientMutation, { data, loading, error }] = useEditPatientMutation({
 *   variables: {
 *      id: // value for 'id'
 *      firstName: // value for 'firstName'
 *      lastName: // value for 'lastName'
 *      email: // value for 'email'
 *      dateOfBirth: // value for 'dateOfBirth'
 *      sex: // value for 'sex'
 *      notes: // value for 'notes'
 *   },
 * });
 */
export function useEditPatientMutation(baseOptions?: Apollo.MutationHookOptions<EditPatientMutation, EditPatientMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditPatientMutation, EditPatientMutationVariables>(EditPatientDocument, options);
      }
export type EditPatientMutationHookResult = ReturnType<typeof useEditPatientMutation>;
export type EditPatientMutationResult = Apollo.MutationResult<EditPatientMutation>;
export type EditPatientMutationOptions = Apollo.BaseMutationOptions<EditPatientMutation, EditPatientMutationVariables>;
export const PatientDocument = gql`
    query Patient($id: String, $email: String) {
  patient(id: $id, email: $email) {
    patient {
      id
      firstName
      lastName
      email
      dateOfBirth
      sex
      notes
      createdAt
    }
    errors {
      field
      message
    }
  }
}
    `;

/**
 * __usePatientQuery__
 *
 * To run a query within a React component, call `usePatientQuery` and pass it any options that fit your needs.
 * When your component renders, `usePatientQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePatientQuery({
 *   variables: {
 *      id: // value for 'id'
 *      email: // value for 'email'
 *   },
 * });
 */
export function usePatientQuery(baseOptions?: Apollo.QueryHookOptions<PatientQuery, PatientQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PatientQuery, PatientQueryVariables>(PatientDocument, options);
      }
export function usePatientLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PatientQuery, PatientQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PatientQuery, PatientQueryVariables>(PatientDocument, options);
        }
export type PatientQueryHookResult = ReturnType<typeof usePatientQuery>;
export type PatientLazyQueryHookResult = ReturnType<typeof usePatientLazyQuery>;
export type PatientQueryResult = Apollo.QueryResult<PatientQuery, PatientQueryVariables>;
export const PatientsDocument = gql`
    query Patients($firstName: String, $lastName: String) {
  patients(firstName: $firstName, lastName: $lastName) {
    patients {
      id
      firstName
      lastName
      email
      dateOfBirth
      sex
      notes
      createdAt
    }
    errors {
      field
      message
    }
  }
}
    `;

/**
 * __usePatientsQuery__
 *
 * To run a query within a React component, call `usePatientsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePatientsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePatientsQuery({
 *   variables: {
 *      firstName: // value for 'firstName'
 *      lastName: // value for 'lastName'
 *   },
 * });
 */
export function usePatientsQuery(baseOptions?: Apollo.QueryHookOptions<PatientsQuery, PatientsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PatientsQuery, PatientsQueryVariables>(PatientsDocument, options);
      }
export function usePatientsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PatientsQuery, PatientsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PatientsQuery, PatientsQueryVariables>(PatientsDocument, options);
        }
export type PatientsQueryHookResult = ReturnType<typeof usePatientsQuery>;
export type PatientsLazyQueryHookResult = ReturnType<typeof usePatientsLazyQuery>;
export type PatientsQueryResult = Apollo.QueryResult<PatientsQuery, PatientsQueryVariables>;
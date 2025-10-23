
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export interface ContactFormFieldsFragment {
  __typename: 'ComponentContactForm';
  sys: {
    id: string;
  };
  name?: string | null;
  headline?: string | null;
  subheadline?: string | null;
  contactTypeOptions?: any | null;
  otherContactTypes?: any | null;
  submitButtonText?: string | null;
  successMessage?: string | null;
  privacyPolicyText?: string | null;
  enableCaptcha?: boolean | null;
}

export type CtfContactFormQueryVariables = {
  id: string;
  locale?: string | null;
  preview?: boolean | null;
};

export type CtfContactFormQuery = {
  componentContactForm?: ContactFormFieldsFragment | null;
};

const stubFetcher = async (): Promise<CtfContactFormQuery> => ({
  componentContactForm: null,
});

export const useCtfContactFormQuery = <
  TData = CtfContactFormQuery,
  TError = unknown
>(
  variables: CtfContactFormQueryVariables,
  options?: UseQueryOptions<CtfContactFormQuery, TError, TData>
) =>
  useQuery<CtfContactFormQuery, TError, TData>(
    ['CtfContactForm', variables],
    stubFetcher,
    options
  );

useCtfContactFormQuery.getKey = (variables: CtfContactFormQueryVariables) => ['CtfContactForm', variables];
useCtfContactFormQuery.fetcher = (variables: CtfContactFormQueryVariables) => stubFetcher;


import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export interface HelpOptionFieldsFragment {
  __typename: 'HelpOption';
  sys: {
    id: string;
  };
  title?: string | null;
  description?: string | null;
  iconImage?: {
    url?: string | null;
    title?: string | null;
    width?: number | null;
    height?: number | null;
  } | null;
  categoryValue?: string | null;
}

export interface HelpSectionFieldsFragment {
  __typename: 'ComponentHelpSection';
  sys: {
    id: string;
  };
  name?: string | null;
  headline?: string | null;
  helpOptionsCollection?: {
    items: Array<HelpOptionFieldsFragment | null>;
  } | null;
}

export type CtfHelpSectionQueryVariables = {
  id: string;
  locale?: string | null;
  preview?: boolean | null;
};

export type CtfHelpSectionQuery = {
  componentHelpSection?: HelpSectionFieldsFragment | null;
};

const stubFetcher = async (): Promise<CtfHelpSectionQuery> => ({
  componentHelpSection: null,
});

export const useCtfHelpSectionQuery = <
  TData = CtfHelpSectionQuery,
  TError = unknown
>(
  variables: CtfHelpSectionQueryVariables,
  options?: UseQueryOptions<CtfHelpSectionQuery, TError, TData>
) =>
  useQuery<CtfHelpSectionQuery, TError, TData>(
    ['CtfHelpSection', variables],
    stubFetcher,
    options
  );

useCtfHelpSectionQuery.getKey = (variables: CtfHelpSectionQueryVariables) => ['CtfHelpSection', variables];
useCtfHelpSectionQuery.fetcher = (variables: CtfHelpSectionQueryVariables) => stubFetcher;

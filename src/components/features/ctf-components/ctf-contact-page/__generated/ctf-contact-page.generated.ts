
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { ContactFormFieldsFragment } from '../../ctf-contact-form/__generated/ctf-contact-form.generated';
import { HelpSectionFieldsFragment } from '../../ctf-help-section/__generated/ctf-help-section.generated';

export interface ContactPageFieldsFragment {
  __typename: 'ComponentContactPage';
  sys: {
    id: string;
  };
  name?: string | null;
  slug?: string | null;
  pageTitle?: string | null;
  metaDescription?: string | null;
  heroSection?: ContactFormFieldsFragment | null;
  helpSection?: HelpSectionFieldsFragment | null;
  showNavigation?: boolean | null;
  showFooter?: boolean | null;
}

export type CtfContactPageQueryVariables = {
  slug: string;
  locale?: string | null;
  preview?: boolean | null;
};

export type CtfContactPageQuery = {
  componentContactPageCollection?: {
    items: Array<ContactPageFieldsFragment | null>;
  } | null;
};

const stubFetcher = async (): Promise<CtfContactPageQuery> => ({
  componentContactPageCollection: {
    items: [],
  },
});

export const useCtfContactPageQuery = <
  TData = CtfContactPageQuery,
  TError = unknown
>(
  variables: CtfContactPageQueryVariables,
  options?: UseQueryOptions<CtfContactPageQuery, TError, TData>
) =>
  useQuery<CtfContactPageQuery, TError, TData>(
    ['CtfContactPage', variables],
    stubFetcher,
    options
  );

useCtfContactPageQuery.getKey = (variables: CtfContactPageQueryVariables) => ['CtfContactPage', variables];
useCtfContactPageQuery.fetcher = (variables: CtfContactPageQueryVariables) => stubFetcher;

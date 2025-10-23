import { useCtfContactPageQuery } from './__generated/ctf-contact-page.generated';
import { CtfContactPage } from './ctf-contact-page';

interface CtfContactPageGqlPropsInterface {
  slug: string;
  locale?: string;
  preview?: boolean;
}

export const CtfContactPageGql = (props: CtfContactPageGqlPropsInterface) => {
  const { slug, locale, preview } = props;
  const { data, isLoading } = useCtfContactPageQuery({
    slug,
    locale,
    preview,
  });

  const componentContactPage = data?.componentContactPageCollection?.items[0];

  if (isLoading || !componentContactPage) {
    return null;
  }

  return <CtfContactPage {...componentContactPage} />;
};

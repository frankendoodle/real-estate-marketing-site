import { useCtfContactFormQuery } from './__generated/ctf-contact-form.generated';
import { CtfContactForm } from './ctf-contact-form';

interface CtfContactFormGqlPropsInterface {
  id: string;
  locale?: string;
  preview?: boolean;
}

export const CtfContactFormGql = (props: CtfContactFormGqlPropsInterface) => {
  const { id, locale, preview } = props;
  const { data, isLoading } = useCtfContactFormQuery({
    id,
    locale,
    preview,
  });

  const componentContactForm = data?.componentContactForm;

  if (isLoading || !componentContactForm) {
    return null;
  }

  return <CtfContactForm {...componentContactForm} />;
};

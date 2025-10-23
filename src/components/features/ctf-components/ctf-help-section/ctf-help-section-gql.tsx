import { useCtfHelpSectionQuery } from './__generated/ctf-help-section.generated';
import { CtfHelpSection } from './ctf-help-section';

interface CtfHelpSectionGqlPropsInterface {
  id: string;
  locale?: string;
  preview?: boolean;
}

export const CtfHelpSectionGql = (props: CtfHelpSectionGqlPropsInterface) => {
  const { id, locale, preview } = props;
  const { data, isLoading } = useCtfHelpSectionQuery({
    id,
    locale,
    preview,
  });

  const componentHelpSection = data?.componentHelpSection;

  if (isLoading || !componentHelpSection) {
    return null;
  }

  return <CtfHelpSection {...componentHelpSection} />;
};

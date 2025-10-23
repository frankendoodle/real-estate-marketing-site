import { useContentfulInspectorMode } from '@contentful/live-preview/react';
import Head from 'next/head';

import { ContactPageFieldsFragment } from './__generated/ctf-contact-page.generated';
import { CtfContactForm } from '../ctf-contact-form';
import { CtfHelpSection } from '../ctf-help-section';
import { CtfNavigationGql } from '../ctf-navigation/ctf-navigation-gql';
import { CtfFooterGql } from '../ctf-footer/ctf-footer-gql';

export const CtfContactPage = (props: ContactPageFieldsFragment) => {
  const {
    pageTitle,
    metaDescription,
    heroSection,
    helpSection,
    showNavigation,
    showFooter,
    sys: { id },
  } = props;

  const inspectorMode = useContentfulInspectorMode({ entryId: id });

  return (
    <>
      <Head>
        <title>{pageTitle || 'Contact Us'}</title>
        {metaDescription && <meta name="description" content={metaDescription} />}
      </Head>

      {showNavigation && <CtfNavigationGql />}

      <main {...inspectorMode({ fieldId: 'heroSection' })}>
        {heroSection && <CtfContactForm {...heroSection} />}
      </main>

      {helpSection && (
        <section {...inspectorMode({ fieldId: 'helpSection' })}>
          <CtfHelpSection {...helpSection} />
        </section>
      )}

      {showFooter && <CtfFooterGql />}
    </>
  );
};

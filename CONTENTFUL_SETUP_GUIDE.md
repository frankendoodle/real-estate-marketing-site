# Contentful Setup Guide for Marcus Millichap Contact Us Page

## Overview

This guide will help you set up the Contentful content model for the Marcus Millichap Contact Us page. This is a learning-focused implementation that demonstrates how Contentful stores and manages content, and how the Next.js application uses that content to control the user experience.

## Content Model Architecture

### Key Concepts

**Content Types**: These are like database schemas or templates that define the structure of your content. Each content type has fields that hold different types of data.

**Entries**: These are instances of content types - the actual content that editors create and manage.

**References**: Content types can reference other content types, allowing you to build modular, reusable content structures.

## Content Types to Create

### 1. ComponentContactForm (Contact Form Component)

This is the main form component that will be placed on the Contact Us page.

**Content Type ID**: `componentContactForm`

**Fields**:
- **Name** (Short text, required): Internal name for the component
- **Headline** (Short text): Form title (e.g., "Contact Us")
- **Subheadline** (Short text): Optional subtitle
- **Contact Type Options** (JSON Object): Configuration for contact type radio buttons
  ```json
  {
    "options": [
      { "value": "buyer", "label": "Buyer" },
      { "value": "seller", "label": "Seller" },
      { "value": "investor", "label": "Investor" },
      { "value": "other", "label": "Other" }
    ]
  }
  ```
- **Other Contact Types** (JSON Object): Dropdown options when "Other" is selected
  ```json
  {
    "options": [
      { "value": "broker", "label": "Broker" },
      { "value": "agent", "label": "Agent" },
      { "value": "press", "label": "Press/Media" },
      { "value": "vendor", "label": "Vendor" }
    ]
  }
  ```
- **Submit Button Text** (Short text): Text for the submit button
- **Success Message** (Long text): Message shown after successful submission
- **Privacy Policy Text** (Long text): Privacy/consent text
- **Enable Captcha** (Boolean): Whether to show captcha

### 2. ComponentHelpSection (How Can I Help You Section)

This component displays clickable cards that help users categorize their inquiry.

**Content Type ID**: `componentHelpSection`

**Fields**:
- **Name** (Short text, required): Internal name
- **Headline** (Short text): Section title (e.g., "How can I help you?")
- **Help Options** (References, multiple): Links to HelpOption entries

### 3. HelpOption (Individual Help Card)

Represents each clickable option in the help section.

**Content Type ID**: `helpOption`

**Fields**:
- **Title** (Short text, required): Option title
- **Description** (Short text): Brief description
- **Icon Image** (Media, single): Image/icon for the card
- **Category Value** (Short text): Internal value used when selected

### 4. ComponentContactPage (Full Contact Page)

This is the main page content type that brings everything together.

**Content Type ID**: `componentContactPage`

**Fields**:
- **Name** (Short text, required): Internal name
- **Slug** (Short text, required): URL slug (e.g., "contact-us")
- **Page Title** (Short text): SEO title
- **Meta Description** (Long text): SEO description
- **Hero Section** (Reference, single): Link to ComponentContactForm
- **Help Section** (Reference, single): Link to ComponentHelpSection
- **Show Navigation** (Boolean): Whether to show the navigation menu
- **Show Footer** (Boolean): Whether to show the footer

### 5. NavigationMenu (Navigation Component)

Defines the main navigation menu.

**Content Type ID**: `navigationMenu`

**Fields**:
- **Name** (Short text, required): Internal name
- **Logo** (Media, single): Company logo
- **Menu Items** (References, multiple): Links to NavigationItem entries

### 6. NavigationItem (Menu Item)

Individual navigation menu item.

**Content Type ID**: `navigationItem`

**Fields**:
- **Label** (Short text, required): Display text
- **URL** (Short text): Link URL
- **Open in New Tab** (Boolean): Whether to open in new tab
- **Sub Items** (References, multiple): Child menu items for dropdowns

### 7. Footer (Footer Component)

Defines the page footer.

**Content Type ID**: `footer`

**Fields**:
- **Name** (Short text, required): Internal name
- **Copyright Text** (Short text): Copyright notice
- **Footer Columns** (References, multiple): Links to FooterColumn entries
- **Social Links** (References, multiple): Links to SocialLink entries

### 8. FooterColumn (Footer Column)

A column of links in the footer.

**Content Type ID**: `footerColumn`

**Fields**:
- **Title** (Short text): Column heading
- **Links** (References, multiple): Links to FooterLink entries

### 9. FooterLink (Footer Link)

Individual link in footer.

**Content Type ID**: `footerLink`

**Fields**:
- **Label** (Short text, required): Display text
- **URL** (Short text, required): Link URL
- **Open in New Tab** (Boolean): Whether to open in new tab

### 10. SocialLink (Social Media Link)

Social media link with icon.

**Content Type ID**: `socialLink`

**Fields**:
- **Platform** (Short text, required): Platform name (e.g., "LinkedIn", "Twitter")
- **URL** (Short text, required): Profile URL
- **Icon** (Media, single): Social media icon

## Step-by-Step Setup in Contentful

### Step 1: Access Your Contentful Space

1. Log in to Contentful at https://app.contentful.com
2. Navigate to your space (ID: `j8y9m8h5rzut`)
3. Go to "Content model" in the top navigation

### Step 2: Create Content Types

For each content type listed above:

1. Click "Add content type"
2. Enter the Content Type ID and Name
3. Add each field as specified:
   - Click "Add field"
   - Select the field type (Text, Boolean, Media, Reference, JSON Object)
   - Configure field settings (required, validation, etc.)
   - For Reference fields, specify which content types can be referenced
4. Save the content type

### Step 3: Create Sample Content

After creating all content types, create sample entries:

1. **Create Help Options** (4-6 entries):
   - "Buy a Property"
   - "Sell a Property"
   - "Investment Opportunities"
   - "Market Research"
   - "Financing Options"
   - "General Inquiry"

2. **Create Help Section**:
   - Link all help option entries

3. **Create Contact Form**:
   - Fill in all configuration fields
   - Set up contact type options
   - Set up other contact type options

4. **Create Navigation Items**:
   - Home
   - Properties
   - Services
   - About
   - Contact

5. **Create Navigation Menu**:
   - Upload logo
   - Link navigation items

6. **Create Footer Links and Columns**:
   - Company column (About, Careers, Press)
   - Services column (Buy, Sell, Invest)
   - Resources column (Blog, Research, FAQ)
   - Legal column (Privacy, Terms, Accessibility)

7. **Create Social Links**:
   - LinkedIn
   - Twitter
   - Facebook
   - Instagram

8. **Create Footer**:
   - Link all columns and social links
   - Add copyright text

9. **Create Contact Page**:
   - Set slug to "contact-us"
   - Link hero section (contact form)
   - Link help section
   - Enable navigation and footer

### Step 4: Publish Content

1. Go to "Content" in the top navigation
2. Find each entry you created
3. Click "Publish" to make it available via the API

## How Content Flows from Contentful to Next.js

### 1. Content Storage (Contentful)

Content editors create and manage content in Contentful's web interface. The content is stored in Contentful's database and exposed via GraphQL API.

### 2. GraphQL Queries

The Next.js application defines GraphQL queries (in `.graphql` files) that specify exactly what content to fetch from Contentful.

Example query structure:
```graphql
query GetContactPage($slug: String!, $locale: String, $preview: Boolean) {
  componentContactPageCollection(
    where: { slug: $slug }
    locale: $locale
    preview: $preview
    limit: 1
  ) {
    items {
      name
      slug
      pageTitle
      heroSection {
        headline
        contactTypeOptions
        submitButtonText
      }
      helpSection {
        headline
        helpOptions {
          title
          description
          iconImage {
            url
          }
        }
      }
    }
  }
}
```

### 3. Code Generation

When you run `yarn graphql-codegen:generate`, the GraphQL Code Generator:
- Reads your `.graphql` query files
- Connects to Contentful's GraphQL API
- Generates TypeScript types and React Query hooks
- Creates files in `__generated` directories

This gives you:
- **Type safety**: TypeScript knows the exact shape of your content
- **Auto-complete**: Your IDE can suggest available fields
- **React hooks**: Easy-to-use functions to fetch data

### 4. Server-Side Rendering (SSR)

When a user visits `/contact-us`:

1. Next.js calls `getServerSideProps` on the server
2. The function uses generated hooks to fetch content from Contentful
3. Content is fetched based on the slug ("contact-us")
4. Data is passed to the React component as props
5. The page is rendered on the server with the content
6. HTML is sent to the user's browser

### 5. Component Rendering

React components receive the Contentful data and render it:

```typescript
// The component receives typed data from Contentful
export const CtfContactForm = (props: ContactFormFieldsFragment) => {
  const { headline, contactTypeOptions, submitButtonText } = props;
  
  return (
    <form>
      <h1>{headline}</h1>
      {/* Render form fields based on Contentful data */}
      <button>{submitButtonText}</button>
    </form>
  );
};
```

### 6. Live Preview (Optional)

Contentful's Live Preview feature allows editors to see changes in real-time:
- Editor makes changes in Contentful
- Preview pane shows the Next.js site
- Changes appear instantly without publishing
- Uses the Preview API instead of Delivery API

## Key Learning Points

### 1. Separation of Concerns

- **Content** (Contentful): What to display, managed by content editors
- **Presentation** (Next.js): How to display it, managed by developers

### 2. Content Modeling

- Think in terms of reusable components
- Use references to avoid duplication
- Structure content for flexibility

### 3. Type Safety

- GraphQL + TypeScript = compile-time safety
- Catch errors before runtime
- Better developer experience

### 4. Performance

- Server-side rendering for fast initial load
- Content is fetched once per request
- Can be cached for better performance

### 5. Content Management

- Non-technical users can update content
- No code changes needed for content updates
- Preview changes before publishing
- Version history and rollback capability

## Next Steps

After setting up the content model:

1. Run `yarn graphql-codegen:generate` to generate types
2. Create React components that use the generated hooks
3. Test with preview mode to see changes in real-time
4. Publish content to make it live

## Troubleshooting

### Content Not Appearing

- Check that content is published (not just saved as draft)
- Verify the slug matches the URL
- Check that all referenced content is also published

### Type Errors

- Run `yarn graphql-codegen:generate` after changing content model
- Restart your development server
- Check that field names in code match Contentful

### Preview Not Working

- Verify `CONTENTFUL_PREVIEW_ACCESS_TOKEN` is set
- Check that preview mode is enabled in URL (`?preview=true`)
- Ensure content exists in draft state

## Resources

- [Contentful Documentation](https://www.contentful.com/developers/docs/)
- [GraphQL Code Generator](https://www.graphql-code-generator.com/)
- [Next.js Documentation](https://nextjs.org/docs)

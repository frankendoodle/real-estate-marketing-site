# Marcus Millichap Contact Us Page - Implementation Guide

## Overview

This guide walks you through implementing a Contact Us page in Contentful, demonstrating how content management and presentation are separated in a headless CMS architecture.

## What We've Built

I've created the following components for your Contact Us page:

### 1. Contact Form Component (`ctf-contact-form`)
- Full-featured contact form with validation
- Conditional logic (radio buttons with dropdown for "Other" option)
- Checkboxes for terms and newsletter subscription
- Success message display
- Captcha placeholder
- All text and options are managed in Contentful

**Files created:**
- `src/components/features/ctf-components/ctf-contact-form/ctf-contact-form.tsx`
- `src/components/features/ctf-components/ctf-contact-form/ctf-contact-form.graphql`
- `src/components/features/ctf-components/ctf-contact-form/ctf-contact-form-gql.tsx`
- `src/components/features/ctf-components/ctf-contact-form/index.ts`

### 2. Help Section Component (`ctf-help-section`)
- Grid of clickable cards representing different inquiry types
- Visual feedback when selected
- Images/icons for each option
- All content managed in Contentful

**Files created:**
- `src/components/features/ctf-components/ctf-help-section/ctf-help-section.tsx`
- `src/components/features/ctf-components/ctf-help-section/ctf-help-section.graphql`
- `src/components/features/ctf-components/ctf-help-section/ctf-help-section-gql.tsx`
- `src/components/features/ctf-components/ctf-help-section/index.ts`

### 3. Contact Page Component (`ctf-contact-page`)
- Main page component that brings everything together
- Integrates with existing navigation and footer
- SEO metadata support
- Conditional rendering of navigation and footer

**Files created:**
- `src/components/features/ctf-components/ctf-contact-page/ctf-contact-page.tsx`
- `src/components/features/ctf-components/ctf-contact-page/ctf-contact-page.graphql`
- `src/components/features/ctf-components/ctf-contact-page/ctf-contact-page-gql.tsx`
- `src/components/features/ctf-components/ctf-contact-page/index.ts`

## Implementation Steps

### Step 1: Set Up Content Types in Contentful

You need to create the following content types in your Contentful space. Detailed instructions are in `CONTENTFUL_SETUP_GUIDE.md`.

**Required Content Types:**
1. `ComponentContactForm` - The contact form configuration
2. `ComponentHelpSection` - The help section container
3. `HelpOption` - Individual help cards
4. `ComponentContactPage` - The main page that ties everything together

**Important:** The content types must be created with the exact field names and types specified in the setup guide, as the GraphQL queries depend on this structure.

### Step 2: Create Sample Content in Contentful

After creating the content types, you'll need to create actual content entries:

1. **Create Help Options** (6 entries recommended):
   - Buy a Property
   - Sell a Property
   - Investment Opportunities
   - Market Research
   - Financing Options
   - General Inquiry

2. **Create Help Section**:
   - Name: "Contact Help Section"
   - Headline: "How can I help you?"
   - Link all 6 help option entries

3. **Create Contact Form**:
   - Name: "Main Contact Form"
   - Headline: "Contact Us"
   - Subheadline: "We're here to help with all your real estate needs"
   - Contact Type Options (JSON):
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
   - Other Contact Types (JSON):
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
   - Submit Button Text: "Submit Inquiry"
   - Success Message: "Thank you for contacting us! We'll get back to you within 24 hours."
   - Privacy Policy Text: "By submitting this form, you agree to our Privacy Policy and Terms of Service."
   - Enable Captcha: true

4. **Create Contact Page**:
   - Name: "Contact Us Page"
   - Slug: "contact-us"
   - Page Title: "Contact Us | Marcus Millichap"
   - Meta Description: "Get in touch with Marcus Millichap for all your commercial real estate needs."
   - Hero Section: Link to "Main Contact Form"
   - Help Section: Link to "Contact Help Section"
   - Show Navigation: true
   - Show Footer: true

5. **Publish All Content**:
   - Make sure to click "Publish" on each entry
   - Draft content won't be visible via the API

### Step 3: Generate TypeScript Types

Once your content types are set up in Contentful, run:

```bash
cd /home/ubuntu/repos/real-estate-marketing-site
yarn graphql-codegen:generate
```

This will:
- Connect to Contentful's GraphQL API
- Read your content model
- Generate TypeScript types based on your `.graphql` files
- Create `__generated` directories with type-safe hooks

### Step 4: Create the Page Route

The page will be accessible at `/contact-us` through the existing dynamic routing system in `src/pages/[slug].tsx`. However, you may want to create a dedicated route for better control.

**Option A: Use Existing Dynamic Route** (Recommended for learning)
The existing `[slug].tsx` already handles dynamic pages. You just need to update the component resolver to recognize the Contact Page content type.

**Option B: Create Dedicated Route**
Create `src/pages/contact-us.tsx` for a dedicated contact page route.

### Step 5: Update Component Resolver

Update `src/mappings.ts` to include the new components:

```typescript
import { CtfContactFormGql } from './components/features/ctf-components/ctf-contact-form';
import { CtfHelpSectionGql } from './components/features/ctf-components/ctf-help-section';
import { CtfContactPageGql } from './components/features/ctf-components/ctf-contact-page';

// Add to the mappings object:
ComponentContactForm: CtfContactFormGql,
ComponentHelpSection: CtfHelpSectionGql,
ComponentContactPage: CtfContactPageGql,
```

### Step 6: Test Locally

```bash
yarn dev
```

Visit `http://localhost:3000/contact-us` to see your page.

### Step 7: Test Preview Mode

To test Contentful's live preview:

1. Make changes to content in Contentful (don't publish)
2. Visit `http://localhost:3000/contact-us?preview=true`
3. You should see your unpublished changes

## Understanding the Architecture

### Content Flow

```
┌─────────────────┐
│   Contentful    │  ← Content editors manage content here
│   (Headless     │
│    CMS)         │
└────────┬────────┘
         │
         │ GraphQL API
         │
         ▼
┌─────────────────┐
│   GraphQL       │  ← Queries define what data to fetch
│   Queries       │
│   (.graphql)    │
└────────┬────────┘
         │
         │ Code Generation
         │
         ▼
┌─────────────────┐
│  TypeScript     │  ← Auto-generated types and hooks
│  Types &        │
│  Hooks          │
└────────┬────────┘
         │
         │ React Query
         │
         ▼
┌─────────────────┐
│   React         │  ← Components render the content
│   Components    │
└────────┬────────┘
         │
         │ Next.js SSR
         │
         ▼
┌─────────────────┐
│   HTML Page     │  ← User sees the final page
│   (Browser)     │
└─────────────────┘
```

### Key Concepts Demonstrated

#### 1. Content Modeling
The content types in Contentful define the structure of your data. This is like defining database schemas, but for content.

**Example:** The `ComponentContactForm` content type has fields like `headline`, `submitButtonText`, and `contactTypeOptions`. These fields can be edited by content managers without touching code.

#### 2. GraphQL Queries
The `.graphql` files define exactly what data you want to fetch from Contentful.

**Example:** `ctf-contact-form.graphql` specifies:
```graphql
fragment ContactFormFields on ComponentContactForm {
  headline
  subheadline
  contactTypeOptions
  submitButtonText
  # ... other fields
}
```

This tells Contentful: "When I ask for a ContactForm, give me these specific fields."

#### 3. Type Safety
The GraphQL Code Generator creates TypeScript types from your queries. This means:
- Your IDE knows what fields are available
- You get autocomplete
- TypeScript catches errors at compile time

**Example:**
```typescript
export const CtfContactForm = (props: ContactFormFieldsFragment) => {
  const { headline, submitButtonText } = props; // TypeScript knows these exist!
}
```

#### 4. Server-Side Rendering (SSR)
Next.js fetches content from Contentful on the server before sending HTML to the browser. This means:
- Fast initial page load
- SEO-friendly (search engines see the content)
- Content is always fresh

#### 5. Component Composition
The Contact Page component composes smaller components (form, help section, navigation, footer). This is modular and reusable.

#### 6. Separation of Concerns
- **Content Team**: Manages text, images, and configuration in Contentful
- **Development Team**: Builds components and defines how content is displayed
- **No code changes needed** when content is updated

### What Makes This Different from Sitecore?

#### Contentful (Headless CMS)
- **API-First**: Content is accessed via GraphQL/REST APIs
- **Presentation Agnostic**: Same content can power web, mobile, IoT, etc.
- **Developer Freedom**: Use any frontend framework (React, Vue, Angular, etc.)
- **Type Safety**: GraphQL + TypeScript = compile-time safety
- **Modern Workflow**: Git-based development, CI/CD friendly

#### Sitecore (Traditional CMS)
- **Coupled**: Content and presentation are tightly integrated
- **Platform-Specific**: Primarily for .NET/ASP.NET applications
- **Template-Based**: Content rendering tied to Sitecore templates
- **Less Flexible**: Harder to use content across multiple platforms

### Benefits You're Seeing

1. **Content Independence**: Change form text, add help options, modify success messages - all without deploying code

2. **Type Safety**: TypeScript catches errors before runtime. If Contentful's structure changes, your build will fail with clear errors.

3. **Preview Mode**: Content editors can see changes before publishing, in the actual website context.

4. **Performance**: Server-side rendering means fast page loads and good SEO.

5. **Scalability**: The same content model can power multiple applications (web, mobile app, kiosk, etc.)

6. **Developer Experience**: Auto-generated types, hot reloading, modern tooling.

## Next Steps for Learning

### 1. Experiment with Content Changes
- Change the form headline in Contentful
- Add a new help option
- Modify the success message
- See changes appear without code changes

### 2. Add a New Field
- Add a new field to `ComponentContactForm` in Contentful (e.g., "Form Description")
- Update the GraphQL query to include it
- Run `yarn graphql-codegen:generate`
- Use the new field in your component
- See how the type system guides you

### 3. Create a New Component
- Design a new content type (e.g., "Testimonial")
- Create the GraphQL query
- Build the React component
- Use it on the contact page

### 4. Explore Preview Mode
- Make changes in Contentful (don't publish)
- View them at `?preview=true`
- Understand how content editors can preview changes

### 5. Study the Generated Code
- Look at files in `__generated` directories
- See how GraphQL queries become TypeScript types
- Understand the React Query hooks

## Troubleshooting

### "Cannot find module" errors
- Run `yarn graphql-codegen:generate` to generate types
- Restart your development server

### Content not appearing
- Check that content is published in Contentful
- Verify the slug matches ("contact-us")
- Check browser console for errors

### GraphQL generation fails
- Verify Contentful credentials in `.env.local`
- Ensure content types exist in Contentful
- Check that field names match exactly

### Type errors
- Run `yarn graphql-codegen:generate` after changing content model
- Ensure GraphQL queries match Contentful structure
- Check that all referenced content is published

## Resources

- **Contentful Setup Guide**: `CONTENTFUL_SETUP_GUIDE.md` - Detailed content type setup
- **Contentful Docs**: https://www.contentful.com/developers/docs/
- **GraphQL Code Generator**: https://www.graphql-code-generator.com/
- **Next.js Docs**: https://nextjs.org/docs
- **React Query**: https://tanstack.com/query/latest

## Summary

This implementation demonstrates:
- ✅ Content modeling in Contentful
- ✅ GraphQL queries for type-safe data fetching
- ✅ React components that render Contentful content
- ✅ Form with conditional logic
- ✅ Interactive help section
- ✅ Integration with existing navigation and footer
- ✅ Server-side rendering for performance
- ✅ Preview mode for content editors
- ✅ Separation of content and presentation

You now have a working example of how Contentful manages content and how Next.js presents it to users. This pattern can be extended to build entire websites with content managed in Contentful.

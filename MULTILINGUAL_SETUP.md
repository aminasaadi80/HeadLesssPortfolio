# Multilingual Setup Guide

## Frontend Implementation ✅

The React frontend is now configured for multilingual support with English and Farsi.

### What's Been Implemented:

1. **i18n Configuration** (`src/i18n/i18n.ts`)
   - react-i18next for translations
   - Language detection and persistence
   - RTL support for Farsi

2. **Translation Files**
   - English: `src/locales/en/translation.json`
   - Farsi: `src/locales/fa/translation.json`

3. **Language Switcher Component** (`src/Components/LanguageSwitcher.tsx`)
   - Dropdown selector for language switching
   - Integrated in Header (desktop and mobile)

4. **RTL Support**
   - Custom hook: `src/hooks/useRTL.ts`
   - Layout wrapper: `src/Components/Layout.tsx`
   - Automatic direction switching

5. **Helper Hooks**
   - `useMultilingualContent`: For fetching localized content from WordPress

## WordPress Backend Setup Required

To complete the multilingual setup, you need to configure WordPress:

### Option 1: WPML (Recommended - Premium)

1. **Install WPML Plugin**
   - Purchase from: https://wpml.org/
   - Install core plugin and String Translation add-on

2. **Install WPML for WPGraphQL**
   ```bash
   composer require wp-graphql/wp-graphql-wpml
   ```

3. **Configure Languages**
   - Go to WPML → Languages
   - Add English and Farsi
   - Set default language

4. **GraphQL Schema Updates**
   Your queries will automatically include language parameters:
   ```graphql
   query GetPosts($language: LanguageCodeEnum!) {
     posts(where: { language: $language }) {
       nodes {
         id
         title
         # ... other fields
       }
     }
   }
   ```

### Option 2: Polylang (Free Alternative)

1. **Install Plugins**
   - Polylang: https://wordpress.org/plugins/polylang/
   - WPGraphQL Polylang: https://github.com/valu-digital/wp-graphql-polylang

2. **Configure Languages**
   - Go to Languages → Add Language
   - Add English and Farsi
   - Set default language

3. **GraphQL Usage**
   ```graphql
   query GetPosts($language: LanguageCodeEnum!) {
     posts(where: { language: $language }) {
       nodes {
         id
         title
         language {
           code
           name
         }
       }
     }
   }
   ```

## Using Translations in Components

### For UI Text (Static Content):

```typescript
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t('projects.title')}</h1>
      <p>{t('projects.subtitle')}</p>
    </div>
  );
}
```

### For WordPress Content (Dynamic Content):

```typescript
import { useMultilingualContent } from '../hooks/useMultilingualContent';
import { GET_POSTS } from '../graphql/queries';

function Projects() {
  const { data, loading } = useMultilingualContent({
    query: GET_POSTS,
  });
  
  // Content will be fetched based on current language
  return (
    <div>
      {data?.posts?.nodes.map(post => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
}
```

## Updated GraphQL Queries (After WordPress Setup)

Update your queries to accept language parameter:

```typescript
// src/graphql/queries.ts
export const GET_POSTS = gql`
  query GetPosts($language: LanguageCodeEnum) {
    posts(where: { language: $language }) {
      nodes {
        id
        title
        slug
        content
        categories {
          nodes {
            name
            slug
          }
        }
        translation(language: $language) {
          title
          content
          excerpt
        }
      }
    }
  }
`;
```

## Adding More Languages

1. Create new translation file: `src/locales/[lang]/translation.json`
2. Update `src/i18n/i18n.ts`:
   ```typescript
   export const languages = [
     { code: 'en', name: 'English', dir: 'ltr' },
     { code: 'fa', name: 'فارسی', dir: 'rtl' },
     { code: 'ar', name: 'العربية', dir: 'rtl' }, // Example: Arabic
   ];
   ```
3. Add language in WordPress admin panel

## Tailwind CSS RTL Support

Add RTL utilities to your Tailwind config if needed:

```javascript
// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [
    require('tailwindcss-rtl'),
  ],
}
```

Then use RTL-aware classes:
```html
<div className="ps-4 pe-2"> <!-- start/end padding -->
<div className="ms-auto"> <!-- margin-start auto -->
<div className="text-start"> <!-- text alignment -->
```

## Testing

1. **Test Language Switching**
   - Click language selector
   - Verify UI updates
   - Check RTL/LTR layout

2. **Test Content Loading**
   - Switch languages
   - Verify WordPress content updates
   - Check category badges display correctly

3. **Test Browser Language Detection**
   - Clear localStorage
   - Set browser language to Farsi
   - Verify auto-detection works

## Next Steps

1. ✅ Frontend i18n setup complete
2. ⏳ Install and configure WordPress multilingual plugin (WPML or Polylang)
3. ⏳ Update GraphQL queries to include language parameter
4. ⏳ Translate content in WordPress admin
5. ⏳ Test complete multilingual flow

## Troubleshooting

### RTL Issues
- Ensure `document.dir` is set correctly
- Check for hardcoded `left/right` CSS properties
- Use logical properties (start/end) instead

### Content Not Switching
- Verify WordPress plugin is configured
- Check GraphQL query includes language parameter
- Clear Apollo cache when switching languages

### Translation Keys Not Working
- Check translation file JSON syntax
- Verify key path matches exactly
- Check i18n is initialized before component renders
# WordPress Multilingual Content Setup Guide

## ✅ Frontend Changes Complete
- **Farsi is now the default language**
- Created multilingual GraphQL queries
- Created helper functions for language switching
- Example component (ProjectsMultilingual.tsx) showing implementation

## WordPress Backend Setup - Two Approaches

### Approach 1: ACF (Advanced Custom Fields) - RECOMMENDED ✅

This approach uses ACF to create separate fields for each language. No additional multilingual plugins needed!

#### Step 1: Install Required Plugins
1. **ACF PRO** (or free version with limitations)
2. **WPGraphQL for ACF** - Exposes ACF fields to GraphQL

```bash
# Install via Composer
composer require wp-graphql/wp-graphql-acf
```

#### Step 2: Create ACF Field Groups

In WordPress Admin → ACF → Field Groups, create the following:

##### For Posts (Projects):
```
Field Group: "Multilingual Content"
Location: Post Type = Post

Fields:
- title_en (Text) - English Title
- title_fa (Text) - Persian Title
- excerpt_en (Textarea) - English Excerpt  
- excerpt_fa (Textarea) - Persian Excerpt
- content_en (WYSIWYG) - English Content
- content_fa (WYSIWYG) - Persian Content
- project_details_en (Textarea) - English Project Details
- project_details_fa (Textarea) - Persian Project Details
```

##### For Home Page:
```
Field Group: "Home Page Multilingual"
Location: Page = Home

Fields:
Hero Section:
- hero_title_en (Text)
- hero_title_fa (Text)
- hero_subtitle_en (Text)
- hero_subtitle_fa (Text)
- hero_button_text_en (Text)
- hero_button_text_fa (Text)

Skills Section:
- skills_title_en (Text)
- skills_title_fa (Text)
- skills (Repeater)
  - skill_title_en (Text)
  - skill_title_fa (Text)
  - skill_proficiency (Number)
  - skill_image (Image)

About Section:
- about_title_en (Text)
- about_title_fa (Text)
- about_description_en (Textarea)
- about_description_fa (Textarea)
```

##### For About Page:
```
Field Group: "About Page Multilingual"
Location: Page = About

Fields:
- title_en (Text)
- title_fa (Text)
- subtitle_en (Text)
- subtitle_fa (Text)
- description_en (WYSIWYG)
- description_fa (WYSIWYG)

Experience (Repeater):
- experience_title_en (Text)
- experience_title_fa (Text)
- experience_subtitle_en (Text)
- experience_subtitle_fa (Text)
- experience_description_en (Textarea)
- experience_description_fa (Textarea)
```

#### Step 3: Register ACF Fields in GraphQL

Add to your theme's `functions.php`:

```php
// Register ACF fields for GraphQL
add_action('graphql_register_types', function() {
    
    // Register multilingual post fields
    register_graphql_field('Post', 'multilingualContent', [
        'type' => 'MultilingualPostContent',
        'resolve' => function($post) {
            return [
                'titleEn' => get_field('title_en', $post->ID),
                'titleFa' => get_field('title_fa', $post->ID),
                'excerptEn' => get_field('excerpt_en', $post->ID),
                'excerptFa' => get_field('excerpt_fa', $post->ID),
                'contentEn' => get_field('content_en', $post->ID),
                'contentFa' => get_field('content_fa', $post->ID),
                'projectDetailsEn' => get_field('project_details_en', $post->ID),
                'projectDetailsFa' => get_field('project_details_fa', $post->ID),
            ];
        }
    ]);
    
    // Register the type
    register_graphql_object_type('MultilingualPostContent', [
        'fields' => [
            'titleEn' => ['type' => 'String'],
            'titleFa' => ['type' => 'String'],
            'excerptEn' => ['type' => 'String'],
            'excerptFa' => ['type' => 'String'],
            'contentEn' => ['type' => 'String'],
            'contentFa' => ['type' => 'String'],
            'projectDetailsEn' => ['type' => 'String'],
            'projectDetailsFa' => ['type' => 'String'],
        ]
    ]);
});
```

#### Step 4: Configure WPGraphQL Settings

In WordPress Admin → GraphQL → Settings:
1. Enable "Show in GraphQL" for your ACF field groups
2. Set GraphQL field names to match our queries

### Approach 2: Using WPML or Polylang

If you prefer traditional multilingual plugins:

#### WPML Setup:
1. Install WPML ($39/year)
2. Install WPML for WPGraphQL extension
3. Configure languages (Farsi as default, English as secondary)
4. Translate content through WPML interface

#### Polylang Setup (Free):
1. Install Polylang plugin
2. Install WPGraphQL Polylang extension
3. Set Farsi as default language
4. Create translations for each post/page

## Frontend Implementation

### Using the Multilingual Components:

1. **Replace existing components** with multilingual versions:
```typescript
// In App.tsx
import ProjectsMultilingual from './Components/ProjectsMultilingual';

// Replace <Projects /> with <ProjectsMultilingual />
```

2. **Use the helper functions** in your components:
```typescript
import { useLocalizedField } from '../utils/multilingualHelpers';

function MyComponent() {
  const getLocalized = useLocalizedField();
  
  // Automatically gets titleFa when in Farsi, titleEn when in English
  const title = getLocalized(data, 'title');
}
```

3. **For static UI text**, use translations:
```typescript
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t } = useTranslation();
  return <h1>{t('projects.title')}</h1>;
}
```

## Testing Your Setup

1. **Test GraphQL Queries** in GraphiQL IDE:
```graphql
{
  posts {
    nodes {
      multilingualContent {
        titleEn
        titleFa
        excerptEn
        excerptFa
      }
    }
  }
}
```

2. **Verify Language Switching**:
- Change language in the header dropdown
- Check that content updates correctly
- Verify RTL layout for Farsi

3. **Check Default Language**:
- Clear browser cache/localStorage
- Site should load in Farsi by default

## Content Entry Guidelines

When adding content in WordPress:

1. **Always fill both language fields**:
   - Enter English content in `*_en` fields
   - Enter Farsi content in `*_fa` fields

2. **For categories/tags**:
   - Use English names (they'll work as tech badges)
   - Or create separate taxonomy for each language

3. **For images**:
   - Use same images for both languages
   - Add alt text in both languages if needed

## Advantages of ACF Approach

✅ **No extra multilingual plugin costs**
✅ **Full control over field structure**
✅ **Better GraphQL integration**
✅ **Simpler content management**
✅ **No complex URL structure changes**
✅ **Better performance (single query for all languages)**

## Migration from Current Setup

To migrate your existing content:

1. Keep existing title/content as Farsi version
2. Add English translations in new ACF fields
3. Update GraphQL queries gradually
4. Test each component before replacing

## Example WordPress Admin View

After setup, your post editor will look like:

```
📝 Post Editor
├── Title (Farsi) [Native WordPress]
├── Content (Farsi) [Native WordPress]
└── Multilingual Content [ACF Section]
    ├── English Title
    ├── English Content
    ├── English Excerpt
    └── Project Details (EN/FA)
```

## Next Steps

1. ✅ Frontend is ready with Farsi as default
2. ⏳ Install ACF Pro in WordPress
3. ⏳ Install WPGraphQL for ACF
4. ⏳ Create ACF field groups as described
5. ⏳ Add functions.php code for GraphQL registration
6. ⏳ Enter content in both languages
7. ⏳ Test the complete flow

## Support

The multilingual queries are in:
- `src/graphql/multilingualQueries.ts`

Helper functions are in:
- `src/utils/multilingualHelpers.ts`

Example implementation:
- `src/Components/ProjectsMultilingual.tsx`
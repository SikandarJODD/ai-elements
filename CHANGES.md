# Refactoring: Examples → Guides

## Overview
Refactored the examples section into a more structured Guides section with improved navigation and user experience.

## Changes Made

### 1. **New Guides Landing Page** (`/guides`)
   - Created a new landing page at `/guides` with:
     - Hero section with title and description
     - 4x4 responsive grid layout for guide cards
     - Each card displays:
       - Guide thumbnail image
       - Title and description
       - Tags for quick categorization
       - Two action buttons:
         - **Visit**: Navigate to the guide page
         - **Demo**: Try the live demo

### 2. **Route Structure Changes**
   - **Before**: `/examples/one`
   - **After**: `/guides/svelte-5-ai-sdk-integration`
   - Renamed folder: `examples` → `guides`
   - Moved guide content to more descriptive slug-based paths

### 3. **New Configuration File**
   - Created `src/lib/config/guides-data.ts`
   - Centralized guide metadata including:
     - Slug (URL identifier)
     - Title and description
     - Thumbnail image path
     - Demo URL (optional)
     - Tags for categorization

### 4. **Navigation Updates**
   - **Sidebar**: Changed "Examples" → "Guides"
     - Updated link from `/examples/one` → `/guides/svelte-5-ai-sdk-integration`
   - **Top Navigation**: Updated navbar link from `/examples/one` → `/guides`
   - **Search/Navigation Data**: Updated `navigation-data.ts` to reflect new guide URLs

### 5. **Demo Routes**
   - Maintained existing demo functionality at `/demo/one`
   - Demo routes remain unchanged and accessible from guide cards

### 6. **SEO & Meta Tags**
   - Updated canonical URLs in guide pages
   - Updated OpenGraph URLs for better social sharing

## File Structure

```
src/
├── lib/
│   └── config/
│       ├── guides-data.ts (NEW)
│       └── navigation-data.ts (UPDATED)
├── routes/
│   └── (main)/
│       └── guides/
│           ├── +page.svelte (NEW - Landing page)
│           └── svelte-5-ai-sdk-integration/ (RENAMED from examples/one)
│               ├── +page.svelte (UPDATED)
│               └── content.md
```

## Benefits

1. **Better UX**: Users can browse all guides from a single landing page
2. **Clearer Navigation**: "Guides" is more descriptive than "Examples"
3. **Scalability**: Easy to add new guides by updating `guides-data.ts`
4. **SEO Friendly**: Better URLs with descriptive slugs
5. **Consistent Pattern**: Follows same pattern as Components section

## Next Steps

To add a new guide:
1. Add entry to `guides-data.ts`
2. Create folder: `src/routes/(main)/guides/[your-slug]/`
3. Add `+page.svelte` with guide content
4. (Optional) Create corresponding demo at `/demo/[demo-name]`
5. Update sidebar in `app-sidebar.svelte` if needed

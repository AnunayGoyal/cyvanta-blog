'use client'

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `\app\studio\[[...tool]]\page.tsx` route
 */

import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from './sanity/env'
import { schema } from './sanity/schemaTypes'
import { structure } from './sanity/structure'
import { codeInput } from '@sanity/code-input'
import { defineLocations, presentationTool } from 'sanity/presentation'

export default defineConfig({
  title: 'Cyvanta Studio',
  basePath: '/studio',
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema,
  plugins: [
    structureTool({ structure }),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
    codeInput(),
    presentationTool({
      previewUrl: {
        draftMode: {
          enable: '/api/draft',
        },
      },
      resolve: {
        locations: {
          post: defineLocations({
            select: {
              title: 'title',
              slug: 'slug.current',
            },
            resolve: (doc: any) => ({
              locations: [
                {
                  title: doc?.title || 'Untitled',
                  href: `/blog/${doc?.slug}`,
                },
              ],
            }),
          }),
          category: defineLocations({
            select: {
              title: 'title',
              slug: 'slug.current',
            },
            resolve: (doc: any) => ({
              locations: [
                {
                  title: doc?.title || 'Untitled',
                  href: `/blog/category/${doc?.slug}`,
                },
              ],
            }),
          }),
        },
      },
    }),
  ],
})

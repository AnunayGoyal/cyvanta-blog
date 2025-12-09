'use client'

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `\app\studio\[[...tool]]\page.tsx` route
 */

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { HomeIcon } from '@sanity/icons'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from './sanity/env'
import { schema } from './sanity/schemaTypes'
import { structure, defaultDocumentNode } from './sanity/structure'
import { codeInput } from '@sanity/code-input'
import { table } from '@sanity/table'

export default defineConfig({
  title: 'Cyvanta Studio',
  basePath: '/studio',
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema,
  tools: (prev, context) => { // 'prev' is an array of tools
    return prev;
  },
  plugins: [
    structureTool({
      title: 'Content',
      icon: HomeIcon,
      structure,
      defaultDocumentNode
    }),
    codeInput(),
    table(),
  ],
  document: {
    actions: (prev, context) => {
      // Create a custom action order
      const unpublish = prev.find((action) => action.action === 'unpublish')
      const discard = prev.find((action) => action.action === 'discardChanges')
      const publish = prev.find((action) => action.action === 'publish')

      // Filter out the ones we found to avoid duplicates
      const others = prev.filter(
        (action) =>
          action.action !== 'unpublish' &&
          action.action !== 'discardChanges' &&
          action.action !== 'publish'
      )

      // Return explicitly ordered list: Publish | Unpublish | Discard | ... others
      return unpublish && publish && discard
        ? [publish, unpublish, discard, ...others]
        : prev
    },
  },
})

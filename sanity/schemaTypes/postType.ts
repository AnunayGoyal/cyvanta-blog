import { DocumentTextIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'
import { PortableTextImporter } from '../components/PortableTextImporter'

export const postType = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  icon: DocumentTextIcon,
  // Groups removed to "make it all under one"
  fieldsets: [
    {
      name: 'config',
      title: 'Configuration',
      options: { columns: 2 },
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    // --- METADATA FIELDSET (2 Columns) ---
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'author' }],
      fieldset: 'config',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      description: 'Visual theme (e.g. System, Attack)',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: (Rule) => Rule.required(),
      fieldset: 'config',
    }),
    defineField({
      name: 'mainTag',
      title: 'Main Tag',
      description: 'Primary topic (e.g. GRC)',
      type: 'reference',
      to: [{ type: 'tag' }],
      fieldset: 'config',
    }),
    defineField({
      name: 'skillLevel',
      title: 'Skill Level',
      type: 'string',
      options: {
        list: [
          { title: 'Beginner', value: 'beginner' },
          { title: 'Intermediate', value: 'intermediate' },
          { title: 'Advanced', value: 'advanced' },
        ],
        layout: 'radio',
      },
      initialValue: 'intermediate',
      fieldset: 'config',
    }),
    
    // --- MAIN CONTENT ---
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'content',
      title: 'Body Content',
      type: 'array',
      components: {
        input: PortableTextImporter,
      },
      of: [
        defineArrayMember({ type: 'block' }),
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
        }),
        defineArrayMember({
          type: 'code',
          title: 'Code',
          options: {
            withFilename: true,
          },
        }),
        defineArrayMember({
          type: 'object',
          name: 'callout',
          title: 'Callout',
          fields: [
            defineField({
              name: 'style',
              title: 'Style',
              type: 'string',
              options: {
                list: ['info', 'warning', 'danger'],
              },
            }),
            defineField({
              name: 'content',
              title: 'Content',
              type: 'array',
              of: [{ type: 'block' }],
            }),
          ],
        }),
        defineArrayMember({ type: 'table' }),
      ],
    }),

    // --- FORMER SETTINGS/META ---
    defineField({
      name: 'tags',
      title: 'Sub Tags',
      description: 'Ad-hoc topics for this post',
      type: 'array',
      // The validation error indicates these are actually stored as objects/references in the data
      // Changing schema to match the data structure (and the preview logic)
      of: [{ type: 'reference', to: [{ type: 'tag' }] }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category.title',
    },
  },
})

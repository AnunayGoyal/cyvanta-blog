import { DocumentTextIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export const postType = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  icon: DocumentTextIcon,
  groups: [
    {
      name: 'content',
      title: 'Content',
      default: true,
    },
    {
      name: 'settings',
      title: 'Settings',
    },
    {
      name: 'meta',
      title: 'Metadata',
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      group: 'content',
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
      group: 'meta',
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 3,
      group: 'settings',
    }),

    // Date field removed; system _createdAt used instead

    defineField({
      name: 'category',
      title: 'Category',
      description: 'Visual theme/Card style (e.g. System, Attack)',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: (Rule) => Rule.required(),
      group: 'settings',
    }),
    defineField({
      name: 'mainTag',
      title: 'Main Tag',
      description: 'Primary topic of the blog (e.g. GRC, Cloud Security)',
      type: 'reference',
      to: [{ type: 'tag' }],
      group: 'settings',
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'author' }],
      group: 'settings',
    }),
    defineField({
      name: 'tags',
      title: 'Sub Tags',
      description: 'Ad-hoc topics for this post (no separate document required)',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
      group: 'settings',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      group: 'content',
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
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category.title',
    },
  },
})

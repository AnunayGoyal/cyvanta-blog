import { TagIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const tagType = defineType({
    name: 'tag',
    title: 'Tag',
    type: 'document',
    icon: TagIcon,
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
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
        defineField({
            name: 'color',
            title: 'Color',
            type: 'string',
            description: 'Hex code (e.g. #ff0000) or palette name (e.g. red)',
        }),
    ],
})

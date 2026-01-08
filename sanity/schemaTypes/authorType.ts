import { UserIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const authorType = defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  icon: UserIcon,
  fieldsets: [
    { 
      name: 'avatar', 
      title: 'Avatar Configuration', 
    },
    { 
      name: 'identity', 
      title: 'Identity & Bio', 
      options: { columns: 2 } 
    },
    { 
      name: 'socials', 
      title: 'Social Links', 
    },
  ],
  fields: [
    // --- AVATAR FIELDSET (Moved to Top) ---
    defineField({
      name: 'avatarSource',
      title: 'Photo Source',
      type: 'string',
      fieldset: 'avatar',
      options: {
        list: [
          { title: 'Upload Custom', value: 'upload' },
          { title: 'Use Character', value: 'preset' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'upload',
    }),
    defineField({
      name: 'image',
      title: 'Upload Photo',
      type: 'image',
      fieldset: 'avatar',
      options: {
        hotspot: true,
      },
      hidden: ({ document }) => document?.avatarSource !== 'upload',
    }),
    defineField({
      name: 'staticImage',
      title: 'Select Character',
      type: 'string',
      fieldset: 'avatar',
      options: {
        list: [
          { title: 'Cyberpunk Green', value: 'avatar-01.png' },
          { title: 'Robot Blue', value: 'avatar-02.png' },
          { title: 'Network Orange', value: 'avatar-04.png' },
        ],
        layout: 'radio',
      },
      hidden: ({ document }) => document?.avatarSource !== 'preset',
    }),

    // --- IDENTITY FIELDSET ---
    defineField({
      name: 'firstName',
      title: 'First Name',
      type: 'string',
      fieldset: 'identity',
    }),
    defineField({
      name: 'lastName',
      title: 'Last Name',
      type: 'string',
      fieldset: 'identity',
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {
        source: (doc) => `${doc.firstName || ''}-${doc.lastName || ''}`,
        maxLength: 96,
      },
      fieldset: 'identity',
    }),
    defineField({
      name: 'profileTag',
      title: 'Role',
      type: 'string',
      options: {
        list: [
          { title: 'Red Team Operator', value: 'Red Team Operator' },
          { title: 'Vulnerability Researcher', value: 'Vulnerability Researcher' },
          { title: 'Exploit Developer', value: 'Exploit Developer' },
          { title: 'Malware Analyst', value: 'Malware Analyst' },
          { title: 'Threat Hunter', value: 'Threat Hunter' },
          { title: 'Cryptographer', value: 'Cryptographer' },
          { title: 'Security Architect', value: 'Security Architect' },
          { title: 'Intelligence Analyst', value: 'Intelligence Analyst' },
          { title: 'Penetration Tester', value: 'Penetration Tester' },
          { title: 'Social Engineer', value: 'Social Engineer' },
          { title: 'Hardware Hacker', value: 'Hardware Hacker' },
        ],
      },
      initialValue: 'Red Team Operator',
      fieldset: 'identity',
    }),
    defineField({
      name: 'bio',
      title: 'Biography',
      type: 'text',
      rows: 8,
    }),

    // --- SOCIALS FIELDSET ---
    defineField({
      name: 'website',
      title: 'Website',
      type: 'url',
      fieldset: 'socials',
    }),
    defineField({
      name: 'github',
      title: 'GitHub',
      type: 'url',
      fieldset: 'socials',
    }),
    defineField({
      name: 'twitter',
      title: 'X (Twitter)',
      type: 'url',
      fieldset: 'socials',
    }),
    defineField({
      name: 'linkedin',
      title: 'LinkedIn',
      type: 'url',
      fieldset: 'socials',
    }),
    defineField({
      name: 'instagram',
      title: 'Instagram',
      type: 'url',
      fieldset: 'socials',
    }),
  ],
  preview: {
    select: {
      firstName: 'firstName',
      lastName: 'lastName',
      name: 'name', // Fallback for old data
      subtitle: 'profileTag',
      media: 'image',
      staticImage: 'staticImage',
      avatarSource: 'avatarSource',
    },
    prepare(selection) {
      const { firstName, lastName, name, subtitle, media, staticImage, avatarSource } = selection
      let mediaIcon = UserIcon
      
      const isPreset = avatarSource === 'preset'
      const displayName = firstName && lastName ? `${firstName} ${lastName}` : (name || 'New Author')

      return {
        title: displayName,
        subtitle: subtitle || 'Author',
        media: (!isPreset && media) ? media : mediaIcon,
      }
    },
  },
})

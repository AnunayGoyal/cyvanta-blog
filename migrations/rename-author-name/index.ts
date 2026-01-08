import {defineMigration, at, set, unset} from 'sanity/migrate'

export default defineMigration({
  title: 'Split Name to First Name and Last Name',
  documentTypes: ['author'],

  migrate: {
    document(doc, context) {
      if (doc.name && typeof doc.name === 'string') {
        const parts = doc.name.trim().split(' ')
        const firstName = parts[0]
        const lastName = parts.slice(1).join(' ') || ''

        return [
            at('firstName', set(firstName)),
            at('lastName', set(lastName)),
            at('name', unset()),
        ]
      }
    }
  }
})

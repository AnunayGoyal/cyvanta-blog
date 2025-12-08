import type { StructureResolver } from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Cyvanta Content')
    .items([
      S.documentTypeListItem('post').title('Posts'),
      S.divider(),
      S.listItem()
        .title('Configuration')
        .child(
          S.list()
            .title('Configuration')
            .items([
              S.documentTypeListItem('category').title('Categories'),
              S.documentTypeListItem('author').title('Authors'),
            ])
        ),
    ])

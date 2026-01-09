import type { StructureResolver, DefaultDocumentNodeResolver } from 'sanity/structure'
import { TrashIcon, HomeIcon } from '@sanity/icons'
import BulkDeleteTool from './tools/BulkDeleteTool'
import StudioPreview from './components/StudioPreview'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Dashboard')
    .items([
      S.documentTypeListItem('post').title('Posts'),
      S.divider(),
      S.documentTypeListItem('category').title('Categories'),
      S.documentTypeListItem('author').title('Authors'),
      S.documentTypeListItem('tag').title('Tags'),
      S.divider(),
      S.listItem()
        .title('Bulk Delete')
        .icon(TrashIcon)
        .child(
          S.component(BulkDeleteTool)
            .title('Bulk Delete')
        ),
    ])

export const defaultDocumentNode: DefaultDocumentNodeResolver = (S, { schemaType }) => {
  if (schemaType === 'category') {
    return S.document().views([
      S.view.form(),
      S.view
        .component(StudioPreview)
        .options({ type: schemaType, mode: 'card' })
        .title('Card Preview'),
    ])
  }

  // Common views
  const views = [
    S.view.form(),
    S.view
      .component(StudioPreview)
      .options({ type: schemaType, mode: 'normal' })
      .title('Live Preview')
  ]

  // Enable for relevant types
  if (['post', 'category', 'author', 'tag'].includes(schemaType)) {
    if (schemaType === 'post') {
      return S.document().views([
        S.view
          .component(StudioPreview)
          .options({ type: schemaType, mode: 'normal' })
          .title('Live Preview'),
        S.view.form()
      ])
    }
    return S.document().views(views)
  }

  return S.document().views([S.view.form()])
}

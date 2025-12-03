import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('ものがたりEC')
    .items([
      S.documentTypeListItem('artisan').title('職人プロフィール'),
      S.documentTypeListItem('product').title('商品'),
      S.documentTypeListItem('story').title('ストーリー記事'),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() && !['artisan', 'product', 'story'].includes(item.getId()!),
      ),
    ])

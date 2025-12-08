import type { StructureResolver } from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('ものがたりEC')
    .items([
      S.documentTypeListItem('artisan').title('職人プロフィール'),
      S.documentTypeListItem('product').title('商品'),
      S.documentTypeListItem('story').title('ストーリー記事'),
      S.divider(),

      // 問い合わせ管理
      S.listItem()
        .title('お問い合わせ管理')
        .child(
          S.list()
            .title('ステータス別')
            .items([
              S.listItem()
                .title('新規 (未読)')
                .child(
                  S.documentList()
                    .title('新規お問い合わせ')
                    .filter('_type == "inquiry" && status == "new"')
                ),
              S.listItem()
                .title('確認済み')
                .child(
                  S.documentList()
                    .title('確認済み')
                    .filter('_type == "inquiry" && status == "read"')
                ),
              S.listItem()
                .title('返信済み')
                .child(
                  S.documentList()
                    .title('返信済み')
                    .filter('_type == "inquiry" && status == "replied"')
                ),
              S.divider(),
              S.documentTypeListItem('inquiry').title('すべてのお問い合わせ'),
            ])
        ),

      // コメント管理
      S.listItem()
        .title('コメント・レビュー管理')
        .child(
          S.list()
            .title('ステータス別')
            .items([
              S.listItem()
                .title('承認待ち')
                .child(
                  S.documentList()
                    .title('承認待ちコメント')
                    .filter('_type == "comment" && approved == false')
                ),
              S.listItem()
                .title('承認済み')
                .child(
                  S.documentList()
                    .title('承認済みコメント')
                    .filter('_type == "comment" && approved == true')
                ),
              S.divider(),
              S.documentTypeListItem('comment').title('すべてのコメント'),
            ])
        ),

      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() && !['artisan', 'product', 'story', 'inquiry', 'comment'].includes(item.getId()!),
      ),
    ])

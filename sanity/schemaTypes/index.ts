import { type SchemaTypeDefinition } from 'sanity'

// 既存のスキーマをインポート
import artisan from '../schemas/artisan'
import product from '../schemas/product'
import story from '../schemas/story'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [artisan, product, story],
}

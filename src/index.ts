import { loadPageChunk } from './notionMethods';
import extractId from './extractId';

// getRecordValues({
//   table: 'COLLECTION_VIEW',
//   id: 'a98d6f17-d09e-4742-afac-a6019bd3f2cf',
// })
// .then(console.log)
// .catch(console.error);

loadPageChunk(extractId('bbee5f03640f412eb0ae57d96a5252ab'))
  .then(console.log)
  .catch(console.error);

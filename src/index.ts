import { getRecordValues } from './notionMethods';

getRecordValues({
  table: 'collection_view',
  id: 'a98d6f17-d09e-4742-afac-a6019bd3f2cf',
})
  .then(console.log)
  .catch(console.error);

// loadPageChunk('8bedbd7e-c21d-4020-8f95-d42b42106431')
//   .then(console.log)
//   .catch(console.error);

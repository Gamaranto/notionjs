import post from './post';
import {
  LoadPageChunkInput,
  LoadPageChunkResponse,
  GetRecordValuesResponse,
  RecordQuery,
} from 'types';

const defaultData = {
  limit: 10000,
  cursor: { stack: [] },
  chunkNumber: 0,
  verticalColumns: false,
};

async function getRecordValues(...records: RecordQuery[]) {
  let data = await post<GetRecordValuesResponse>('getRecordValues')({
    requests: records,
  });
  return data.body;
}

async function loadPageChunk(pageId: string, options = defaultData) {
  let requestData: LoadPageChunkInput = { pageId, ...options };
  let data = await post<LoadPageChunkResponse>('loadPageChunk')(requestData);
  return data;
}

export { loadPageChunk, getRecordValues };

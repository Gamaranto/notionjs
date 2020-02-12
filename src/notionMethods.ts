import post from './post';

async function getRecordValues(...records: any[]) {
  let data = await post('getRecordValues')({ requests: records });
  return data;
}

async function loadPageChunk(pageId: string) {
  let data = await post('loadPageChunk')({ pageId });
  return data;
}

export { loadPageChunk, getRecordValues };

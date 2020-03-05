import extractID from './extractId';
import { getRecordValues, loadPageChunk } from './notionMethods';
import {
  LoadPageChunkResponse,
  GetRecordValuesResponse,
  NotionTableType,
} from 'types';

export {
  getBlock,
  getCollection,
  getCollectionView,
  getSpace,
  getUser,
  getPage,
};

// ****************************

async function getRecord({
  table,
  id,
}: {
  table: NotionTableType;
  id: string;
}) {
  if (table == 'block') {
    return loadPageChunk(id);
  } else {
    return getRecordValues({ table, id });
  }
}

async function getBlock(urlOrID: string) {
  let blockID = extractID(urlOrID);
  let block = await getRecord({ table: NotionTableType.block, id: blockID });
  return block ? block : new Error(`Block with ID:${blockID} not found.`);
}

async function getCollection(urlOrID: string) {
  let collectionID = extractID(urlOrID);
  let collection = await getRecord({
    table: NotionTableType.collection,
    id: collectionID,
  });
  return collection
    ? collection
    : new Error(`Collection with ID:${collectionID} not found.`);
}

async function getSpace(urlOrID: string) {
  let spaceID = extractID(urlOrID);
  let space = await getRecord({ table: NotionTableType.space, id: spaceID });
  return space ? space : new Error(`Space with ID: ${spaceID} not found.`);
}

async function getUser(urlOrID: string) {
  let userID = extractID(urlOrID);
  let user = await getRecord({
    table: NotionTableType.notion_user,
    id: userID,
  });
  return user ? user : new Error(`User with ID: ${userID} not found.`);
}

async function getCollectionView(viewUrlOrId: string) {
  if (viewUrlOrId.startsWith('http')) {
    let viewRegex = new RegExp(/([a-f0-9]{32})\?v=([a-f0-9]{32})/);
    let match = viewRegex.exec(viewUrlOrId);
    if (!match) {
      return new Error(`The view url ${viewUrlOrId} is invalid.`);
    }
    let [_, collectionID, viewID] = match;
    return await getRecord({
      table: NotionTableType.collection_view,
      id: extractID(viewID),
    });
  }
}

async function getPage(idOrUrl: string) {
  let pageId = extractID(idOrUrl);
  let rootBlock = await getPageRootBlock(pageId);

  return rootBlock;
}

// ************************

async function getPageRootBlock(pageId: string) {
  return await getBlock(pageId);
}

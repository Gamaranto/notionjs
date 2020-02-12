import extractID from './extractId';
import { getBlock } from './getRecords';

async function downloadPage(idOrUrl) {
  let pageId = extractID(idOrUrl);
  let rootBlock = await getPageRootBlock(pageId);

  return rootBlock;
}

export default downloadPage;
// ************************

async function getPageRootBlock(pageId) {
  return await getBlock(pageId);
}

// import {
//   getBlock,
//   getCollection,
//   getSpace,
//   getCollectionView,
//   getUser,
//   getPage,
// } from './getRecords';

export class Notion {
  private tokenv2 = process.env.TOKEN_V2;

  readToken() {
    console.log(this.tokenv2);
  }
}

let notion = new Notion();
notion.readToken();

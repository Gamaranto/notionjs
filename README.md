# Notion.js

Notion.js is an unofficial client for the Notion API, entirely written in TypeScript, it empowers you

## Getting Started

Run `yarn add notionjs` or `npm install notionjs`

```javascript
import Notion from 'notionjs';

let notion = new Notion(process.env.TOKEN_V2);

// Downloads the page
notion.getPage('https://notion.so/some-id');

// Get a specific block, user, collection, collectionView or Space
notion.getUser('someUserId');
notion.getCollection('someSpaceId');
notion.getCollectionView('someViewID');
notion.getBlock('someBlockId');
notion.getSpace('someSpaceId');
```

You can find the Notion Id in the URL of the page and the notion client will take care of parsing that into a valid ID.

## Contributing

All contributions are welcome! This is a WIP, so any help is a much appreciated :)

## Work in progress

Those are features that I plan to add in the near future.

- Caching
- 2-Way Transactions
- HTML and MD parsers
- Custom Routes

import got, { Options } from 'got';

const defaultData = {
  limit: 10000,
  cursor: { stack: [] },
  chunkNumber: 0,
  verticalColumns: false,
};

const defaultOptions: Options = {
  prefixUrl: process.env.API_BASE_URL || 'https://www.notion.so/api/v3/',
  headers: {
    cookie: `token_v2=${process.env.TOKEN_V2}`,
  },
  method: 'POST',
  responseType: 'json',
  resolveBodyOnly: true,
  json: defaultData,
};

let notionClient = got.extend(defaultOptions);

function post<T = string>(url: string) {
  return async function(options: object = {}) {
    let userPayload = { json: options };
    let userNotionClient = notionClient.extend(userPayload);
    return userNotionClient<T>(url);
  };
}

export default post;

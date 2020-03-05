export class Notion {
  private tokenv2 = process.env.TOKEN_V2;

  constructor() {}

  readToken() {
    console.log(this.tokenv2);
  }
}

let notion = new Notion();
notion.readToken();

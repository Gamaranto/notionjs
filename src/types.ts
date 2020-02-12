enum NotionTableType {
  COLLECTION_VIEW = 'collection_view',
}

interface NotionRecordQuery {
  ID: string;
  table: NotionTableType;
}

interface NotionRecord {
  Role: string;
  Value: JSON;
  ID: string;
  Table: string;

  Block: NotionBlock;
  Space: NotionSpace;
  User: NotionUser;
  Collection: NotionCollection;
  CollectionView: NotionCollectionView;
  Comment: NotionComment;
  Discussion: NotionDiscussion;
}

interface NotionCollection {
  ID: string;
  Version: number;
  ParentID: string;
  ParentTable: string;
  Alive: boolean;
  CopiedFrom: string;
}

interface NotionCollectionView {
  ID: string;
  Version: number;
  Type: string;
  Format: FormatTable;
  Name: string;
  ParentID: string;
  ParentTable: string;
  Query: NotionQuery;
  Alive: boolean;
  PageSort: string[];
}

interface NotionBlock {
  ID: string;
  Alive: boolean;
  ContentIDs: string[];
  CopiedFrom: string;
  // Needed for BlockCollectionView
  CollectionID: string;
  CreatedTime: number;
  DiscussionIDs: string[];
  // those ids seem to map to storage in s3
  // https://s3-us-west-2.amazonaws.com/secure.notion-static.com/${id}/${name}
  FileIDs: string[];
  // ID of the user that created the block
  CreatedBy: string;
  //ID of the user that last edited the block
  LastEditedBy: string;
  LastEditedTime: number;
  Permissions?: Permission[];
  // type of the block
  BlockType: string;
  // Blocks are versioned
  Version: number;
  // for BlockCollectionView
  ViewIDs: string[];

  // Parent Block
  // Parent block ID
  ParentID: string;
  ParentTable: string;
  Parent: NotionBlock;

  // for a block page
  Title: string;

  // for a blockToDo
  IsChecked: boolean;

  // for BlockBookmark
  BookmarkDescription: string;
  BookmarkLink: string;

  // for BlockBookmark it's the url of the page
  // for BlockGist it's the url for the gist
  // fot BlockImage it's url of the image, but use ImageURL instead
  // because Source is sometimes not accessible
  // for BlockFile it's url of the file
  // for BlockEmbed it's url of the embed
  BlockSource: string;

  // for BlockFile
  BlockFileSize: string;

  // for BlockImage it's a URL built from source
  ImageURL: string;

  // for BlockCode
  EmbeddedCode: string;
  CodeLanguage: string;

  // For BlockCollectionView there can be multiple views that correspond to ViewIDs
  TableViews: NotionTableView[];
  NotionPage: NotionPage;
}

interface NotionPage {
  ID: string;
  BlockRecords: NotionRecord[];
  UserRecords: NotionRecord[];
  CollectionRecords: NotionRecord[];
  CollectionViewRecords: NotionRecord[];
  DiscussionRecords: NotionRecord[];
  CommentRecords: NotionRecord[];

  TableViews: TableView[];
}

interface NotionSpace {
  ID: string;
  Version: number;
  Name: string;
  Domain: string;
  Permissions: NotionSpacePermissions[];
  PermissionGroups: NotionSpacePermissionGroups[];
  Icon: string;
  EmailDomains: string[];
  BetaEnabled: boolean;
  Pages: string[];
  DisablePublicAccess: boolean;
  DisableGuest: boolean;
  DisableMoveToSpace: boolean;
  DisableExport: boolean;
  CreatedBy: string;
  CreatedTime: number;
  LastEditedBy: string;
  LastEditedTime: number;
}

interface NotionSpacePermissions {
  Role: string;
  Type: string;
  UserID: string;
}

interface NotionSpacePermissionGroups {
  ID: string;
  Name: string;
  UserIDs: string[];
}

interface NotionUser {
  Email: string;
  FamilyName: string;
  GivenName: string;
  ID: string;
  Locale: string;
  MobileOnboardingCompleted: boolean;
  OnboardingCompleted: boolean;
  ClipperOnboardingCompleted: boolean;
  ProfilePhoto: string;
  TimeZone: string;
  Version: number;
}

interface NotionComment {
  ID: string;
  Version: number;
  Alive: boolean;
  ParentID: string;
  ParentTable: string;
  CreatedBy: string;
  CreatedTime: number;
  Text: string;
  LastEditedTime: number;
}

interface NotionDiscussion {
  ID: string;
  Version: number;
  ParentID: string;
  ParentTable: string;
  Resolved: boolean;
  Comments: string[];
}

// ***** All Block Types here

// BlockAudio is audio embed (e.g. an mp3 file)
type BlockAudio = 'audio';
// BlockBookmark is a bookmark block
type BlockBookmark = 'bookmark';
// BlockBreadcrumb is breadcrumb block
type BlockBreadcrumb = 'breadcrumb';
// BlockBulletedList is a bulleted list block
type BlockBulletedList = 'bulleted_list';
// BlockCode is a code block
type BlockCode = 'code';
// BlockCodepen is embedded codepen block
type BlockCodepen = 'codepen';
// BlockCallout is a callout
type BlockCallout = 'callout';
// BlockColumn is a child of TypeColumnList
type BlockColumn = 'column';
// BlockColumnList is for multi-column. Number of columns is
// number of content blocks of type TypeColumn
type BlockColumnList = 'column_list';
// BlockCollectionView is a collection view block for inline collections
type BlockCollectionView = 'collection_view';
// BlockCollectionViewPage is a page that is a collection
type BlockCollectionViewPage = 'collection_view_page';
// BlockComment is a comment block
type BlockComment = 'comment';
// BlockDivider is a divider block
type BlockDivider = 'divider';
// BlockDrive is embedded Google Drive file
type BlockDrive = 'drive';
// BlockEmbed is a generic oembed link
type BlockEmbed = 'embed';
// BlockEquation is TeX equation block
type BlockEquation = 'equation';
// BlockFactory represents a factory block
type BlockFactory = 'factory';
// BlockFigma represents figma embed
type BlockFigma = 'figma';
// BlockFile is an embedded file
type BlockFile = 'file';
// BlockGist is embedded gist block
type BlockGist = 'gist';
// BlockHeader is a header block
type BlockHeader = 'header';
// BlockImage is an image block
type BlockImage = 'image';
// BlockMaps is embedded Google Map block
type BlockMaps = 'maps';
// BlockNumberedList is a numbered list block
type BlockNumberedList = 'numbered_list';
// BlockPDF is an embedded pdf file
type BlockPDF = 'pdf';
// BlockPage is a notion Page
type BlockPage = 'page';
// BlockQuote is a quote block
type BlockQuote = 'quote';
// BlockSubHeader is a header block
type BlockSubHeader = 'sub_header';
// BlockSubSubHeader
type BlockSubSubHeader = 'sub_sub_header';
// BlockTableOfContents is table of contents
type BlockTableOfContents = 'table_of_contents';
// BlockText is a text block
type BlockText = 'text';
// BlockTodo is a todo block
type BlockTodo = 'to_do';
// BlockToggle is a toggle block
type BlockToggle = 'toggle';
// BlockTweet is embedded gist block
type BlockTweet = 'tweet';
// BlockVideo is youtube video embed
type BlockVideo = 'video';

// Table Types

interface FormatTable {
  PageSort: string;
  TableWrap: boolean;
  TableProperties: TableProperty[];
}

interface TableProperty {
  Width: number;
  Visible: boolean;
  Property: string;
}

interface TableView {
  Page: NotionPage;
  CollectionView: NotionCollectionView;
  Collection: NotionCollection;
  Columns: ColumnInfo[];
  Rows: TableRow[];
}

interface TableRow {
  TableView: TableView;
  Page: NotionBlock;
  Columns: TextSpan[][];
}

// ColumnInfo describes a schema for a given column

interface ColumnInfo {
  TableView: TableView;
  Index: number;
  Schema: ColumnSchema;
  Property: TableProperty;
}

interface ColumnSchema {
  Name: string;
  ColumnType: string;
  NumberFormat: string;
  // For Type ColumnTypeRollup
  Aggregation: string;
  TargetProperty: string;
  RelationProperty: string;
  TargetPropertyType: string;

  // for Type ColumnTypeRelation
  CollectionID: string;
  Property: string;
  // for Type ColumnTypeFormula
  Formula: ColumnFormula;
  ColumnOptions: CollectionColumnOption[];
}

interface CollectionColumnOption {
  Color: string;
  ID: string;
  Value: string;
}

interface FormulaArgument {
  Name: string;
  ResultType: string;
  FormulaType: string;
  Value: string;
  ValueType: string;
}

interface ColumnFormula {
  Arguments: FormulaArgument[];
  Name: string;
  Operator: string;
  ResultType: string;
  Type: string;
}

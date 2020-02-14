enum NotionTableType {
  COLLECTION_VIEW = 'collection_view',
  COLLECTION = 'collection',
  LIST = 'list',
}

export interface RecordQuery {
  id: string;
  table: NotionTableType;
}

export interface GetRecordValuesInput {
  Requests: RecordQuery[];
}

export interface GetRecordValuesResponse {
  Results: NotionRecord[];
}

type stack = {
  id: string;
  Index: number;
  Table: string;
};

type cursor = { stack: stack[] };

export interface LoadPageChunkInput {
  pageId: string;
  chunkNumber: number;
  limit: number;
  cursor: cursor;
  verticalColumns: boolean;
}

export interface LoadPageChunkResponse {
  recordMap: RecordMap;
  cursor: cursor;
}

export interface NotionRecord {
  Role: string;
  Value: JSON;
  id: string;
  Table: string;

  Block: NotionBlock;
  Space: NotionSpace;
  User: NotionUser;
  Collection: NotionCollection;
  CollectionView: NotionCollectionView;
  Comment: NotionComment;
  Discussion: NotionDiscussion;
}

export interface RecordMap {
  block: Map<string, NotionBlock>;
  space: Map<string, NotionSpace>;
  notion_user: Map<string, NotionUser>;
  collection: Map<string, NotionCollection>;
  collectionView: Map<string, NotionCollectionView>;
  comment: Map<string, NotionDiscussion>;
  discussion: Map<string, NotionDiscussion>;
}

export interface NotionCollection {
  id: string;
  Version: number;
  ParentId: string;
  ParentTable: string;
  Alive: boolean;
  CopiedFrom: string;
}

export interface NotionCollectionView {
  id: string;
  Version: number;
  Type: string;
  Format: FormatTable;
  Name: string;
  ParentId: string;
  ParentTable: string;
  Query: NotionQuery;
  Alive: boolean;
  PageSort: string[];
}

export interface NotionBlock {
  id: string;
  Alive: boolean;
  ContentIds: string[];
  CopiedFrom: string;
  // Needed for BlockCollectionView
  CollectionId: string;
  CreatedTime: number;
  DiscussionIds: string[];
  // those ids seem to map to storage in s3
  // https://s3-us-west-2.amazonaws.com/secure.notion-static.com/${id}/${name}
  FileIds: string[];
  // id of the user that created the block
  CreatedBy: string;
  //id of the user that last edited the block
  LastEditedBy: string;
  LastEditedTime: number;
  //Permissions?: Permission[];
  // type of the block
  BlockType: string;
  // Blocks are versioned
  Version: number;
  // for BlockCollectionView
  ViewIds: string[];

  // Parent Block
  // Parent block id
  ParentId: string;
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

  // For BlockCollectionView there can be multiple views that correspond to ViewIds
  // TableViews: NotionTableView[];
  NotionPage: NotionPage;
}

export interface NotionPage {
  id: string;
  BlockRecords: NotionRecord[];
  UserRecords: NotionRecord[];
  CollectionRecords: NotionRecord[];
  CollectionViewRecords: NotionRecord[];
  DiscussionRecords: NotionRecord[];
  CommentRecords: NotionRecord[];

  TableViews: TableView[];
}

export interface NotionSpace {
  id: string;
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

export interface NotionSpacePermissions {
  Role: string;
  Type: string;
  UserId: string;
}

export interface NotionSpacePermissionGroups {
  id: string;
  Name: string;
  UserIds: string[];
}

export interface NotionUser {
  Email: string;
  FamilyName: string;
  GivenName: string;
  id: string;
  Locale: string;
  MobileOnboardingCompleted: boolean;
  OnboardingCompleted: boolean;
  ClipperOnboardingCompleted: boolean;
  ProfilePhoto: string;
  TimeZone: string;
  Version: number;
}

export interface NotionComment {
  id: string;
  Version: number;
  Alive: boolean;
  ParentId: string;
  ParentTable: string;
  CreatedBy: string;
  CreatedTime: number;
  Text: string;
  LastEditedTime: number;
}

export interface NotionDiscussion {
  id: string;
  Version: number;
  ParentId: string;
  ParentTable: string;
  Resolved: boolean;
  Comments: string[];
}

enum OperationCommands {
  CommandSet = 'set',
  CommandUpdate = 'update',
  CommandListAfter = 'listAfter',
  CommandListRemove = 'listRemove',
}

export interface NotionOperation {
  id: string;
  Table: string;
  Path: string[];
  Command: OperationCommands;
  Args: object;
}

export interface submitTransactionInput {
  Operations: NotionOperation[];
}

//API endpoint getUploadFileUrl
export interface getUploadFileUrlInput {
  Bucket: string;
  ContentType: string;
  Name: string;
}

export interface getUploadFileUrlResponse {
  URL: string | URL;
  SignedGetURL: string | URL;
  SignedPutURL: string | URL;
  FileId: string;
}

// API endpoint loadUserContent

export interface loadUserContentResponse {
  id: string;
  Table: string;
  Role: string;
  Value: JSON;

  Block: NotionBlock;
  Space: NotionSpace;
  User: NotionUser;
}

export interface SubscriptionDataSpaceUsers {
  UserId: string;
  Role: string;
  IsGuest: boolean;
  GuestPageIds: object[];
}

export interface SubscriptionDataSpaceCredits {
  id: string;
  Version: number;
  UserId: string;
  Amount: number;
  Activated: boolean;
  CreatedTimestamp: string;
  Type: string;
}

export interface SubscriptionDataAddress {
  Name: string;
  BusinessName: string;
  AddressLine1: string;
  AddressLine2: string;
  ZipCode: string;
  City: string;
  State: string;
  Country: string;
}

export interface SubscriptionData {
  Type: string;
  SpaceUsers: SubscriptionDataSpaceUsers[];
  Credits: SubscriptionDataSpaceCredits[];
  TotalCredit: number;
  AvailableCredit: number;
  CreditEnabled: boolean;
  CustomerId: string;
  CustomerName: string;
  VatId: string;
  IsDelinquent: boolean;
  ProductId: string;
  BillingEmail: string;
  Plan: string;
  PlanAmount: number;
  AccountBalance: number;
  MonthlyPlanAmount: number;
  YearlyPlanAmount: number;
  Quantity: number;
  Billing: string;
  Address: SubscriptionDataAddress;
  Last4: string;
  Brand: string;
  Interval: string;
  Created: number;
  PeriodEnd: number;
  NextInvoiceTime: number;
  IsPaid: boolean;
  Members: object[];
}

export interface getSignedFileUrlsInput {
  Urls: string[] | URL[];
}

export interface getSignedFileUrlsResponse {
  SignedUrls: string[];
}

export interface DownloadFileResponse {
  URL: string | URL;
  CacheFileName: string;
  Data: ArrayBuffer[];
}

// ***** All Block Types here

// Table Types

export interface FormatTable {
  PageSort: string;
  TableWrap: boolean;
  TableProperties: TableProperty[];
}

export interface TableProperty {
  Width: number;
  Visible: boolean;
  Property: string;
}

export interface TableView {
  Page: NotionPage;
  CollectionView: NotionCollectionView;
  Collection: NotionCollection;
  Columns: ColumnInfo[];
  Rows: TableRow[];
}

export interface TableRow {
  TableView: TableView;
  Page: NotionBlock;
  Columns: TextSpan[][];
}

export interface TextSpan {
  Text: string;
  Attrs: TextAttr[];
}

type TextAttr = string[];

// ColumnInfo describes a schema for a given column

export interface ColumnInfo {
  TableView: TableView;
  Index: number;
  Schema: ColumnSchema;
  Property: TableProperty;
}

export interface ColumnSchema {
  Name: string;
  ColumnType: string;
  NumberFormat: string;
  // For Type ColumnTypeRollup
  Aggregation: string;
  TargetProperty: string;
  RelationProperty: string;
  TargetPropertyType: string;

  // for Type ColumnTypeRelation
  CollectionId: string;
  Property: string;
  // for Type ColumnTypeFormula
  Formula: ColumnFormula;
  ColumnOptions: CollectionColumnOption[];
}

export interface CollectionColumnOption {
  Color: string;
  id: string;
  Value: string;
}

export interface FormulaArgument {
  Name: string;
  ResultType: string;
  FormulaType: string;
  Value: string;
  ValueType: string;
}

export interface ColumnFormula {
  Arguments: FormulaArgument[];
  Name: string;
  Operator: string;
  ResultType: string;
  Type: string;
}

export interface NotionQuery {
  Aggregate: AggregateQuery[];
  GroupBy: object;
  CalendarBy: object;
  FilterOperator: string;
  Filter: QueryFilter[];
  Sort: QuerySort[];
}

export interface AggregateQuery {
  AggregationType: string;
  id: string;
  Property: string;
  Type: string;
  ViewType: string;
}

export interface QuerySort {
  id: string;
  Direction: string;
  Property: string;
  Type: string;
}

export interface QueryFilter {
  id: string;
  Comparator: string;
  Property: string;
  Type: string;
  Value: string;
}

export interface Loader {
  type: string;
  Limit: number; //default is 70
  UserTimeZone: string;
  UserLocale: string;
  LoadContentCover: boolean;
}

// /api/v3/queryCollection request
export interface queryCollectionInput {
  CollectionId: string;
  CollectionViewId: string;
  Query: NotionQuery;
  Loader: Loader;
}

export interface AggregationResult {
  id: string;
  Value: number;
}

export interface queryCollectionResult {
  type: string;
  BlockIds: string[];
  AggregationResults: AggregationResult[];
  Total: number;
}

export interface queryCollectionResponse {
  RecordMap: RecordMap;
  Result: queryCollectionResult;
}

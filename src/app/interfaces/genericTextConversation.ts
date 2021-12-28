import { Data } from '@angular/router';

export interface genericTextConversation {
  channel: string;
  content: SchemaRef;
  createdAt: Date;
  creator: string;
  scene: Scene;
  suggestedOptions: SuggestedOptions;
  topic: string;
  updatedAt: Date;
  _id: string;
}

export interface SchemaRef {
  data: DataBai;
  schemaRef: string;
}

export interface DataBai {
  title: string;
}

export interface Scene {}

export interface SuggestedOptions {}

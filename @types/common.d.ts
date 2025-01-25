declare module "common" {
  export interface Topic {
    topic: string;
    id: number;
    count?: number;
    trending?: boolean;
    enabled?: boolean;
  }

  export interface Moment {
    id: number;
    author?: User;
    createdAt: string;
    body: {
      text: string;
      photos?: string[];
    };
    topics: Topic[];
    reactions: {
      [reaction: string]: number;
    };
    expiresAt?: string;
    myEmoji?: string;
  }

  export interface User {
    id: number;
    username: string;
    createdAt: string;
    photo?: string;
  }

  export interface PhotoFile {
    file: File;
    id: string;
  }
}

declare module "common" {
  export type ApiResponse<T = undefined> = {
    message: string;
    code: string;
    result?: T;
  };

  export interface Topic {
    name: string;
    id: number;
    usage?: number;
    trending?: boolean;
    enabled?: boolean;
  }

  export interface GeneratedTopic {
    name: string;
    id: number;
    usage?: number;
    trending?: boolean;
    score: number;
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

  export interface MomentConfig {
    expiresIn?: number;
    anonymous: boolean;
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

  export interface Token {
    token: string;
    expiresAt: string;
  }

  export interface Session {
    user: User;
    accessToken: Token;
    refreshToken: Token;
  }
}

declare module "common" {
  export interface Topic {
    topic: string;
    id: number;
    enabled: boolean;
    count?: number;
    trending?: boolean;
  }
}

export type RouteHandler = (params: Record<string, string>) => string;
export type MountFn = (params: Record<string, string>) => Promise<void>;

export type Route = {
  pattern: RegExp;
  keys: string[];
  handler: RouteHandler;
  mount?: MountFn;
};

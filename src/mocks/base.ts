import { AxiosRequestConfig } from "axios";
import AxiosMockAdapter from "axios-mock-adapter";

type MockConstructor = new () => object;
type MethodInfo = {
  type: MethodName;
  propertyKey: string;
  url?: string;
};
type MethodName = "get" | "post" | "put" | "delete" | "patch";

export interface RequestConfig extends AxiosRequestConfig {
  pathParams: Record<string, string>;
}

type CallbackResponseSpecFunc = (
  config: RequestConfig
) => unknown[] | Promise<unknown[]>;

const classRequests: Map<MockConstructor, string> = new Map();
const methodMap: Map<MockConstructor, MethodInfo[]> = new Map();

export function RequestMapping(url: string) {
  return (constructor: MockConstructor) => {
    classRequests.set(constructor, url);
  };
}

export function GetMapping(url?: string) {
  url = url ?? "";
  return (target: MockConstructor, propertyKey: string) => {
    if (!methodMap.has(target)) {
      methodMap.set(target, []);
    }
    methodMap.get(target)?.push({
      type: "get",
      propertyKey,
      url,
    });
  };
}

export function PostMapping(url?: string) {
  url = url ?? "";
  return (target: MockConstructor, propertyKey: string) => {
    if (!methodMap.has(target)) {
      methodMap.set(target, []);
    }
    methodMap.get(target)?.push({
      type: "post",
      propertyKey,
      url,
    });
  };
}

export function PutMapping(url?: string) {
  url = url ?? "";
  return (target: MockConstructor, propertyKey: string) => {
    if (!methodMap.has(target)) {
      methodMap.set(target, []);
    }
    methodMap.get(target)?.push({
      type: "put",
      propertyKey,
      url,
    });
  };
}

export function DeleteMapping(url?: string) {
  url = url ?? "";
  return (target: MockConstructor, propertyKey: string) => {
    if (!methodMap.has(target)) {
      methodMap.set(target, []);
    }
    methodMap.get(target)?.push({
      type: "delete",
      propertyKey,
      url,
    });
  };
}

export function PatchMapping(url?: string) {
  url = url ?? "";
  return (target: MockConstructor, propertyKey: string) => {
    if (!methodMap.has(target)) {
      methodMap.set(target, []);
    }
    methodMap.get(target)?.push({
      type: "patch",
      propertyKey,
      url,
    });
  };
}

function getHandler(mock: AxiosMockAdapter, type: string, url: RegExp) {
  switch (type) {
    case "get":
      return mock.onGet(url);
    case "post":
      return mock.onPost(url);
    case "put":
      return mock.onPut(url);
    case "delete":
      return mock.onDelete(url);
    case "patch":
      return mock.onPatch(url);
    default:
      throw new Error("Invalid method type");
  }
}

export function registerMock(mock: AxiosMockAdapter) {
  for (const [target, methods] of methodMap) {
    for (const { type, propertyKey, url } of methods) {
      const finalUrl = ((classRequests.get(target) ?? "") + url) as string;
      const pathParamNames: string[] = [];
      const finalRegExp = new RegExp(
        `^${finalUrl
          .split("/")
          .map((part) => {
            if (part.startsWith(":")) {
              pathParamNames.push(part.slice(1));
              return "([^/]+)";
            }
            return part.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
          })
          .join("/")}/?$`
      );

      console.log("register handler for", finalUrl, finalRegExp, type);

      getHandler(mock, type, finalRegExp).reply(
        (config: AxiosRequestConfig) => {
          const newConfig = config as RequestConfig;
          const matches = config.url?.match(finalRegExp) ?? undefined;
          const pathParams: Record<string, string> = {};
          pathParamNames.forEach((name, index) => {
            pathParams[name] = matches?.[index + 1] ?? "";
          });
          newConfig.pathParams = pathParams;
          try {
            const result = (
              (target as never)[propertyKey] as CallbackResponseSpecFunc
            )(newConfig);
            if (result instanceof Promise) {
              return result.then((r) => {
                console.log(`[${type.toUpperCase()}] ${finalUrl} =>`, ...r);
                return r;
              });
            }
            console.log(`[${type.toUpperCase()}] ${finalUrl} =>`, ...result);
            return result;
          } catch (e) {
            console.error(`[${type.toUpperCase()}] ${finalUrl} =>`, e);
            return [500];
          }
        }
      );
    }
  }
}

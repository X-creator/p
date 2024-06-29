import { TokenPropSchema } from "../../widgets/auth-form/model/schema.ts";
import { AUTH_HEADER, CHECK_AUTH_HEADER, ORIGIN, TOKENIFY_HEADER } from "../../shared/api/api.ts";

declare let self: ServiceWorkerGlobalScope;

type ResponseData = { data: string } | { error: string };

(() => {
  const API_URL = `${ORIGIN}/`;
  let token: string | undefined;

  self.addEventListener("install", (event) => {
    event.waitUntil(self.skipWaiting());
    console.log(new Date().toISOString(), "Service worker installed!");
  });

  self.addEventListener("activate", (event) => {
    event.waitUntil(self.clients.claim());
    console.log(new Date().toISOString(), "Service worker ready!");
  });

  self.addEventListener("fetch", (event) => {
    if (event.request.url.startsWith(API_URL)) {
      const { headers } = event.request;

      if (headers.has(AUTH_HEADER))
        return event.respondWith(authHandler(event.request, AUTH_HEADER));

      if (headers.has(TOKENIFY_HEADER) && token)
        return event.respondWith(tokenifyRequests(event.request, TOKENIFY_HEADER, token));

      if (headers.has(CHECK_AUTH_HEADER)) return event.respondWith(checkAuth(token));
    }
  });

  const authHandler = async (request: Request, header: typeof AUTH_HEADER) => {
    token = undefined;

    const { success, data: tokenProp } = TokenPropSchema.safeParse(
      JSON.parse(request.headers.get(header) || "null"),
    );
    if (!success) {
      const responseData: ResponseData = { error: `Invalid ${header} header` };
      return new Response(JSON.stringify(responseData), { headers: request.headers, status: 400 });
    }

    const headers = new Headers(request.headers);
    headers.delete(header);
    const response = await fetch(new Request(request, { headers }));
    if (!response.ok) return response;

    const data: unknown = await response.json();
    token = tokenProp.reduce(
      (data, prop) => (data as Record<string, string>)?.[prop], //
      data,
    ) as string | undefined;

    const responseData: ResponseData = token ? { data: "ok" } : { error: `Invalid token` };
    const responseInit = token
      ? {
          headers: response.headers,
          status: response.status,
          statusText: response.statusText,
        }
      : {
          headers: request.headers,
          status: 400,
        };
    return new Response(JSON.stringify(responseData), responseInit);
  };

  const tokenifyRequests = async (
    request: Request,
    header: typeof TOKENIFY_HEADER,
    token: string,
  ) => {
    const headers = new Headers(request.headers);
    headers.set(header, token);
    return fetch(new Request(request, { headers }));
  };

  const checkAuth = (token: string | undefined) =>
    new Response(null, { status: token ? 200 : 401 });
})();

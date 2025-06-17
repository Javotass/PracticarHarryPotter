// routes/(platform)/_middleware.ts
import { FreshContext } from "$fresh/server.ts";

interface State {
  username: string;
}

export async function handler(req: Request, ctx: FreshContext<State>) {
  const cookie = req.headers.get("cookie") || "";

  const usernameCookie = cookie
    .split(";")
    .find((c) => c.trim().startsWith("username="));

  if (!usernameCookie) {
    const headers = new Headers();
    headers.set("location", "/login");
    return new Response(null, { status: 303, headers });
  }

  const username = usernameCookie.split("=")[1];
  ctx.state.username = decodeURIComponent(username);

  return await ctx.next();
}

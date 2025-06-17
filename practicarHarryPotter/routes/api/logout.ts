// routes/api/logout.ts
export function handler(_req: Request) {
    const headers = new Headers();
    headers.append("Set-Cookie", "username=; Path=/; HttpOnly; Max-Age=0");
    headers.append("Set-Cookie", "favorites=; Path=/; HttpOnly; Max-Age=0");
  
    return new Response(JSON.stringify({ message: "Logout correcto" }), {
      status: 200,
      headers,
    });
  }
  
// routes/api/login.ts
export async function handler(req: Request) {
    if (req.method !== "POST") return new Response("Method Not Allowed", { status: 405 });
  
    const { username, password } = await req.json();
  
    if (password === "123" && username) {
      const headers = new Headers();
      headers.append("Set-Cookie", `username=${username}; Path=/; HttpOnly; Max-Age=604800`);
      return new Response(JSON.stringify({ message: "Login exitoso" }), {
        status: 200,
        headers,
      });
    }
  
    return new Response(JSON.stringify({ message: "Login fallido" }), { status: 401 });
  }
  
// routes/index.tsx
export function handler() {
  const headers = new Headers();
  headers.set("location", "/login");
  return new Response(null, {
    status: 303,
    headers,
  });
}

import path from "node:path";

const root = path.resolve(import.meta.dirname, "../storybook-static");
const port = Number(process.env.PORT ?? 6006);

const server = Bun.serve({
  port,
  async fetch(req) {
    const { pathname } = new URL(req.url);
    const filePath = path.join(root, pathname === "/" ? "index.html" : pathname);
    const file = Bun.file(filePath);
    if (await file.exists()) {
      return new Response(file);
    }
    return new Response(Bun.file(path.join(root, "index.html")), {
      headers: { "content-type": "text/html" },
    });
  },
});

console.log(`Storybook preview: http://localhost:${server.port}`);

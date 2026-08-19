import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

interface RegistryFile {
  path: string;
  target?: string;
  type?: string;
}

interface RegistryItem {
  description?: string;
  files?: RegistryFile[];
  name: string;
  title?: string;
  type: string;
  [key: string]: unknown;
}

interface RegistryManifest {
  homepage?: string;
  include?: string[];
  items?: RegistryItem[];
  name?: string;
  [key: string]: unknown;
}

interface RegistrySourceItem {
  baseDir: string;
  item: RegistryItem;
}

const rootDir = path.resolve(import.meta.dir, "..");
const sourceRegistryPath = path.join(rootDir, "registry.json");
const outputDir = path.join(rootDir, "public/r");
const screenshotNames = [
  "analytics-dark",
  "analytics-light",
  "canvas-dark",
  "canvas-light",
  "customer-dark",
  "customer-light",
  "workflow-dark",
  "workflow-light",
] as const;

async function readManifest(manifestPath: string): Promise<RegistryManifest> {
  return JSON.parse(await readFile(manifestPath, "utf8")) as RegistryManifest;
}

async function collectItems(
  manifestPath: string,
  visited = new Set<string>()
): Promise<RegistrySourceItem[]> {
  const normalizedPath = path.resolve(manifestPath);
  if (visited.has(normalizedPath)) {
    return [];
  }
  visited.add(normalizedPath);

  const manifest = await readManifest(normalizedPath);
  const baseDir = path.dirname(normalizedPath);
  const items = (manifest.items ?? []).map((item) => ({ baseDir, item }));
  const includedItems = await Promise.all(
    (manifest.include ?? []).map((include) =>
      collectItems(path.resolve(path.dirname(normalizedPath), include), visited)
    )
  );
  return items.concat(...includedItems);
}

async function writeScreenshotSvg(name: (typeof screenshotNames)[number]) {
  const pngPath = path.join(rootDir, "public/screenshots", `${name}.png`);
  const svgPath = path.join(
    rootDir,
    "registry/marketing/screenshot-assets",
    `${name}.svg`
  );
  const png = await readFile(pngPath);
  const svg = [
    '<svg xmlns="http://www.w3.org/2000/svg" width="1672" height="941" viewBox="0 0 1672 941">',
    `<image width="1672" height="941" href="data:image/png;base64,${png.toString("base64")}" />`,
    "</svg>",
  ].join("");
  await writeFile(svgPath, svg, "utf8");
}

async function buildRegistry() {
  await mkdir(outputDir, { recursive: true });
  await Promise.all(screenshotNames.map(writeScreenshotSvg));

  const items = await collectItems(sourceRegistryPath);
  const outputItems = await Promise.all(
    items.map(async ({ baseDir, item }) => {
      const files = await Promise.all(
        (item.files ?? []).map(async (file) => {
          const relativeSourcePath = path.join(
            path.relative(rootDir, baseDir),
            file.path
          );
          const absoluteSourcePath = path.resolve(rootDir, relativeSourcePath);
          const bytes = await readFile(absoluteSourcePath);
          let content: string;
          try {
            content = new TextDecoder("utf-8", { fatal: true }).decode(bytes);
          } catch (error) {
            throw new Error(
              `Cannot export binary registry file ${relativeSourcePath}. Convert it to a text-safe asset first.`,
              { cause: error }
            );
          }
          return {
            ...file,
            content,
            path: relativeSourcePath.split(path.sep).join("/"),
          };
        })
      );

      const outputItem = {
        $schema: "https://ui.shadcn.com/schema/registry-item.json",
        ...item,
        files,
      };
      await writeFile(
        path.join(outputDir, `${item.name}.json`),
        `${JSON.stringify(outputItem, null, 2)}\n`,
        "utf8"
      );
      return outputItem;
    })
  );

  await writeFile(
    path.join(outputDir, "registry.json"),
    `${JSON.stringify(
      {
        $schema: "https://ui.shadcn.com/schema/registry.json",
        homepage: "https://github.com/tyrailleverett/nice-ui",
        items: outputItems.map(({ files: _files, ...item }) => item),
        name: "nice-ui",
      },
      null,
      2
    )}\n`,
    "utf8"
  );
}

await buildRegistry();

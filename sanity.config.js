"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schema } from "./sanity/schemaTypes";

export default defineConfig({
  projectId: "1q7t6zoq",
  dataset: "production",
  basePath: "/studio",
  plugins: [structureTool()],
  schema,
});

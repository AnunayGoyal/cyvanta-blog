// sanity/sanity.config.ts
import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { visionTool } from "@sanity/vision";
import schemaTypes from "all:part:@sanity/base/schema-type";

import post from "./schemas/post";
import category from "./schemas/category";
import author from "./schemas/author";

export default defineConfig({
    name: "cyvanta-studio",
    title: "Cyvanta Studio",

    // Use env vars (recommended). You can keep the fallback if needed.
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "<your-project-id>",
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",

    plugins: [deskTool(), visionTool()],

    schema: {
        // Combine any built-in schema types with our custom types
        types: schemaTypes.concat([post, category, author]),
    },

    studio: {
        // optional: set a default theme / base path etc.
    },
});

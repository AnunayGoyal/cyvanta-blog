"use client";

import Giscus from "@giscus/react";
import { useTheme } from "next-themes";

export default function Comments() {
  const { theme } = useTheme();

  return (
    <div className="mt-10 w-full">
      <Giscus
        id="comments"
        repo="AnunayGoyal/cyvanta-blog"
        repoId="[ENTER REPO ID HERE]"
        category="[ENTER CATEGORY NAME HERE]"
        categoryId="[ENTER CATEGORY ID HERE]"
        mapping="pathname"
        term="Welcome to @giscus/react component!"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme={theme === "dark" ? "dark" : "light"}
        lang="en"
        loading="lazy"
      />
    </div>
  );
}

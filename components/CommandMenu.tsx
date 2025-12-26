"use client";

import * as React from "react";
import { Command } from "cmdk";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  CodeIcon,
  HomeIcon,
  LinkIcon,
  MoonIcon,
  SunIcon,
  EditIcon,
} from "@sanity/icons";

export function CommandMenu() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] bg-black/60 backdrop-blur-sm">
      <Command className="w-full max-w-lg overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 shadow-2xl animate-in fade-in zoom-in-95 duration-100">
        <div className="flex items-center border-b border-zinc-800 px-3">
          <CodeIcon className="mr-2 h-5 w-5 text-zinc-500" />
          <Command.Input
            placeholder="Type a command or search..."
            className="flex h-12 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-zinc-500 text-zinc-100"
          />
        </div>
        <Command.List className="max-h-[300px] overflow-y-auto overflow-x-hidden p-2">
          <Command.Empty className="py-6 text-center text-sm text-zinc-500">
            No results found.
          </Command.Empty>

          <Command.Group heading="Navigation" className="mb-2 px-2 text-xs font-medium text-zinc-500">
            <Command.Item
              onSelect={() => runCommand(() => router.push("/"))}
              className="group flex cursor-default select-none items-center rounded-md px-2 py-2 text-sm outline-none hover:bg-zinc-900 aria-selected:bg-zinc-900 text-zinc-300 aria-selected:text-white"
            >
              <HomeIcon className="mr-2 h-4 w-4" />
              <span>Home</span>
            </Command.Item>
            <Command.Item
              onSelect={() => runCommand(() => router.push("/studio"))}
              className="group flex cursor-default select-none items-center rounded-md px-2 py-2 text-sm outline-none hover:bg-zinc-900 aria-selected:bg-zinc-900 text-zinc-300 aria-selected:text-white"
            >
              <EditIcon className="mr-2 h-4 w-4" />
              <span>Studio</span>
            </Command.Item>
          </Command.Group>

          <Command.Group heading="External" className="mb-2 px-2 text-xs font-medium text-zinc-500">
            <Command.Item
              onSelect={() => runCommand(() => window.open("https://github.com/StartDusty/cyvanta-blog", "_blank"))}
              className="group flex cursor-default select-none items-center rounded-md px-2 py-2 text-sm outline-none hover:bg-zinc-900 aria-selected:bg-zinc-900 text-zinc-300 aria-selected:text-white"
            >
              <LinkIcon className="mr-2 h-4 w-4" />
              <span>GitHub</span>
            </Command.Item>
          </Command.Group>
        </Command.List>
      </Command>
    </div>
  );
}

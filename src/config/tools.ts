import type { Tool } from "$lib/types/common";
import { Chrome, Zap } from "@lucide/svelte";
import type { Component } from "svelte";
import { appPages } from "./pages";

export const categoryIcons: Record<string, Component> = {
    "Chrome Extensions": Chrome,
    // "Developer Tools": Code2,
    Productivity: Zap,
} as const

export const tools: Tool[] = [
    {
        name: appPages.hacker_news_reader.name,
        description: "HN Reader is a fully local extension to read Hacker News(Y Combinator) feed, with features such as bookmarking, keywords blocker",
        category: "Chrome Extensions",
        url: appPages.hacker_news_reader.path(),
        year: "2025",
        featured: true,
    },
    {
        name: appPages.blockaid_website_blocker.name,
        description: "Block distracting websites and boost your productivity. Add domains and block current pages all in one easy-to-use Chrome extension.",
        category: "Chrome Extensions",
        url: appPages.blockaid_website_blocker.path(),
        year: "2025",
    },
    {
        name: appPages.readvault_bookmarks.name,
        description: "ReadVault is an extension that acts as your digital reading vault. Save and organize pages in one place for easy access anytime.",
        category: "Chrome Extensions",
        url: appPages.readvault_bookmarks.path(),
        year: "2025",
    },
    // {
    //     name: "Design System CLI",
    //     description: "Command-line tool for generating design tokens and components with TypeScript support.",
    //     category: "Developer Tools",
    //     url: "#",
    //     year: "2024",
    //     featured: true,
    // },
    // {
    //     name: "API Tester",
    //     description: "Lightweight REST API testing tool with request history.",
    //     category: "Developer Tools",
    //     url: "#",
    //     year: "2023",
    // },
    // {
    //     name: "Git Commit Helper",
    //     description: "Generate conventional commit messages with AI assistance.",
    //     category: "Developer Tools",
    //     url: "#",
    //     year: "2024",
    // },
    {
        name: appPages.video_converter.name,
        description: "",
        category: "Productivity",
        url: appPages.video_converter.path(),
        year: "2025",
    },
    {
        name: appPages.image_resizer.name,
        description: "",
        category: "Productivity",
        url: appPages.image_resizer.path(),
        year: "2025",
    },
] as const
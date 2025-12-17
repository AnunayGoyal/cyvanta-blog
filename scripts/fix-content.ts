
const { getCliClient } = require("sanity/cli");
const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

// Map slugs to file paths (Hardcoded based on find_by_name results for precision)
const FILES = [
    { slug: "cobalt-strike-beacon", path: "content/threat-intelligence/cobalt-strike-beacon.mdx" },
    { slug: "ai-driven-ddos", path: "content/threat-intelligence/ai-driven-ddos.mdx" },
    { slug: "test-slug-1", path: "content/cloud-security/test-slug-1.mdx" },
    { slug: "wonderland-ctf", path: "content/offensive-operations/wonderland-ctf.mdx" },
    { slug: "legacy-sqli", path: "content/offensive-operations/legacy-sqli.mdx" },
    { slug: "splunk-analysis", path: "content/defense-mechanisms/splunk-analysis.mdx" },
    { slug: "data-breach-trust", path: "content/defense-mechanisms/data-breach-trust.mdx" },
];

function transformContentToBlocks(content: string) {
    const blocks = [];

    // Regex to match <CodeWindow ...> ... </CodeWindow>
    const codeWindowRegex = /<CodeWindow\s+title="([^"]*)"\s+lang="([^"]*)">\s*{`([\s\S]*?)`}\s*<\/CodeWindow>/g;

    let lastIndex = 0;
    let match;

    while ((match = codeWindowRegex.exec(content)) !== null) {
        // Text before the code block
        const textBefore = content.substring(lastIndex, match.index).trim();
        if (textBefore) {
            textBefore.split(/\n\n+/).forEach(para => {
                if (para.trim()) {
                    if (para.trim().startsWith('### ')) {
                        blocks.push({
                            _type: 'block',
                            style: 'h3',
                            children: [{ _type: 'span', text: para.trim().replace('### ', '') }]
                        })
                    } else if (para.trim().startsWith('## ')) {
                        blocks.push({
                            _type: 'block',
                            style: 'h2',
                            children: [{ _type: 'span', text: para.trim().replace('## ', '') }]
                        })
                    } else {
                        blocks.push({
                            _type: 'block',
                            style: 'normal',
                            children: [{ _type: 'span', text: para.trim() }]
                        });
                    }
                }
            });
        }

        // The Code Block
        const [fullMatch, title, lang, code] = match;
        blocks.push({
            _type: 'code',
            language: lang,
            filename: title,
            code: code,
        });

        lastIndex = match.index + fullMatch.length;
    }

    // Remaining text
    const textAfter = content.substring(lastIndex).trim();
    if (textAfter) {
        textAfter.split(/\n\n+/).forEach(para => {
            if (para.trim()) {
                if (para.trim().startsWith('### ')) {
                    blocks.push({
                        _type: 'block',
                        style: 'h3',
                        children: [{ _type: 'span', text: para.trim().replace('### ', '') }]
                    })
                } else {
                    blocks.push({
                        _type: 'block',
                        style: 'normal',
                        children: [{ _type: 'span', text: para.trim() }]
                    });
                }
            }
        });
    }

    // Add keys (required for strict Sanity validation)
    return blocks.map((block, i) => ({ ...block, _key: `b-${i}` }));
}

async function run() {
    console.log("Starting content repair...");

    // Use getCliClient queries local user session
    // We expect the user to be logged in via `sanity login`
    const client = getCliClient({ apiVersion: '2025-12-08' });

    for (const file of FILES) {
        console.log(`Processing ${file.slug}...`);

        try {
            const raw = fs.readFileSync(path.resolve(process.cwd(), file.path), 'utf-8');
            const { content } = matter(raw);

            // Transform content
            const bodyBlocks = transformContentToBlocks(content);

            // Find document ID by slug
            const query = `*[_type == "post" && slug.current == "${file.slug}"][0]._id`;
            const docId = await client.fetch(query);

            if (docId) {
                console.log(`Updating document ${docId} with ${bodyBlocks.length} blocks...`);
                await client.patch(docId)
                    .set({ content: bodyBlocks })
                    .commit();
                console.log(`✅ Updated ${file.slug}`);
            } else {
                console.warn(`⚠️ Document not found for slug: ${file.slug}`);
            }

        } catch (e) {
            console.error(`❌ Failed to process ${file.slug}:`, e);
        }
    }
}

run();

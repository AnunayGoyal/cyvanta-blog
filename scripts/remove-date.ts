
const { getCliClient } = require("sanity/cli");

async function run() {
    console.log("Starting data migration: Removing 'date' field...");

    // client configuration is inferred from sanity.cli.ts / sanity.config.ts if available
    // or checks for logged in user
    const client = getCliClient({ apiVersion: '2025-12-09' });

    // Fetch all posts that have the 'date' field defined
    const query = `*[_type == "post" && defined(date)]._id`;
    const ids = await client.fetch(query);

    if (ids.length === 0) {
        console.log("No posts found with the 'date' field.");
        return;
    }

    console.log(`Found ${ids.length} posts with a deprecated 'date' field.`);

    // Create a transaction to unset the field
    let transaction = client.transaction();

    ids.forEach(id => {
        transaction = transaction.patch(id, p => p.unset(['date']));
    });

    try {
        await transaction.commit();
        console.log("✅ Successfully removed 'date' field from all posts.");
    } catch (err) {
        console.error("❌ Migration failed:", err.message);
    }
}

run();

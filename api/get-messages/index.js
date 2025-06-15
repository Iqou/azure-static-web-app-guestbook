const { CosmosClient } = require("@azure/cosmos");

const connectionString = process.env.COSMOS_DB_CONNECTION_STRING;
const client = new CosmosClient(connectionString);
const database = client.database("GuestBookDB");
const container = database.container("Entries");

module.exports = async function (context, req) {
    try {
        const { resources: items } = await container.items
            .query("SELECT * FROM c ORDER BY c.createdAt DESC")
            .fetchAll();

        context.res = {
            status: 200,
            body: items
        };
    } catch (err) {
        context.res = {
            status: 500,
            body: `Gagal mengambil pesan: ${err.message}`
        };
    }
};

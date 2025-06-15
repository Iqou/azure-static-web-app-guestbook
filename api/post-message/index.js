const { CosmosClient } = require("@azure/cosmos");

const connectionString = process.env.COSMOS_DB_CONNECTION_STRING;
const client = new CosmosClient(connectionString);
const database = client.database("GuestBookDB");
const container = database.container("Entries");

module.exports = async function (context, req) {
    const { name, message } = req.body;

    if (!name || !message) {
        context.res = {
            status: 400,
            body: "Nama dan pesan tidak boleh kosong."
        };
        return;
    }

    const newItem = {
        id: new Date().toISOString() + Math.random().toString().slice(2, 6),
        name,
        message,
        createdAt: new Date().toISOString()
    };

    try {
        const { resource: created } = await container.items.create(newItem);
        context.res = {
            status: 201,
            body: created
        };
    } catch (err) {
        context.res = {
            status: 500,
            body: `Gagal menyimpan pesan: ${err.message}`
        };
    }
};

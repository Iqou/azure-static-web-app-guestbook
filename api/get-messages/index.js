module.exports = async function (context, req) {
    const connectionString = process.env.COSMOS_DB_CONNECTION_STRING;
    // Berkat input binding, data dari Cosmos DB sudah tersedia di 'context.bindings.messages'.
    const messages = context.bindings.messages;

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: messages || [] // Kirim array kosong jika tidak ada pesan
    };
};

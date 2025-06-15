module.exports = async function (context, req) {
    const connectionString = process.env.COSMOS_DB_CONNECTION_STRING;
    const { name, message } = req.body;

    if (!name || !message) {
        context.res = {
            status: 400,
            body: "Nama dan pesan tidak boleh kosong."
        };
        return;
    }

    // Buat dokumen baru untuk disimpan.
    const newDocument = {
        name: name,
        message: message
    };

    // Berikan dokumen baru ke output binding. Azure akan menanganinya.
    context.bindings.outputDocument = JSON.stringify(newDocument);

    context.res = {
        status: 201, // Created
        body: newDocument
    };

    console.log("Received request body:", req.body);

};

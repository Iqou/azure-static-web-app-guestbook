const { app } = require('@azure/functions');

app.http('post-message', {
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        const { name, message } = await request.json();

        if (!name || !message) {
            return {
                status: 400,
                body: "Nama dan pesan tidak boleh kosong."
            };
        }

        const newDocument = {
            name,
            message
        };

        context.log("Received new message:", newDocument);

        // Save to Cosmos (assuming client is already set up, e.g. using env)
        // context.bindings.outputDocument = JSON.stringify(newDocument); ← skip binding approach

        return {
            status: 201,
            jsonBody: newDocument
        };
    }
});

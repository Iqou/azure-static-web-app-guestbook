document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('guestbook-form');
    const messagesList = document.getElementById('messages-list');

    // Fungsi untuk mengambil dan menampilkan pesan
    const getMessages = async () => {
        try {
            const response = await fetch('/api/get-messages');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const messages = await response.json();

            messagesList.innerHTML = ''; // Kosongkan daftar sebelum diisi
            if (messages.length === 0) {
                messagesList.innerHTML = '<p>Belum ada pesan. Jadilah yang pertama!</p>';
                return;
            }

            messages.forEach(msg => {
                const item = document.createElement('div');
                item.className = 'message-item';
                item.innerHTML = `<strong>${escapeHTML(msg.name)} berkata:</strong><p>${escapeHTML(msg.message)}</p>`;
                messagesList.appendChild(item);
            });
        } catch (error) {
            messagesList.innerHTML = '<p>Gagal memuat pesan. Coba lagi nanti.</p>';
            console.error('Error fetching messages:', error);
        }
    };

    // Fungsi untuk mengirim pesan baru
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const message = document.getElementById('message').value;

        try {
            const response = await fetch('/api/post-message', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, message }),
            });

            if (!response.ok) {
                throw new Error('Gagal mengirim pesan');
            }

            form.reset(); // Kosongkan form
            await getMessages(); // Muat ulang daftar pesan
        } catch (error) {
            alert('Gagal mengirim pesan. Silakan coba lagi.');
            console.error('Error posting message:', error);
        }
    });

    // Helper function to prevent XSS attacks
    function escapeHTML(str) {
        return str.replace(/[&<>"']/g, function (match) {
            return {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#39;'
            }[match];
        });
    }

    // Panggil fungsi untuk memuat pesan saat halaman dibuka
    getMessages();
});

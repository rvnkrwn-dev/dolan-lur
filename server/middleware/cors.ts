export default defineEventHandler((event) => {
    const response = event.node.res;

    // Menambahkan header CORS
    response.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000, https://dolan-lur.vercel.app');  // Mengizinkan semua asal
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');  // Metode HTTP yang diizinkan
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');  // Header yang diizinkan

    // Jika permintaan preflight (OPTIONS), kirimkan respons 200
    if (event.req.method === 'OPTIONS') {
        response.statusCode = 200;
        response.end();
    }
});

// Fungsi ini digunakan untuk melakukan permintaan HTTP dengan menambahkan header Authorization menggunakan token otentikasi pengguna
export default (url: string, options: any = {}) => {
    // Mendapatkan token otentikasi dari fungsi useAuth
    const { useAuthToken } = useAuth()

    // Melakukan permintaan HTTP dengan $fetch dan menambahkan header Authorization jika token tersedia
    return $fetch(url, {
        ...options, // Menyertakan opsi lain yang diberikan
        headers: {
            ...options.headers, // Menyertakan header yang sudah ada sebelumnya
            // Menambahkan header Authorization dengan token otentikasi pengguna
            Authorization: `Bearer ${useAuthToken()?.value}`
        }
    })
}

import { jwtDecode } from "jwt-decode";

export default () => {
    // Hooks untuk state autentikasi
    const useAuthToken = () => useCookie('auth_token');
    const useAuthUser = () => useCookie('auth_user');
    const useAuthLoading = () => useState('auth_loading', () => false); // Default loading ke false
    const isLoggedIn = () => useCookie('isLoggedIn');

    // Set token
    const setToken = (newToken: string | null) => {
        const authToken = useAuthToken();
        authToken.value = newToken;
    };

    // Set data user
    const setUser = (newUser: object | null) => {
        const authUser = useAuthUser();
        authUser.value = newUser ? JSON.stringify(newUser) : null;
    };

    // Set status loading autentikasi
    const setAuthLoading = (value: boolean) => {
        const authLoading = useAuthLoading();
        authLoading.value = value;
    };

    // Fungsi login
    const login = async ({ username, password }: { username: string; password: string }) => {
        try {
            const data: any = await useFetchApi('/api/auth/login', {
                method: 'POST',
                body: { username, password }
            });

            // Set token dan user setelah login
            setToken(data.access_token);
            setUser(data.user);

            // Tandai user sudah login
            isLoggedIn().value = String(true);
            return true;
        } catch (error) {
            console.error("Terjadi kesalahan saat login:", error);
            throw new Error("Login gagal. Silakan coba lagi.");
        }
    };

    // Fungsi refresh token
    const refreshToken = async () => {
        try {
            const data: any = await useFetchApi('/api/auth/refresh');
            setToken(data.access_token);
            isLoggedIn().value = String(true); // Pastikan isLoggedIn diupdate
            return true;
        } catch (error) {
            // Reset token dan user jika refresh gagal
            setToken(null);
            setUser(null);
            isLoggedIn().value = String(false); // Tandai sebagai tidak login
            return false;
        }
    };

    // Fungsi untuk mengambil data user
    const getUser = async () => {
        try {
            const data: any = await useFetchApi('/api/auth/user');
            setUser(data.user);
            return true;
        } catch (error) {
            console.error("Terjadi kesalahan saat mengambil data user:", error);
            throw new Error("Gagal mengambil data user.");
        }
    };

    // Refresh token secara otomatis sebelum kadaluarsa
    const reRefreshAccessToken = () => {
        const authToken = useAuthToken();
        if (!authToken.value) return;

        try {
            const jwt: any = jwtDecode(authToken.value);
            const newRefreshTime = jwt.exp * 1000 - Date.now() - 60000; // Waktu refresh 1 menit sebelum kadaluarsa

            setTimeout(async () => {
                const refreshSuccess = await refreshToken(); // Cek keberhasilan refresh
                if (refreshSuccess) {
                    reRefreshAccessToken(); // Lakukan refresh berulang
                }
            }, newRefreshTime);
        } catch (error) {
            console.error("Terjadi kesalahan saat mendekode JWT:", error);
            logout(); // Logout jika ada masalah dengan JWT
        }
    };

    // Inisialisasi autentikasi saat aplikasi dimulai
    const initAuth = async () => {
        setAuthLoading(true);
        try {
            if (!isLoggedIn().value) {
                return false;
            }
            await refreshToken();
            await getUser();
            reRefreshAccessToken(); // Mulai refresh token otomatis
            return true;
        } catch (error) {
            console.error('Terjadi kesalahan saat inisialisasi autentikasi:', error);
            throw new Error("Gagal menginisialisasi autentikasi.");
        } finally {
            setAuthLoading(false); // Matikan loading setelah proses selesai
        }
    };

    // Fungsi logout dan menghapus data autentikasi
    const logout = async () => {
        try {
            await useFetchApi('/api/auth/logout', { method: 'POST' });

            // Hapus token dan user
            setToken(null);
            setUser(null);
            isLoggedIn().value = String(false); // Tandai sebagai tidak login
            return true;
        } catch (error) {
            console.error("Terjadi kesalahan saat logout:", error);
            isLoggedIn().value = String(false); // Pastikan cookie dihapus meskipun logout gagal
            throw new Error("Logout gagal.");
        }
    };

    return {
        login,
        useAuthUser,
        useAuthToken,
        initAuth,
        useAuthLoading,
        logout,
        isLoggedIn
    };
};

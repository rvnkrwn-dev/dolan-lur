import { jwtDecode } from "jwt-decode";

export default () => {
    // Hooks untuk state autentikasi
    const useAuthToken = () => useState('auth_token');
    const useAuthUser = () => useState('auth_user');
    const useAuthLoading = () => useState('auth_loading', () => true);
    const isLoggedIn = () => useCookie('isLoggedIn')

    // Set token baru
    const setToken = (newToken) => {
        const authToken = useAuthToken();
        authToken.value = newToken;
    };

    // Set user baru
    const setUser = (newUser) => {
        const authUser = useAuthUser();
        authUser.value = newUser;
    };

    // Set status loading autentikasi
    const setIsAuthLoading = (value) => {
        const authLoading = useAuthLoading();
        authLoading.value = value;
    };

    // Fungsi login dengan username dan password
    const login = ({ username, password }) => {
        return new Promise(async (resolve, reject) => {
            try {
                const data = await useFetchApi('/api/auth/login', {
                    method: 'POST',
                    body: { username, password }
                });

                // Set token dan user yang diterima setelah login
                setToken(data.access_token);
                setUser(data.user);

                // Tandai user sudah login
                isLoggedIn().value = true
                resolve(true);
            } catch (error) {
                reject(error);
            }
        });
    };

    // Fungsi untuk refresh token
    const refreshToken = () => {
        return new Promise(async (resolve, reject) => {
            try {
                const data = await useFetchApi('/api/auth/refresh');
                setToken(data.access_token);
                resolve(true);
            } catch (error) {
                await logout();
                resolve(false); // Pastikan tetap resolve meskipun refresh gagal
            }
        });
    };

    // Fungsi untuk mengambil data user
    const getUser = () => {
        return new Promise(async (resolve, reject) => {
            try {
                const data = await useFetchApi('/api/auth/user');
                setUser(data.user);
                resolve(true);
            } catch (error) {
                reject(error);
            }
        });
    };

    // Refresh token secara otomatis sebelum kadaluarsa
    const reRefreshAccessToken = () => {
        const authToken = useAuthToken();
        if (!authToken.value) return;

        const jwt = jwtDecode(authToken.value);
        const newRefreshTime = jwt.exp * 1000 - Date.now() - 60000; // Waktu refresh sebelum 1 menit token kadaluarsa

        setTimeout(async () => {
            const refreshSuccess = await refreshToken(); // Periksa hasil refresh token
            if (refreshSuccess) {
                reRefreshAccessToken(); // Recurse to keep refreshing
            }
        }, newRefreshTime);
    };

    // Inisialisasi autentikasi saat aplikasi dimulai
    const initAuth = () => {
        return new Promise(async (resolve, reject) => {
            setIsAuthLoading(true);
            try {
                if (!isLoggedIn().value) return
                await refreshToken()
                await getUser()

                reRefreshAccessToken()

                resolve(true)
            } catch (error) {
                reject(error)
            } finally {
                setIsAuthLoading(false)
            }
        });
    };

    // Fungsi logout dan menghapus data autentikasi
    const logout = () => {
        return new Promise(async (resolve, reject) => {
            try {
                await useFetchApi('/api/auth/logout', { method: 'POST' });

                // Clear token dan user
                setToken(null);
                setUser(null);
                isLoggedIn().value = null;
                resolve();
            } catch (error) {
                isLoggedIn().value = null; // Clear cookie even if logout fails
                reject(error);
            }
        });
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

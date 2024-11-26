export default defineNuxtRouteMiddleware(async (to, from) => {
    const isAuthenticated = useCookie('isLoggedIn').value;
    const isAuthPage = to.path === '/login' || to.path === '/register';
    const isAdminPage = to.path.startsWith('/admin');
    const user = useAuth().useAuthUser().value
    const isAdmin = user?.role === 'Admin';

    if (isAuthenticated && isAuthPage) {
        return navigateTo('/admin');
    }

    if (!isAuthenticated && isAdminPage) {
        return navigateTo('/login');
    }

    if (isAdminPage && !isAdmin) {
        return navigateTo('/');
    }
});

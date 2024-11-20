export default defineNuxtRouteMiddleware((to, from) => {
    const isAuthenticated = useCookie('isLoggedIn').value;
    const isAuthPage = to.path === '/login' || to.path === '/register';
    const isAdminPage = to.path.startsWith('/admin');

    if (isAuthenticated && isAuthPage) {
        return navigateTo('/admin');
    }

    if (!isAuthenticated && isAdminPage) {
        return navigateTo('/login');
    }
});

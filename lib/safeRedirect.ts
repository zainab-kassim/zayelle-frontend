// Only ever redirect to a same-app relative path — the `redirect` query
// param comes straight from the URL, so a crafted link (?redirect=//evil.com
// or ?redirect=https://evil.com) must never be able to send a user off-site.
export const getSafeRedirect = (path: string | null): string => {
    if (!path || !path.startsWith('/') || path.startsWith('//')) return '/';
    return path;
};

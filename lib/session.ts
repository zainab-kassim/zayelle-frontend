// Shared by every sign-in path (email/password login, signup, Google) — each
// one stores the same two fields after a successful auth response.
export const persistUserSession = (fullName: string, email: string): void => {
    localStorage.setItem('fullName', fullName);
    localStorage.setItem('email', email);
};

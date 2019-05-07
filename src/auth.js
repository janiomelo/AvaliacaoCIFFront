const AUTH_TOKEY_KEY = "@Avaliacao-CIF"

export default {
    token: localStorage.getItem(AUTH_TOKEY_KEY),
    possuiToken: () => (localStorage.getItem(AUTH_TOKEY_KEY) !== null),
    authenticate: (token) => (localStorage.setItem(AUTH_TOKEY_KEY, token)),
    signout: () => localStorage.removeItem(AUTH_TOKEY_KEY)
}
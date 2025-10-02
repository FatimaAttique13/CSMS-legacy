import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

/*
  Simple client-side auth (placeholder):
  - Persists user in localStorage { email, role }
  - Roles: 'customer' | 'admin'
  - In real integration replace with API + secure tokens
*/
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // { email, role }
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const raw = localStorage.getItem('csms_user');
    if (raw) {
      try { setUser(JSON.parse(raw)); } catch { /* ignore */ }
    }
    setLoading(false);
  }, []);

  const login = useCallback(async ({ email, password }) => {
    // Demo credential policy:
    //   Admin only if EXACT email + password match below.
  const ADMIN_EMAIL = 'admin@csms.com';
    const ADMIN_PASS = 'admin';

    if (!email || !password) {
      throw new Error('Missing credentials');
    }

    let role = 'customer';
    if (email === ADMIN_EMAIL && password === ADMIN_PASS) {
      role = 'admin';
    }

    // (In real app: verify via API, hash password, tokens, etc.)
    const u = { email, role };
    localStorage.setItem('csms_user', JSON.stringify(u));
    setUser(u);
    return u;
  }, []);

  const signup = useCallback(async ({ email, password }) => {
    // Same as login in this mock
    return login({ email, password });
  }, [login]);

  const logout = useCallback(() => {
    localStorage.removeItem('csms_user');
    setUser(null);
  }, []);

  const value = { user, role: user?.role, loading, login, signup, logout, isAuthenticated: !!user };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

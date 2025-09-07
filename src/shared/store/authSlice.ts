import { create } from 'zustand';

type AuthState = {
  isAuthenticated: boolean;
  token: string | null;
  loading: boolean;
};

type AuthActions = {
  setToken: (token: string | null) => void;
  clearToken: () => void;
  setLoading: (loading: boolean) => void;
};

export const useAuthStore = create<AuthState & AuthActions>((set) => ({
  isAuthenticated: false,
  token: null,
  loading: true,
  setLoading: (loading) => set({ loading }),
  setToken: (token) =>
    set(() => {
      if (token) {
        return { token, isAuthenticated: true };
      }
      return { token: null, isAuthenticated: false };
    }),
  clearToken: () => set({ token: null, isAuthenticated: false }),
}));

export default useAuthStore;

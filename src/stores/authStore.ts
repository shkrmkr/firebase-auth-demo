import firebase from 'firebase/app';
import create, { State } from 'zustand';
import { auth } from '../firebase';
import { useAlertStore } from './alertStore';

export interface AuthState extends State {
  user: firebase.User | null;
  isAuthLoading: boolean;
  authError: firebase.auth.AuthError | null;
  setUser: (user: firebase.User | null) => void;
  signup: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updatePassword: (
    originalPassword: string,
    newPassword: string,
  ) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthLoading: false,
  authError: null,

  setUser: (user) => set({ user }),

  login: async (email, password) => {
    let success = true;

    try {
      set({ isAuthLoading: true, authError: null });
      await auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      success = false;
      set({ authError: error });
    } finally {
      set({ isAuthLoading: false });
    }

    return success ? Promise.resolve() : Promise.reject();
  },

  signup: async (email, password) => {
    let success = true;

    try {
      set({ isAuthLoading: true, authError: null });
      await auth.createUserWithEmailAndPassword(email, password);
    } catch (error) {
      success = false;
      set({ authError: error });
    } finally {
      set({ isAuthLoading: false });
    }

    return success ? Promise.resolve() : Promise.reject();
  },

  logout: async () => {
    try {
      set({ authError: null });
      await auth.signOut();
    } catch (error) {
      set({
        authError: { code: '', message: '로그아웃 실패. 다시 시도해주세요.' },
      });
      return Promise.reject();
    }
  },

  resetPassword: async (email) => {
    try {
      set({ authError: null, isAuthLoading: true });
      await auth.sendPasswordResetEmail(email);
      // eslint-disable-next-line no-empty
    } catch {
    } finally {
      set({ isAuthLoading: false });
    }
  },

  updatePassword: async (originalPassword, newPassword) => {
    let success = true;

    try {
      set({ authError: null, isAuthLoading: true });
      const user = get().user;

      if (!user?.email) {
        set({
          authError: {
            code: ' ',
            message:
              '비밀번호를 변경할 수 없습니다. 다시 로그인한 후 시도해보세요.',
          },
        });
        return Promise.reject();
      }

      const credential = firebase.auth.EmailAuthProvider.credential(
        user.email,
        originalPassword,
      );
      await get().user?.reauthenticateWithCredential(credential);
      await get().user?.updatePassword(newPassword);
    } catch (error) {
      success = false;
      set({ authError: error });
    } finally {
      set({ isAuthLoading: false });
    }

    return success ? Promise.resolve() : Promise.reject();
  },
}));

useAuthStore.subscribe(
  (authError: AuthState['authError']) => {
    if (authError) {
      let message = authError.message;

      switch (authError.code) {
        case 'auth/user-not-found':
        case 'auth/wrong-password':
          message = '잘못된 이메일 또는 비밀번호입니다.';
          break;
        case 'auth/email-already-in-use':
          message = '이미 가입된 이메일 주소입니다.';
          break;
        case 'auth/invalid-email':
          message = '올바르지 않은 이메일 형식입니다.';
          break;
      }

      useAlertStore.getState().addAlert({ type: 'error', message });
    }
  },
  (state) => state.authError,
);

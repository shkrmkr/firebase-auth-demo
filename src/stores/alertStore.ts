import { nanoid } from 'nanoid';
import create, { State } from 'zustand';
import { devtools } from 'zustand/middleware';

interface Alert {
  id: string;
  type: 'success' | 'warning' | 'error';
  message: string;
}

interface AlertState extends State {
  alerts: Alert[];
  addAlert: (alert: Omit<Alert, 'id'>) => void;
  removeAlert: (id: Alert['id']) => void;
}

export const useAlertStore = create<AlertState>(
  devtools((set) => ({
    alerts: [],
    addAlert: (alert) =>
      set((state) => ({
        alerts: [{ ...alert, id: nanoid() }, ...state.alerts],
      })),
    removeAlert: (id) =>
      set((state) => ({
        alerts: state.alerts.filter((alert) => alert.id !== id),
      })),
  })),
);

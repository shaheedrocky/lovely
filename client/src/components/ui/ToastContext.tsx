/**
 * Toast Context and Provider
 * Exposes a clean `useToast()` hook across the entire application.
 */

import React, { createContext, useCallback, useContext, useState } from 'react';
import CustomToast, { ToastConfig, ToastType } from './CustomToast';

export interface ShowToastOptions {
  message: string;
  title?: string;
  type?: ToastType;
  duration?: number;
}

export interface ToastContextValue {
  showToast: (options: ShowToastOptions) => void;
  dismissToast: () => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentToast, setCurrentToast] = useState<ToastConfig | null>(null);

  const showToast = useCallback((options: ShowToastOptions) => {
    const id = Date.now().toString();
    setCurrentToast({
      id,
      title: options.title,
      message: options.message,
      type: options.type || 'info',
      duration: options.duration || 3500,
    });
  }, []);

  const dismissToast = useCallback(() => {
    setCurrentToast(null);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast, dismissToast }}>
      {children}
      <CustomToast toast={currentToast} onDismiss={dismissToast} />
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextValue => {
  const context = useContext(ToastContext);
  if (!context) {
    return {
      showToast: (opts: ShowToastOptions) => {
        console.log(`[Toast Fallback] ${opts.title ? `${opts.title}: ` : ''}${opts.message}`);
      },
      dismissToast: () => {},
    };
  }
  return context;
};

export default ToastProvider;

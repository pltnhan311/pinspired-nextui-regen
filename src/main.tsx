import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { NextUIProvider } from '@nextui-org/react';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '~/store/store.ts';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { MantineProvider } from '@mantine/core';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <MantineProvider>
            <NextUIProvider>
              <NextThemesProvider attribute='class' defaultTheme='light'>
                <App />
                <Toaster position='bottom-right' />
              </NextThemesProvider>
            </NextUIProvider>
          </MantineProvider>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

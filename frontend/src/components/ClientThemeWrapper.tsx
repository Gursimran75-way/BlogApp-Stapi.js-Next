'use client';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/styles/theme';
import Navbar from '@/components/layout/Navbar';
import { ReactNode, Suspense } from 'react';

export default function ClientThemeWrapper({ children }: { children: ReactNode }) {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Suspense fallback={<div>Loading...</div>}>
                <Navbar />
            </Suspense>
            {children}
        </ThemeProvider>
    );
}
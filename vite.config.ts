import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],
    resolve: {
        alias: [
            {
                find: '@components',
                replacement: path.resolve(import.meta.dirname, './src/components'),
            },
            {
                find: '@store',
                replacement: path.resolve(import.meta.dirname, './src/store'),
            },
            {
                find: '@app-types',
                replacement: path.resolve(import.meta.dirname, './src/types'),
            },
        ],
    },
})

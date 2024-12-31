import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd())
    const base =
        env.VITE_BASE_PATH && env.VITE_BASE_PATH.length > 0
            ? `/${env.VITE_BASE_PATH}/`
            : '/'

    return {
        plugins: [react()],
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src'),
            },
        },
        base: base,
    }
})

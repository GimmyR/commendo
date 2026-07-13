import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        globals: true,
        root: './',
        environment: 'node',
        globalSetup: ['./vitest.setup-containers.ts'],
        fileParallelism: false,
        sequence: {
            concurrent: false
        }
    },
    resolve: {
        tsconfigPaths: true
    }
});

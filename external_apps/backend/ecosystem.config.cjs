module.exports = {
    apps: [
        {
            name: 'hd-api',
            script: './dist/index.js',
            instances: 5,
            exec_mode: 'cluster',
            env: {
                NODE_ENV: 'production',
                PORT: 3000,
                IS_API: 'true'
            }
        },
        {
            name: 'hd-socket',
            script: './dist/index.js',
            instances: 1,
            exec_mode: 'fork',
            env: {
                NODE_ENV: 'production',
                PORT: 3001,
                IS_SOCKET: 'true'
            }
        },
        {
            name: 'hd-worker',
            script: './dist/worker.js',
            instances: 1,
            exec_mode: 'fork',
            env: {
                NODE_ENV: 'production',
                IS_WORKER: 'true'
            }
        },
        {
            name: 'hd-media',
            script: './dist/index.js',
            instances: 1,
            exec_mode: 'fork',
            env: {
                NODE_ENV: 'production',
                PORT: 3002,
                IS_MEDIA: 'true'
            }
        }
    ]
};

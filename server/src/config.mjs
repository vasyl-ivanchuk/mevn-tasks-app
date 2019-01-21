export const app = {
    port: process.env.PORT || 3001
};

export const db = {
    host: process.env.DB_HOST || '127.0.0.1',
    collectionName: process.env.DB_COLLECTION || 'mevn-tasks-app'
};

export const auth = {
    tokenExpiresIn: parseInt(process.env.AUTH_TOKEN_EXPIRES_IN) || 60 * 60 * 24 * 30,
    secret: process.env.AUTH_SCRET || 'secretKey'
};

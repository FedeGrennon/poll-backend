export const config = () => ({
    env: process.env.NODE_ENV,
    port: parseInt(process.env.PORT, 10) || 9000,
    mongodb: {
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT, 10) || 27017,
        database: process.env.DB_DATABASE
    },
    jwt_secret: process.env.JWT_SECRET,
    jwt_expire_seconds: process.env.JWT_EXPIRE_SEC
})
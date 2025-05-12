export default {
  stage: 'staging',
  secrets: {
    jwt: process.env.JWT_SECRET,
    dbUrl: process.env.DATABASE_URL
  },
  logging: true,
  port: parseInt(process.env.PORT) || 4001
}
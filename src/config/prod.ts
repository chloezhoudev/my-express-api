export default {
  stage: 'production',
  secrets: {
    jwt: process.env.JWT_SECRET,
    dbUrl: process.env.DATABASE_URL
  },
  logging: false,
  port: parseInt(process.env.PORT) || 5001
}
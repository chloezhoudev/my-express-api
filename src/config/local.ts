export default {
  stage: 'local',
  secrets: {
    jwt: process.env.JWT_SECRET,
    dbUrl: process.env.DATABASE_URL
  },
  logging: true,
  port: 3001
}
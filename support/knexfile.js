module.exports = {
  client: 'postgresql',
  searchPath: 'public',
  connection: {
    database: 'test',
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
  },
}

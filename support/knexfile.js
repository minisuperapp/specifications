module.exports = {
  client: 'postgresql',
  searchPath: 'public',
  connection: {
    database: 'test',
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'root',
    port: process.env.DB_PORT || 15432,
  },
}

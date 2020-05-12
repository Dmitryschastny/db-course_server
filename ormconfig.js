module.exports = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '12345678',
  database: 'CourseProject',
  logging: true,
  logger: 'file',
  /**
   * Indicates if database schema should be auto created on every application launch.
   * Set to false for the first time, then false
   */
  synchronize: true,
  entities: ['src/entities/**/*.ts'],
  subscribers: ['src/subscriber/*.ts'],
  migrations: ['src/migration/*.ts'],
  cli: {
    entitiesDir: 'src/entities',
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber',
  },
};

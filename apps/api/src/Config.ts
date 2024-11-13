export interface DatabaseConfig {
  type: 'postgres' | 'mysql' | 'mssql';
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}
export interface Config {
  env: string;
  database: DatabaseConfig;
}

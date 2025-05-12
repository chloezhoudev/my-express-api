import merge from 'lodash.merge';

// Define config interface
interface Config {
  stage: string;
  secrets: {
    jwt: string;
    dbUrl: string;
  };
  logging: boolean;
  port: number;
}

// Set default environment
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const stage = process.env.STAGE || 'local';

// Base config
const defaultConfig: Config = {
  stage,
  secrets: {
    jwt: process.env.JWT_SECRET,
    dbUrl: process.env.DATABASE_URL
  },
  logging: false,
  port: parseInt(process.env.PORT) || 3001
}

// Dynamic config loading
let envConfig: Partial<Config>;
if (stage === 'production') {
  envConfig = require('./prod').default;
} else if (stage === 'staging') {
  envConfig = require('./staging').default;
} else {
  envConfig = require('./local').default;
}

// Merge configs
const config = merge(defaultConfig, envConfig);

export default config;
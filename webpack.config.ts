import { join } from 'node:path';

import 'dotenv/config';
import { buildConfig } from './config/webpack';

import type { Configuration } from 'webpack';
import type { IBuildOptions, BuildMode, IBuildPaths, NeedOpening } from './config/webpack';

interface IEnvironmentVariables {
  mode?: BuildMode;
  port?: number;
  needOpening?: NeedOpening;
}

export default (env: IEnvironmentVariables): Configuration => {
  env.mode = env.mode ?? 'development';

  const paths: IBuildPaths = {
    entry: join(__dirname, 'src', 'index.tsx'),
    output: join(__dirname, 'build'),
    public: join(__dirname, 'public'),
    src: join(__dirname, 'src'),
  };

  const options: IBuildOptions = {
    mode: env.mode,
    isDevelopment: env.mode === 'development',
    isProduction: env.mode === 'production',
    port: env.port ?? 3000,
    needOpening: Boolean(env.needOpening),
    paths,
  };

  return buildConfig(options);
};

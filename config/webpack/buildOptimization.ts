import { EsbuildPlugin } from 'esbuild-loader';

import type { Configuration } from 'webpack';

export const buildOptimization = (): Configuration['optimization'] => {
  return {
    minimizer: [new EsbuildPlugin({ target: 'es2015', css: true })],
  };
};

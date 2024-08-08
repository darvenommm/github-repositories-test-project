import { CodegenConfig } from '@graphql-codegen/cli';

import 'dotenv/config';

const config: CodegenConfig = {
  schema: {
    [String(process.env.GITHUB_URL)]: {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        'User-Agent': 'node.js',
      },
    },
  },
  documents: ['./src/**/*.{ts,tsx}'],
  generates: {
    './src/__generated__/': {
      preset: 'client',
      plugins: [],
      presetConfig: {
        gqlTagName: 'gql',
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;

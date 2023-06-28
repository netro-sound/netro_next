import {CodegenConfig} from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: process.env.GRAPHQL_ENDPOINT || 'http://localhost:8000/graphql',
  documents: ['./**/*.tsx'],
  generates: {
    './__generated__/': {
      preset: 'client',
      plugins: [],
      presetConfig: {
        gqlTagName: 'gql',
      }
    }
  },
  ignoreNoDocuments: true,
};

export default config;

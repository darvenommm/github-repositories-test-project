import MiniCssExtractPlugin from 'mini-css-extract-plugin';

import type { ModuleOptions } from 'webpack';

import type { IBuildOptions } from './types/types';

export const buildLoaders = ({ isDevelopment }: IBuildOptions): ModuleOptions['rules'] => {
  const tsLoader = {
    test: /\.[jt]sx?$/,
    loader: 'esbuild-loader',
    exclude: /node_modules/,
    options: {
      target: 'es2015',
    },
  };

  const styleLoaders = [
    {
      test: /\.module\.(s[ac]ss|css)$/i,
      use: [
        isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: {
            sourceMap: isDevelopment,
            modules: {
              localIdentName: isDevelopment
                ? '[path][name]__[local]--[hash:base64:5]'
                : '[hash:base64:10]',
            },
          },
        },
        {
          loader: 'sass-loader',
          options: { sourceMap: isDevelopment },
        },
      ],
    },
    {
      test: /(?<!\.module)\.(s[ac]ss|css)$/i,
      use: [
        isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: { sourceMap: isDevelopment },
        },
        {
          loader: 'sass-loader',
          options: { sourceMap: isDevelopment },
        },
      ],
    },
  ];

  const imageLoader = {
    test: /\.(png|jpg|jpeg|gif|avif|webp)$/i,
    type: 'asset/resource',
  };

  const textLoader = {
    test: /\.txt$/i,
    type: 'assets/source',
  };

  const svgLoaders = [
    {
      test: /\.svg$/i,
      type: 'asset',
      resourceQuery: /url/,
    },
    {
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      resourceQuery: { not: [/url/] },
      use: '@svgr/webpack',
    },
  ];

  return [tsLoader, ...styleLoaders, ...svgLoaders, imageLoader, textLoader];
};

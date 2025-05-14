import type { NextConfig } from 'next';
import type { Configuration } from 'webpack';

const nextConfig: NextConfig = {
    reactStrictMode: true,
    output: 'standalone',

    webpack(config: Configuration): Configuration {
        // Exclude svg from the default file loader
        const fileLoaderRule = config.module?.rules?.find(
            (rule) => typeof rule === 'object' && rule !== null && 'test' in rule && rule.test instanceof RegExp && rule.test.test('.svg')
        ) as any;

        if (fileLoaderRule) {
            fileLoaderRule.exclude = /\.svg$/i;
        }

        // Add SVGR loader
        config.module?.rules?.push({
            test: /\.svg$/i,
            issuer: /\.[jt]sx?$/,
            use: [
                {
                    loader: '@svgr/webpack',
                    options: {
                        icon: true,
                        svgo: true,
                    },
                },
            ],
        });

        return config;
    },

    turbopack: {
        rules: {
            '*.svg': {
                loaders: ['@svgr/webpack'],
                as: '*.ts',
            },
        },
    },
};

export default nextConfig;

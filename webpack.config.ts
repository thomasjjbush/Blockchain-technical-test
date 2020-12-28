import HtmlWebPackPlugin from 'html-webpack-plugin';
import { WebpackConfig } from './types';

export default ({ NODE_ENV }: { NODE_ENV: string }): WebpackConfig => ({
    devServer: {
        historyApiFallback: true,
        hot: true,
        open: true,
    },
    entry: ['./src/modules/entry-point/index.tsx'],
    mode: NODE_ENV,
    module: {
        rules: [
            {
                exclude: [/node_modules/, /\.(spec|test).(tx|tsx)?$/],
                test: /\.(ts|tsx)$/,
                use: {
                    loader: 'ts-loader',
                },
            },
            {
                test: /\.html$/,
                use: {
                    loader: 'html-loader',
                },
            },
        ],
    },
    output: {
        publicPath: '/',
    },
    plugins: [
        new HtmlWebPackPlugin({
            filename: 'index.html',
            template: './src/index.html',
        }),
    ],
    resolve: {
        extensions: ['.js', '.ts', '.tsx'],
    },
});

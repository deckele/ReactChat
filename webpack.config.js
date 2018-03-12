const path = require('path');
const webpack = require('webpack');
const glob = require('glob-all');

const appFolder = path.resolve(__dirname, 'src');
const projectPaths = {
    src: appFolder,
    dist: path.resolve(__dirname, 'dist'),
    style: glob.sync([
        path.resolve(appFolder, '*.+(css|less)'),
        path.resolve(appFolder, '**', '*.+(css|less)'),
    ])
};
module.exports = {
    entry: {
        app: projectPaths.src
    },
    output: {
        path: projectPaths.dist,
        filename: "[name].js",
        publicPath: "/assets/"
    },
    resolve: {
        extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js']
    },
    devtool: 'source-maps',
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/,
                loader: 'ts-loader',
                include: [
                    projectPaths.src
                ]
            },
            {
                test: /\.(jpe|jpg|png|woff|woff2|eot|ttf|svg)(\?.*$|$)/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 50000
                        }
                    }
                ]
            },
            {
                test: /\.(css|less)$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: () => [
                                require('autoprefixer')(),
                            ]
                        }
                    },
                    {
                        loader: "less-loader", 
                        options: {
                            paths: projectPaths.style
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin({ multiStep: true }),
    ],
    devServer: {
        proxy: { // proxy URLs to backend development server
            '/api': 'http://localhost:3000'
        },
        contentBase: path.join(__dirname, 'public'),
        compress: true, // enable gzip compression
        historyApiFallback: true, // true for index.html upon 404, object for multiple paths
        hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
        https: false, // true for self-signed, object for cert authority
        noInfo: true, // only errors & warns on hot reload
        // ...
    },
};
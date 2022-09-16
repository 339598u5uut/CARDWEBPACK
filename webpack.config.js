const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env) => ({
    mode: env.production ? "production" : "development",
    entry: "./src/index.js",
    output: {
        filename: "main.[contenthash].js",
        publicPath: "/CARDWEBPACK/",
    },
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000,
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "Форма оплаты",
        }),
        new MiniCssExtractPlugin({
            filename: "main.[contenthash].css",
        }),
    ],
    module: {
        rules: [{
                test: /\.js$/i,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"],
                    },
                },
            },
            {
                test: /\.png$/i,
                type: "asset",
            },
            {
                test: /\.css$/i,
                use: [
                    env.production ? MiniCssExtractPlugin.loader : "style-loader",
                    "css-loader",
                ],
            },
        ],
    },
    optimization: {
        minimizer: [
            "...",
            new ImageMinimizerPlugin({
                minimizer: {
                    implementation: ImageMinimizerPlugin.imageminMinify,
                    options: {
                        plugins: ["imagemin-optipng"],
                    },
                },
            }),
        ],
    },
    devServer: {
        hot: true,
    },
});

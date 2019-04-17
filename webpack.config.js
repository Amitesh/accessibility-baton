const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const WebpackMd5Hash = require("webpack-md5-hash");
const CleanWebpackPlugin = require('clean-webpack-plugin');

// https://github.com/jneidel/setup-webpack/
const scssLoader = {
    test: /\.(css|scss|sass)$/,
    use: [
        MiniCssExtractPlugin.loader,
        "css-loader",
        "sass-loader"
    ],
};

const fontLoader = {
    test: /\.(ttf|otf)$/,
    loader: "file-loader",
    options: {
        name: `font/[name].[ext]`
    }
};

const jsLoader = {
    test: /\.js$/,
    exclude: /node_modules/,
    use: {
        loader: "babel-loader",
        options: {
            presets: ["@babel/preset-env", "minify"]
        }
    }
};

const htmlLoader = {
    test: /\.html$/,
    use: [
        {
            loader: "html-loader",
            options: { minimize: true }
        }
    ]
};

module.exports = {
    module: {
        rules: [
            jsLoader,
            htmlLoader,
            scssLoader,
            fontLoader
        ]
    },
    optimization: { // If mode set to 'production' use scss minimizer
        minimize: true,
        minimizer: [new OptimizeCSSAssetsPlugin({})],
    },
    plugins: [
        new CleanWebpackPlugin({ verbose: true }),
        new HtmlWebPackPlugin({
            inject: false,
            hash: true,
            template: "./src/index.html",
            filename: "./index.html"
        }),
        new MiniCssExtractPlugin({
            filename: "[name]-[contenthash].css",
            chunkFilename: "[id]-[contenthash].css"
        }),
        new WebpackMd5Hash()
    ]
};
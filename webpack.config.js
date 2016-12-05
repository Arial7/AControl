var webpack = require("webpack");
var path = require("path");
var isProd = process.env.NODE_ENV === "production";

module.exports = {
    entry: {
        app: [ "./client/src/index.js", "webpack-hot-middleware/client" ],
        vendor: [ "react", "react-dom", "react-router", "react-mdl", "classnames", "shortid"]
    },
    output: {
        path: path.resolve("./client/dist/"),
        publicPath: path.resolve("./client/dist/"),
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css?modules", include: /flexboxgrid/ },
            { test: /\.s(a|c)ss$/, loaders: [ "style-loader", "css-loader", "sass-loader" ] },
            {
                test: /\.js(x?)$/,
                exclude: /(node_modules)/,
                loaders: [ "react-hot-loader", "babel-loader" ],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                loader: 'file?name=fonts/[name].[ext]'
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    'file?hash=sha512&digest=hex&name=[hash].[ext]',
                    'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
                ]
            }
        ]
    },
    plugins: isProd ? [
        new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.bundle.js"),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } })
    ] : [
        new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.bundle.js"),
        new webpack.HotModuleReplacementPlugin()
    ]
}


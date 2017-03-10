/**
 * Created by HH on 2017/3/3.
 */
var path = require('path');
var webpack = require('webpack');
module.exports = {
    entry: {
        app: './components/app.js'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '/dev/',
        filename: 'dev.js'
    },
    //plugins: [
    //    //new webpack.HotModuleReplacementPlugin()
    //    //提取公共部分资源
    //    new webpack.optimize.CommonsChunkPlugin({
    //        // 与 entry 中的 vendors 对应
    //        name: 'vendors',
    //        // 输出的公共资源名称
    //        filename: 'common.bundle.js',
    //        // 对所有entry实行这个规则
    //        minChunks: Infinity
    //    }),
    //    // 把jquery作为全局变量插入到所有的代码中
    //    // 然后就可以直接在页面中使用jQuery了
    //    new webpack.ProvidePlugin({
    //        $: 'jquery',
    //        jQuery: 'jquery',
    //        'window.jQuery': 'jquery'
    //    })],
    module: {
        loaders: [{
            test: /\.css$/,
            loaders: ['style-loader', 'css-loader']
        }, {
            test: /\.jsx?$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
                presets: ['es2015', 'react']
            }
        }, {
            test: /\.scss/,
            loader: 'style-loader!css-loader!autoprefixer-loader?{browsers:["last 2 version"]}!sass-loader?outputStyle=expanded'
            //loader: 'style-loader!css-loader!autoprefixer-loader!sass-loader'
            //loader: 'style-loader!css-loader!autoprefixer-loader!sass-loader!resolve-url!'
        },{
            // test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
            test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
            loader: 'url-loader?limit=5000&name=[path][name].[ext]'
        }]
    }
}

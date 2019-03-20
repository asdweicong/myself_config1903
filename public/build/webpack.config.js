/**
 * Created by weicong on 19/3/18.
 */
const webpack = require("webpack");
const path = require("path");
const os = require("os");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const HappyPack = require("happypack");
const happyThreadPool = HappyPack.ThreadPool({size: os.cpus().length}); //动态启动线程池


var appHostURL = 'http://192.168.199.149';
var appHost = '192.168.199.149';
var pages = require("./page.js").getConfig();


var getIpAddress = function () {
    var address = require("os").networkInterfaces();
    var host = address.en0[1].address;
    return host;
};

module.exports = {
    entry: pages.entry,//引用生成好的配置
    output: {
        path: path.resolve(__dirname, "../dist"),
        publicPath: '/',
        filename: 'js/[name].js'
    },
    devtool: 'eval',
    watch: true,//开启监听文件的更改，自动刷新
    watchOptions: {
        ignored: /node_modules/,//忽略不用监听变更的目录
        aggregateTimeout: 3000,//防止重复保存频繁重新编译，500毫秒内重复保存不打包
        poll: 1000,//每秒访问的文件表更的次数
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    chunks: "initial",
                    name: "common",
                    minChunks: 2,
                    maxInitialRequests: 5,
                    minSize: 0
                }
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                use: [{
                    loader: "html-loader",
                    options: {minimize: false},
                }]
            },
            {
                test: /\.js$/,
                use: ["happypack/loader?id=babel"],
                exclude: /node_modules/,
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    use: ["happypack/loader?id=css"],
                }),
            },
            {
                test: /\.scss$/,
                loader: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.(gif|jpg|jpeg|png|woff|svg|eot|ttf)\??.*$/,
                loader: 'url-loader?limit=8192&name-img/[name][hash].[ext]',
            }
        ]
    },
    plugins: []
        .concat(pages.plugins)
        .concat(
            [
                new ExtractTextPlugin("css/[name].css"),//单独使用style标签加载css并设置其路径
                new HappyPack({
                    id: 'babel',//使用唯一的标识符 id来代表当前的 HappyPack 是用来处理一类特定的文件
                    loaders: ['babel-loader?cacheDirectory'],//如何处理 .js文件，用法和Loader 配置中一样
                    threadPool: happyThreadPool,//使用共享进程池中的子进程去处理任务
                }),
                new HappyPack({
                    id: 'css',
                    loaders: ['css-loader'],//如何使用 .css文件，用法和Loader 配置中一样
                    threadPool: happyThreadPool,//使用共享进程池中的子进程去处理任务

                }),
                new HappyPack({
                    id: 'scss',
                    threadPool: happyThreadPool,
                    loaders: [
                        'style-loader',
                        'css-loader',
                        'postcss-loader',
                        'sass-loader',
                    ],
                }),
                new webpack.ProvidePlugin({
                    $: 'jquery',
                    jQuery: 'jquery',
                    'window.jQuery': 'jquery',
                    'window.$': '$',
                }),
                new webpack.ProvidePlugin({
                    avalon: 'avalon2',
                    'window.avalon': 'avalon',
                }),

            ]
        ),
    devServer: {
        disableHostCheck: true,
        hot: false,
        inline: false,
        proxy: {
            '/api/*': {
                target: 'http://192.168.199.149:3003',
                // host: '192.168.199.149',
                secure: true,
                onProxyRes: function onProxyRes(proxyRes, req, res) {
                    if (proxyRes.headers.location) {
                        var address = getIpAddress();
                        proxyRes.headers.location = 'http://' + address + '8000'; //重写重定向路径
                    }
                }
            }
        }
    },
    // devServer: {
    //     // hot: true,
    //     port: '8000',
    //     inline: true,
    //     // open: true,
    //     overlay: true,
    //     stats: 'errors-only',
    //     proxy: {
    //         '/api': {
    //             target: 'http://192.168.199.149:3003', // 目标接口的域名
    //             // secure: true,  // https 的时候 使用该参数
    //             changeOrigin: true,  // 是否跨域
    //             pathRewrite: {
    //                 '^/api': 'http://' + getIpAddress() + ':8000'  // 重写路径
    //             }
    //         }
    //     }
    // }
};


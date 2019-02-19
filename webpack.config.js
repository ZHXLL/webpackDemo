let path = require("path");
let HtmlWebpackPlugin = require("html-webpack-plugin");
let MiniCssExtractPlugin = require("mini-css-extract-plugin");
let OptimizeCssAssetsWebpackplugin = require("optimize-css-assets-webpack-plugin");
let UglifyjsWebpackPlugin = require("uglifyjs-webpack-plugin");
let webpack = require("webpack");//自带插件需要引入webpack
// console.log(path.resolve("dist"))
//node 核心模块 path
module.exports = {
    optimization: {
        minimizer: [
            new UglifyjsWebpackPlugin({}),
			new OptimizeCssAssetsWebpackplugin({})
        ]
    },
    mode:"development",
    entry:"./src/index.js",
    output:{
        path:path.resolve(__dirname,"dist"),
        filename:"bundle.js"
    },
    devServer:{
        port:"3000",
        contentBase:"./dist",
        progress:true,
        compress:true
    },
    plugins:[
        new HtmlWebpackPlugin({//抽离 html
            template:"./src/index.html",
            filename:"index.html",
            hash:true,
            minify:{
                removeAttributeQuotes:false,
                collapseWhitespace:false
            }
        }),
        new MiniCssExtractPlugin({
            filename:'main.css'
        }),
        new webpack.ProvidePlugin({ //这里是注入每个模块上的
            $:"jquery"
        })
    ],
    externals:{
        // jquery:"jQuery"
    },
    module:{
        rules:[
            {
                test:/\.html$/,
                use:"html-withimg-loader"
            },
            {
                test:/\.(jpg|png|gif)$/,
                use:{
                    loader:"file-loader",
                    options:{
                        limit:1500 //限制图片大小  如果大于1000   会转换base64
                    }
                }
            },
            {
                test:require.resolve("jquery"),
                use:"expose-loader?$"
            },
            // {
            //     test:/.js$/,
            //     use:{
            //         loader:"eslint-loader",
            //         options:{
            //             enfore:"pre"
            //         }
            //     }
            // },
            {
                test:/\.js$/,
                use:{
                    loader:"babel-loader",
                    // options:{//写入到.babelrc文件里面的东西都要隐藏了
                    //     presets:["@babel/preset-env"], //预设
                    //     plugins: [
                    //         ["@babel/plugin-proposal-decorators", { "legacy": true }],
                    //         ["@babel/plugin-proposal-class-properties", { "loose" : true }]
                    //     ]
                    // }
                },
                include:path.resolve(__dirname,'src'),
                exclude:/node_modules/
            },
            {
                test:/\.css$/,
                use:[{
                    loader:MiniCssExtractPlugin.loader,
                    options:{
                        insertAt:"top"
                    }
                },"css-loader","postcss-loader"]
            },
            {
                test:/\.less$/,
                use:[MiniCssExtractPlugin.loader,"css-loader","postcss-loader","less-loader"]
            },
        ]
    }
}
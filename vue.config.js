"use strict";
const path = require("path");
const defaultSettings = require("./src/settings.js");
// 引入等比适配插件
const px2rem = require("postcss-px2rem");
const CompressionPlugin = require("compression-webpack-plugin");
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;

// 配置基本大小
const postcss = px2rem({
  // 基准大小 baseSize，需要和rem.js中相同
  remUnit: 16,
});

// cdn预加载的模块
const externals = {};
// cdn预加载的模块的地址
const cdn = {
  css: [
    "https://cdn.staticfile.org/element-ui/2.15.3/theme-chalk/index.min.css",
  ],
  js: ["https://cdn.staticfile.org/moment.js/2.29.1/locale/zh-cn.min.js"],
};

function resolve(dir) {
  return path.join(__dirname, dir);
}

const name =
  defaultSettings.title || "中关村科技成果转化与技术交易综合服务平台"; // page title

// If your port is set to 80,
// use administrator privileges to execute the command line.
// For example, Mac: sudo npm run
// You can change the port by the following methods:
// port = 9528 npm run dev OR npm run dev --port = 9528
const port = process.env.port || process.env.npm_config_port || 9528; // dev port

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
  /**
   * You will need to set publicPath if you plan to deploy your site under a sub path,
   * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
   * then publicPath should be set to "/bar/".
   * In most cases please use '/' !!!
   * Detail: https://cli.vuejs.org/config/#publicpath
   */
  publicPath: process.env.VUE_APP_MODE === "uat" ? "/zgc" : "/",
  outputDir: "dist",
  assetsDir: "static",
  lintOnSave: process.env.NODE_ENV === "development",
  productionSourceMap: false,
  css: {
    loaderOptions: {
      // postcss: {
      //   plugins: [
      //     postcss
      //   ]
      // },
      scss: {
        // additionalData: `@import "~@/styles/index.scss";`,
        prependData: `
          $backgroundImgURL: '${process.env.VUE_APP_IMG_URL}';
        `,
      },
    },
  },
  chainWebpack: (config) => {
    // ...其他配置

    const scssRule = config.module.rule("scss");
    scssRule.uses.clear();
    scssRule
      .use("vue-style-loader")
      .loader("vue-style-loader")
      .end()
      .use("css-loader")
      .loader("css-loader")
      .end()
      .use("sass-loader")
      .loader("sass-loader")
      .options({
        // 使用 sassOptions 的 additionalData 属性
        sassOptions: {
          additionalData: `@import "${path.resolve(
            __dirname,
            "src/styles/index.scss"
          )}";`,
        },
      });
  },
  devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true,
    },
    historyApiFallback: {
      index: "/index.html", // 与output的publicPath
    },
    proxy: {
      [process.env.VUE_APP_BASE_API]: {
        // target: `http://119.57.175.177:8088/`,
        target: `http://zgcgroup.pipix.ltd/api/`,
        changeOrigin: true,
        secure: false,
        // logLevel: 'debug',
        pathRewrite: {
          ["^" + process.env.VUE_APP_BASE_API]: "",
        },
        onProxyReq(proxyReq, req, res, options) {
          if (req.body) {
            const bodyData = JSON.stringify(req.body);
            // incase if content-type is application/x-www-form-urlencoded -> we need to change to application/json
            proxyReq.setHeader("Content-Type", "application/json");
            proxyReq.setHeader("Content-Length", Buffer.byteLength(bodyData));
            // stream the content
            proxyReq.write(bodyData);
          }
        },
      },
    },
  },
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: name,
    resolve: {
      alias: {
        "@": resolve("src"),
        img: resolve("src/assets/img"),
      },
    },
  },
  chainWebpack(config) {
    // it can improve the speed of the first screen, it is recommended to turn on preload
    config.plugin("compressionPlugin").use(
      new CompressionPlugin({
        filename: "[path].gz[query]",
        algorithm: "gzip",
        test: productionGzipExtensions,
        threshold: 10240,
        minRatio: 0.8,
        deleteOriginalAssets: false,
      })
    );

    // when there are many pages, it will cause too many meaningless requests
    config.plugins.delete("preload");
    config.plugins.delete("prefetch");

    // set svg-sprite-loader
    config.module.rule("svg").exclude.add(resolve("src/icons")).end();
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]",
      })
      .end();

    config.set("externals", externals);
    // 发布模式的isProd为true
    config.plugin("html").tap((args) => {
      args[0].cdn = cdn;
      return args;
    });

    config.when(process.env.NODE_ENV !== "development", (config) => {
      config
        .plugin("ScriptExtHtmlWebpackPlugin")
        .after("html")
        .use("script-ext-html-webpack-plugin", [
          {
            // `runtime` must same as runtimeChunk name. default is `runtime`
            inline: /runtime\..*\.js$/,
          },
        ])
        .end();
      config.optimization.splitChunks({
        chunks: "all",
        cacheGroups: {
          libs: {
            name: "chunk-libs",
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: "initial", // only package third parties that are initially dependent
          },
          // elementUI: {
          //   name: 'chunk-elementUI', // split elementUI into a single package
          //   priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
          //   test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
          // },
          commons: {
            name: "chunk-commons",
            test: resolve("src/components"), // can customize your rules
            minChunks: 3, //  minimum common number
            priority: 5,
            reuseExistingChunk: true,
          },
        },
      });

      // https:// webpack.js.org/configuration/optimization/#optimizationruntimechunk
      config.optimization.runtimeChunk("single");
      config.optimization.minimizer("terser").tap((args) => {
        // 注释console.*
        args[0].terserOptions.compress.drop_console = true;
        // remove debugger
        args[0].terserOptions.compress.drop_debugger = true;
        // 移除 console.log
        args[0].terserOptions.compress.pure_funcs = ["console.log"];
        // 去掉注释 如果需要看chunk-vendors公共部分插件，可以注释掉就可以看到注释了
        args[0].terserOptions.output = {
          comments: false,
        };
        return args;
      });
    });
  },
};

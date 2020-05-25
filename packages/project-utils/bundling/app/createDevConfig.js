module.exports = async (options = { openBrowser: true }) => {
    const path = require("path");
    const appIndexJs = path.resolve("src", "index.tsx");

    // Makes the script crash on unhandled rejections instead of silently
    // ignoring them. In the future, promise rejections that are not handled will
    // terminate the Node.js process with a non-zero exit code.
    process.on("unhandledRejection", err => {
        throw err;
    });

    // Ensure environment variables are read.
    require("./config/env");

    const fs = require("fs");
    const chalk = require("react-dev-utils/chalk");
    const webpack = require("webpack");
    const WebpackDevServer = require("webpack-dev-server");
    const clearConsole = require("react-dev-utils/clearConsole");
    const checkRequiredFiles = require("react-dev-utils/checkRequiredFiles");
    const {
        choosePort,
        createCompiler,
        prepareProxy,
        prepareUrls
    } = require("react-dev-utils/WebpackDevServerUtils");
    const openBrowserTab = require("react-dev-utils/openBrowser");
    const paths = require("./config/paths")({ appIndexJs });
    const configFactory = require("./config/webpack.config");
    const createDevServerConfig = require("./config/webpackDevServer.config");

    const useYarn = fs.existsSync(paths.yarnLockFile);
    const isInteractive = process.stdout.isTTY;

    // Warn and crash if required files are missing
    if (!checkRequiredFiles([paths.appHtml, paths.appIndexJs])) {
        process.exit(1);
    }

    // Tools like Cloud9 rely on this.
    const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3000;
    const HOST = process.env.HOST || "0.0.0.0";

    if (process.env.HOST) {
        console.log(
            chalk.cyan(
                `Attempting to bind to HOST environment variable: ${chalk.yellow(
                    chalk.bold(process.env.HOST)
                )}`
            )
        );
        console.log(
            `If this was unintentional, check that you haven't mistakenly set it in your shell.`
        );
        console.log(`Learn more here: ${chalk.yellow("https://bit.ly/CRA-advanced-config")}`);
        console.log();
    }

    // We require that you explicitly set browsers and do not fall back to browsers list defaults.
    const { checkBrowsers } = require("react-dev-utils/browsersHelper");

    let config = configFactory("development", { paths, babelCustomizer: options.babel });

    if (typeof options.webpack === "function") {
        config = options.webpack(config);
    }

    try {
        await checkBrowsers(paths.appPath, isInteractive);
        const port = await choosePort(HOST, DEFAULT_PORT);
        if (port == null) {
            // We have not found a port.
            return;
        }

        const protocol = process.env.HTTPS === "true" ? "https" : "http";
        const appName = require(paths.appPackageJson).name;
        const useTypeScript = fs.existsSync(paths.appTsConfig);
        const tscCompileOnError = process.env.TSC_COMPILE_ON_ERROR === "true";
        const urls = prepareUrls(protocol, HOST, port);
        const devSocket = {
            warnings: warnings => devServer.sockWrite(devServer.sockets, "warnings", warnings),
            errors: errors => devServer.sockWrite(devServer.sockets, "errors", errors)
        };
        // Create a webpack compiler that is configured with custom messages.
        const compiler = createCompiler({
            appName,
            config,
            devSocket,
            urls,
            useYarn,
            useTypeScript,
            tscCompileOnError,
            webpack
        });
        // Load proxy config
        const proxySetting = require(paths.appPackageJson).proxy;
        const proxyConfig = prepareProxy(proxySetting, paths.appPublic);
        // Serve webpack assets generated by the compiler over a web server.
        const serverConfig = createDevServerConfig(proxyConfig, urls.lanUrlForConfig);
        const devServer = new WebpackDevServer(compiler, serverConfig);
        // Launch WebpackDevServer.
        devServer.listen(port, HOST, err => {
            if (err) {
                return console.log(err);
            }
            if (isInteractive) {
                clearConsole();
            }

            console.log(chalk.cyan("Starting the development server...\n"));
            if (options.openBrowser) {
                openBrowserTab(urls.localUrlForBrowser);
            }
        });

        ["SIGINT", "SIGTERM"].forEach(function(sig) {
            process.on(sig, function() {
                devServer.close();
                process.exit();
            });
        });
    } catch (err) {
        if (err && err.message) {
            console.log(err.message);
        }
        process.exit(1);
    }
};

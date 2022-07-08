const exec = require('child_process').exec;
const allure = require('allure-commandline');

exports.config = {
    runner: 'local',
    autoCompileOpts: {
        autoCompile: true,
        // see https://github.com/TypeStrong/ts-node#cli-and-programmatic-options
        // for all available options
        tsNodeOpts: {
            transpileOnly: true,
            project: 'tsconfig.json',
        },
        // tsconfig-paths is only used if "tsConfigPathsOpts" are provided, if you
        // do please make sure "tsconfig-paths" is installed as dependency
    },
    specs: ['./test/specs/**/*.spec.ts'],
    suites: {
        test: ['./test/specs/*.ts'],
    },
    // Patterns to exclude.
    exclude: [
        // 'path/to/excluded/files'
    ],
    maxInstances: 5,
    capabilities: [
        {
            maxInstances: 1,
            browserName: 'chrome',
            acceptInsecureCerts: true,
        },
        {
            maxInstances: 1,
            browserName: 'firefox',
        },
    ],
    // Level of logging verbosity: trace | debug | info | warn | error | silent
    logLevel: 'warn',
    bail: 0,
    baseUrl: 'https://onetrackui.azurewebsites.net/login',
    waitforTimeout: 20000,
    connectionRetryTimeout: 90000,
    connectionRetryCount: 3,
    services: ['selenium-standalone'],
    framework: 'mocha',
    // reporters: ['spec'],
    reporters: [
        [
            'allure',
            {
                outputDir: 'allure-results',
                disableWebdriverStepsReporting: true,
                disableWebdriverScreenshotsReporting: false,
            },
        ],
        'spec',
    ],

    //
    // Options to be passed to Mocha.
    // See the full list at http://mochajs.org/
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000,
    },
    // =====
    // Hooks
    // =====
    beforeSession() {
        // before hook works as well
        require('expect-webdriverio').setOptions({
            wait: 5000,
        });
    },

    before: async function (capabilities, specs) {
        await browser.setTimeout({ pageLoad: 20000 });
        await browser.maximizeWindow();
    },

    // beforeCommand: async function (commandName, args) {
    //     await browser.waitUntil(() => browser.execute(() => document.readyState === 'complete'), {
    //         timeout: 30 * 1000, // 30 seconds
    //         timeoutMsg: 'Page not loaded after 30 seconds',
    //     });
    // },

    afterTest: async function (test, context, { error, result, duration, passed, retries }) {
        if (!passed) {
            await browser.takeScreenshot();
        }
    },

    // afterStep: function (test, scenario, { error, duration, passed }) {
    //     browser.takeScreenshot();
    // },

    // onComplete: function(exitCode, config, capabilities, results) {
    // },
    // onComplete: async function() {
    //     const reportError = new Error('Could not generate Allure report')
    //     const generation = allure(['generate', 'allure-results', '--clean'])

    //     return await new Promise(async (resolve, reject) => {
    //         const generationTimeout = setTimeout(
    //             () => reject(reportError),
    //             5000)
    //         exec('cp -R allure-report/history allure-results');
    //         generation.on('exit', function(exitCode) {
    //             clearTimeout(generationTimeout)

    //             if (exitCode !== 0) {
    //                 return reject(reportError)
    //             }

    //             console.log('Allure report successfully generated')
    //             resolve()
    //         });
    //     })
    // }
};

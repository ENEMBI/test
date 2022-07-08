//@ts-ignore
const { config } = require('./wdio.conf');
//@ts-ignore
const path = require('path');

const chromeHeadlessConfig = {
    ...config,
    services: [['selenium-standalone', { chrome: 'latest' }]],
    capabilities: [
        {
            maxInstances: 1,
            browserName: 'chrome',
            'goog:chromeOptions': {
                args: [
                    '--headless',
                    '--start-maximized',
                    '--no-sandbox',
                    '--disable-gpu',
                    '--window-size=1920,1080',
                    '--allow-insecure-localhost',
                ],
            },
        },
    ],
    logLevel: 'warn',

    path: '/wd/hub',
};

exports.config = chromeHeadlessConfig;

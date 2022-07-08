//@ts-ignore
const { config } = require('./wdio.conf');
//@ts-ignore
const path = require('path');

const chromeConfig = {
    ...config,
    services: [['selenium-standalone', { chrome: 'letest' }]],
    capabilities: [
        {
            maxInstances: 1,
            browserName: 'chrome',
            'goog:chromeOptions': {
                args: ['--start-maximized', '--window-size=1920,1080'],
            },
        },
    ],
    logLevel: 'info',

    path: '/wd/hub',
};

exports.config = chromeConfig;

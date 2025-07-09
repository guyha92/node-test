var assert = require('assert');
const util = require('util');
const request = util.promisify(require('request'));

const DEFAULT_TIMEOUT = 30000;

const AUTH_URL = 'https://api.yotpo.com/oauth/token'
const APP_KEY = 'TzlHeCYvXCtJ0CPv7Mw3IKSe90DsnfZ7GJXs7WY2'
const SECRET = 'encrypted'
const SUBSCRIPTIONS_URL = "https://subscriptions.yotpo.com?appcue=d12593bb-56ac-4e7c-bc0d-f1e287d2bf1b"
let utoken = '';

$browser.addHeader('User-Agent', 'subscriptions-v3-synthetics1');
let subscriptionsUrl = ''

$browser.sleep(1000)
    .then(() => init())
    .then(() => {
        console.log('Step 1', 'Go to subscriptions url');
        return $browser.get(subscriptionsUrl);
    })
    .then(() => {
        console.log('Step 2', 'Wait 15 seconds');
        return $browser.sleep(15000);
    })
    .then(function () {
        console.log('Step 3', 'Find app-cue tooltip in plans page');
        return $browser.waitForAndFindElement($driver.By.css('.appcues-tooltip-container'), DEFAULT_TIMEOUT)
    })
    .then(function () {
        console.log('Step 4', 'Click on first selling plan group');
        return $browser.waitForAndFindElement($driver.By.css('tbody tr:nth-child(1)'), DEFAULT_TIMEOUT)
            .then(el => el.click())
    })
    .then(function () {
        console.log('Step 5', 'Find app-cue tooltip in plan page');
        return $browser.waitForAndFindElement($driver.By.css('.appcues-tooltip-container'), DEFAULT_TIMEOUT)
    })
    .then(function () {
        console.log('Step 6', 'Test succeeded!');
    })
    .catch(e => {
        console.log('Caught an error');
        if (e.type && e.type === 'Step error') {
            console.log(JSON.stringify(e));
        }
        throw e.message;
    });


function init() {
    console.log('init started');
    const options = {
        method: 'POST',
        url: AUTH_URL,
        json: true,
        body: {
            "client_id": APP_KEY,
            "client_secret": SECRET,
            "grant_type": "client_credentials"
        }
    };
    return request(options)
        .then(response => {
            logResponse(options.url, response);
            utoken = response.body.access_token
            subscriptionsUrl = `${SUBSCRIPTIONS_URL}&appkey=${APP_KEY}&utoken=${utoken}#/plans`
            console.log('subscriptionsUrl result: ' + subscriptionsUrl)
        })
        .then(() => console.log('finished init successfully'))
}

function logResponse(url, response) {
    console.log('__________________________log response__________________________');
    console.log('url:', url)
    console.log('statusCode:', response && response.statusCode);
    console.log('body:', response && response.body);
    console.log('________________________________________________________________');
}

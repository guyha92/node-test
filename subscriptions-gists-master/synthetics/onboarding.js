var assert = require('assert');
const util = require('util');
const request = util.promisify(require('request'));

const DEFAULT_TIMEOUT = 10000;

const AUTH_URL = 'https://api.yotpo.com/oauth/token'
const APP_KEY = 'ZaO2xqddBSRLNFRdx87LGujszURqgT3fvbUqxKWZ'
const SECRET = `${$secure.SUBSCRIPTIONS_ONBOARDING_SECRET}`
const SUBSCRIPTIONS_URL = "https://subscriptions.yotpo.com"
const STORE_PASSWORD = '123456';
const ONBOARDING_DEFAULT_FEATURE_SETTINGS = {
    visited: false,
    step: 'get_start',
    is_finished: false,
    is_clicked_show_live_preview: false
};
let utoken = '';

$browser.addHeader('User-Agent', 'subscriptions-v3-synthetics1');
let subscriptionsUrl = ''

$browser.sleep(1000)
    .then(() => {
        return init();
    })
    .then(() => {
        console.log('Step 1', 'Navigate to store');
        return $browser.get('https://subscriptions-onboarding-synthetics.myshopify.com/products/test-product')
    })
    .then(function () {
        console.log('Step 2', 'Type store password');
        return $browser.waitForAndFindElement($driver.By.css('#password'), DEFAULT_TIMEOUT).sendKeys(STORE_PASSWORD)
    })
    .then(function () {
        console.log('Step 3', 'Click Enter');
        return $browser.waitForAndFindElement($driver.By.xpath('//button[text()=\'Enter\']'), DEFAULT_TIMEOUT)
            .then(function (el) {
                el.click()
            })
    })
    .then(function () {
        console.log('Step 4', 'navigating to subscriptionsUrl: ' + subscriptionsUrl);
        return $browser.get(subscriptionsUrl)
    })
    .then(function () {
        console.log('Step 5', 'Waiting 5 seconds');
        return $browser.sleep(5000);
    })
    .then(function () {
        console.log('Step 6', 'Clicking on element with selector: <(//span[normalize-space()="I\'m ready, let\'s go!"]');
        return $browser.waitForAndFindElement($driver.By.xpath('//span[normalize-space()="I\'m ready, let\'s go!"]'), DEFAULT_TIMEOUT)
            .then(function (el) {
                el.click()
            })
    })
    .then(function () {
        console.log('Step 7', 'Clicking on element with selector: <//span[text()=\'Choose product\']>');
        return $browser.waitForAndFindElement($driver.By.xpath('//span[text()=\'Choose product\']'), DEFAULT_TIMEOUT)
            .then(function (el) {
                el.click()
            })
    })
    .then(function () {
        console.log('Step 8', 'Clicking on element with selector: <(//div[@class=\'thumbnail-container\'])[1]>');
        return $browser.waitForAndFindElement($driver.By.xpath('(//div[@class=\'thumbnail-container\'])[1]'), DEFAULT_TIMEOUT)
            .then(function (el) {
                el.click()
            })
    })
    .then(function () {
        console.log('Step 9', 'Clicking on element with selector: <//span[text()=\'Done\']>');
        return $browser.waitForAndFindElement($driver.By.xpath('//span[text()=\'Done\']'), DEFAULT_TIMEOUT)
            .then(function (el) {
                el.click()
            })
    })
    .then(function () {
        console.log('Step 10', 'Waiting for dialog to close');
        return $browser.sleep(2000)
    })
    .then(function () {
        console.log('Step 11', 'Clicking on element with selector: <//span[text()=\'Next\']>');
        return $browser.waitForAndFindElement($driver.By.xpath('//span[text()=\'Next\']'), DEFAULT_TIMEOUT)
            .then(function (el) {
                el.click()
            })
    })
    .then(function () {
        console.log('Step 12', 'Clicking on element with selector: <//span[text()=\'Next\']>');
        return $browser.waitForAndFindElement($driver.By.xpath('//span[text()=\'Next\']'), DEFAULT_TIMEOUT)
            .then(function (el) {
                el.click()
            })
    })
    .then(function () {
        console.log('Step 13', 'Clicking on element with selector: <//span[text()=\'Next\']>');
        return $browser.waitForAndFindElement($driver.By.xpath('//span[text()=\'Next\']'), DEFAULT_TIMEOUT)
            .then(function (el) {
                el.click()
            })
    })
    .then(function () {
        console.log('Step 14', 'Clicking on element with selector: <//span[text()=\'Preview on my store\']>');
        return $browser.waitForAndFindElement($driver.By.xpath('//span[text()=\'Preview on my store\']'), DEFAULT_TIMEOUT)
            .then(function (el) {
                el.click()
            })
    })
    .then(function () {
        console.log('Step 15', 'Clicking on element with selector: <//span[text()=\'Next\']>');
        return $browser.waitForAndFindElement($driver.By.xpath('//span[text()=\'Next\']'), DEFAULT_TIMEOUT)
            .then(function (el) {
                el.click()
            })
    })
    .then(function () {
        console.log('Step 16', 'Clicking on element with selector: <//span[text()=\'Launch subscription!\']>');
        return $browser.waitForAndFindElement($driver.By.xpath('//span[text()=\'Launch subscription!\']'), DEFAULT_TIMEOUT)
            .then(function (el) {
                el.click()
            })
    })
    .then(function () {
        console.log('Step 17', 'Waiting for launch subscription dialog');
        return $browser.waitForAndFindElement($driver.By.css('.ui-dialog'), DEFAULT_TIMEOUT)
    })
    .then(function () {
        console.log('Step 18', 'Waiting for 3 seconds');
        return $browser.sleep(3000);
    })
    .then(function () {
        console.log('Step 19', 'Validate selling plan group allocation');
        return validateSellingPlanAllocation();
    })
    .then(function () {
        console.log('Step 20', 'Open product page');
        return $browser.get('https://subscriptions-onboarding-synthetics.myshopify.com/products/test-product');
    })
    .then(function () {
        console.log('Step 21', 'Validate widget is present');
        return $browser.waitForAndFindElement($driver.By.css('.yotpo-plans-and-policy-wrapper'), DEFAULT_TIMEOUT)
    })
    .then(function () {
        console.log('Step 22', 'Test completed successfully!, Reset test');
        resetTest();
    })
    .catch(e => {
        console.log('Caught an error, reset test');
        resetTest();
        if (e.type && e.type === 'Step error') {
            console.log(JSON.stringify(e));
        }
        throw e.message;
    });

function resetFeatureSettings() {
    const options = {
        url: `https://api.yotpo.com/apps/${APP_KEY}/features/389/feature_settings/mass_update?utoken=${utoken}`,
        method: 'PUT',
        json: true,
        body:
            {
                settings: {
                    ...ONBOARDING_DEFAULT_FEATURE_SETTINGS
                }
            }
    };
    return request(options).then(response => logResponse(options.url, response))
}

function resetSellingPlanGroups() {
    const options = {
        method: 'GET',
        url: `https://api.yotpo.com/echo/v3/stores/${APP_KEY}/selling-plan-groups?limit=1&nextResults=true&reversed=true`,
        json: true,
        headers: {
            "x-yotpo-token": utoken
        }
    };
    return request(options)
        .then(response => {
            logResponse(options.url, response);
            if (response.body.selling_plan_groups && response.body.selling_plan_groups.length > 0) {
                const sellingPlanGroupId = response.body.selling_plan_groups[0].id;
                if (sellingPlanGroupId) {
                    const options = {
                        method: 'DELETE',
                        url: `https://api.yotpo.com/echo/v3/stores/${APP_KEY}/selling-plan-groups/${sellingPlanGroupId}`,
                        json: true,
                        headers: {
                            "x-yotpo-token": utoken
                        }
                    };
                    request(options).then(response => logResponse(options.url, response))

                }
            }
        })
}

function resetTest() {
    console.log('reset started');
    return resetFeatureSettings().then(() => {
        return resetSellingPlanGroups().then(() => {
            console.log('reset completed');
        });
    });
}

function validateFeatureSettingsPreConditions() {
    console.log('Validating feature settings pre-conditions')
    const options = {
        method: 'GET',
        url: `https://api.yotpo.com/apps/${APP_KEY}/features/389/feature_settings?utoken=${utoken}`,
        json: true,
    };
    return request(options).then(response => {
        logResponse(options.url, response)
        assert.equal(response.body.response.visited, ONBOARDING_DEFAULT_FEATURE_SETTINGS.visited);
        assert.equal(response.body.response.step, ONBOARDING_DEFAULT_FEATURE_SETTINGS.step);
        assert.equal(response.body.response.is_finished, ONBOARDING_DEFAULT_FEATURE_SETTINGS.is_finished);
        assert.equal(response.body.response.is_clicked_show_live_preview, ONBOARDING_DEFAULT_FEATURE_SETTINGS.is_clicked_show_live_preview);
        console.log('Feature settings pre-conditions validated successfully')
    });
}

function validateSellingPlanGroupsPreConditions() {
    console.log('Validating selling plan groups pre-conditions')
    const options = {
        method: 'GET',
        url: `https://api.yotpo.com/echo/v3/stores/${APP_KEY}/selling-plan-groups?limit=1&nextResults=true&reversed=true`,
        json: true,
        headers: {
            "x-yotpo-token": utoken
        }
    };
    return request(options).then(response => {
        logResponse(options.url, response);
        assert.equal(response.body.selling_plan_groups.length, 0)
        console.log('Selling plan groups pre-conditions validated successfully')
    })
}

function init() {
    console.log('init started');
    const options = {
        method: 'POST',
        url: AUTH_URL, json: true, body: {
            "client_id": APP_KEY,
            "client_secret": SECRET,
            "grant_type": "client_credentials"
        }
    };
    return request(options)
        .then(response => {
            logResponse(options.url, response);
            utoken = response.body.access_token
            subscriptionsUrl = `${SUBSCRIPTIONS_URL}?appkey=${APP_KEY}&utoken=${utoken}`
            console.log('subscriptionsUrl result: ' + subscriptionsUrl)
        })
        .then(() => resetTest())
        .then(() => validateFeatureSettingsPreConditions())
        .then(() => validateSellingPlanGroupsPreConditions())
        .then(() => console.log('finished init successfully'))
}

function logResponse(url, response) {
    console.log('__________________________log response__________________________');
    console.log('url:', url)
    console.log('statusCode:', response && response.statusCode);
    console.log('body:', response && response.body);
    console.log('________________________________________________________________');
}

function validateSellingPlanAllocation() {
    return retry(isSellingPlanAllocationExists, 10)
}

function isSellingPlanAllocationExists() {
    return $browser.get('https://subscriptions-onboarding-synthetics.myshopify.com/products/test-product.js')
        .then(function (response) {
            return $browser.waitForAndFindElement($driver.By.xpath('//body'), 20000);
        })
        .then(function (body) {
            return body.getText()
        })
        .then(function (bodyText) {
            return JSON.parse(bodyText)
        })
        .then(function (bodyTextJson) {
            console.log('bodyTextJson: ', bodyTextJson);
            if (!bodyTextJson.selling_plan_groups.length) {
                throw new Error("selling plan groups was not found for product")
            }
        })
}


function retry(fn, n) {
    let p = Promise.reject();

    for (let i = 0; i < n; i++) {
        p = p.catch(() => {
            console.log(`Failed at the  ${i} try`)
            return fn()
        }).catch(rejectDelay);
    }
    p.catch(() => {
        throw new Error(`Failed retrying ${n} times`);
    });
    return p;
}

function rejectDelay(reason) {
    return new Promise(function (resolve, reject) {
        setTimeout(reject.bind(null, reason), 2000);
    });
}

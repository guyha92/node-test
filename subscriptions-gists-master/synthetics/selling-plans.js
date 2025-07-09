/**
 * Feel free to explore, or check out the full documentation
 * https://docs.newrelic.com/docs/synthetics/new-relic-synthetics/scripting-monitors/writing-scripted-browsers
 * for details.
 */

var assert = require('assert');
const request = require('request');

const AUTH_URL = 'https://api.yotpo.com/oauth/token'
const APP_KEY = 'TzlHeCYvXCtJ0CPv7Mw3IKSe90DsnfZ7GJXs7WY2'
const SECRET = 'encrypted'
const SUBSCRIPTIONS_URL = "https://subscriptions.yotpo.com"
$browser.addHeader('User-Agent', 'subscriptions-v3-synthetics1');
let subscriptionsUrl = ''
request.post({url:AUTH_URL, json: true, body: {
  "client_id": APP_KEY,
  "client_secret": SECRET,
  "grant_type": "client_credentials"}}, function (error, response, body) {
  console.error('error:', error);
  console.log('statusCode:', response && response.statusCode); 
  console.log('body:', body);
  subscriptionsUrl = `${SUBSCRIPTIONS_URL}/#/selling-plans?appkey=${APP_KEY}&utoken=${response.body.access_token}`
  console.log('subscriptionsUrl result: ' + subscriptionsUrl)
});

console.log('waiting 1 second');
$browser.sleep(1000).then(function() {
  console.log('navigating to subscriptionsUrl: ' + subscriptionsUrl)
  return $browser.get(subscriptionsUrl)
    .then(function(){
      console.log("waiting 5 seconds");
      return $browser.sleep(5000);
    }).then(function(){
      console.log("trying to catch first topic");
      return $browser.waitForAndFindElement($driver.By.css(".ui-table"), 20000)
    }).then(function(el) {
      console.log("looking for selling group");
      return $browser.findElement($driver.By.xpath("//*[contains(text(),'Subscribe')]"));
    })
  });

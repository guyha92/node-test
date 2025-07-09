#!/bin/bash

echo "getting admin url by app key $1"

ACCOUNT=$(curl -s --request POST 'https://registration-http-service-default.yotpo.xyz/account_system/provision_account' \
--header 'Content-Type: application/json' \
--data-raw '{
    "store_info": {
        "app_key": "'"$1"'"
    }
}')

UTOKEN=$(echo $ACCOUNT | jq '.response.admin_info.token' | tr -d \")


echo "https://subscriptions.yotpo.com/#/?appkey=$1&utoken=$UTOKEN"

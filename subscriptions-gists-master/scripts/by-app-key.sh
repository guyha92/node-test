#!/bin/bash

echo "getting store by app key $1"

curl --location --request POST 'http://store-platform-api-default.yotpo.xyz/store_platform/get_store_platform_info' \
--header 'Content-Type: application/json' \
--data-raw '{
    "product_category": "Subscriptions",
    "account_info": {
        "store_info": {
            "app_key": "'"$1"'"
        }
    }
}'
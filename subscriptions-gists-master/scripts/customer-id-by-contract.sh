#!/bin/bash

echo "getting customer id by app key and subscription contract $1 $2"

CONTRACT=$(curl -s --location --request GET 'https://subscriptions-shopify-facade-http-service-default.yotpo.xyz/v3/stores/'"$1"'/subscription-contracts/'"$2"'')

echo "customer id is"
echo $CONTRACT | jq '.customer.id' | tr -d \"

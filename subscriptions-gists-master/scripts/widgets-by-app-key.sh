#!/bin/bash


echo "getting widget instances for app key $1"


ACCOUNT=$(curl -s --request POST 'https://registration-http-service-default.yotpo.xyz/account_system/provision_account' \
--header 'Content-Type: application/json' \
--data-raw '{
    "store_info": {
        "app_key": "'"$1"'"
    }
}')

UTOKEN=$(echo $ACCOUNT | jq '.response.admin_info.token' | tr -d \")

OUTPUT=$(curl -s 'https://loyalty.yotpo.com/api/v2/widgets?widgets_v3_auth=true&no_child_widgets=true&app=subscriptions&utoken='$UTOKEN'')

for i in {0..1};
 do 
    NAME=$(echo $OUTPUT | jq '.widget_instances['"$i"'].widget_type_name')
    if [ $NAME == "\""SubscriptionsCustomerPortal"\"" ];
        then 
            echo "Customer portal instance id:"
            echo $OUTPUT | jq '.widget_instances['"$i"'].widget_instance_id';
    fi;
        if [ $NAME == "\""SubscriptionsAddToCartWidget"\"" ];
        then 
            echo "Add to cart instance id:"
            echo $OUTPUT | jq '.widget_instances['"$i"'].widget_instance_id';
    fi;
 done

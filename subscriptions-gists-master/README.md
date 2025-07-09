# Subscriptions Gists

A repository for useful gists for Subscriptions 


# Scripts

In scripts folder, you will find bash scripts to get store information.

**Get store info by app key**
```
./scripts/by-app-key.sh <STORE-APP-KEY>
```

**Get store info by store domain**

``` 
./scripts/by-domain.sh <STORE-DOMAIN>
```

**Get Admin url by app key**

```
./scripts/admin-url-by-app-key.sh <STORE-APP-KEY>

```

**Get widgets instances by app key**

```
./scripts/widgets-by-app-key.sh <STORE-APP-KEY>
```

**Get shopify customer id by app key contract id**

```
./scripts/customer-id-by-contract.sh <STORE-APP-KEY> <CONTRACT-ID>
```


**Open pull request from cli**

Add ```scripts/pr-function.sh``` to  ../.oh-my-zsh/functions and use in your git branch:
```pr master```

# Node

**Turn translation TSV into curl for updating widget customizations **
**TSV should be with only 2 columns: key + value, first row is headers **
```
node ./node/i18n-macosx.js <FILE_PATH> <STORE_APP_KEY> <WIDGET_INSTANCE_ID>
```

# Python

**Download necessary dependencies**

Step 1:
```
brew install python3
```

Step 2:
```
pip3 install -r requirements.txt
```

**Use migration-converter**
```
python3 migration_converter.py
```

**Remove column from csv**
```
python3 remove_column_from_csv.py <FILE_NAME> <COLUMN_TO_REMOVE>
```

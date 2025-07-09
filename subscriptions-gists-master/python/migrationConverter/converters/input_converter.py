import os

import pandas as pd


def subscription_convertor(input_file, output_file_name):
    # Define the required column names for subscription conversion
    required_columns = [
        "subscription_id",
        "customer_id",
        "customer_email",
        "address_id",
        "status",
        "recurring_price",
        "quantity",
        "external_product_id",
        "external_variant_id",
        "charge_interval_frequency",
        "order_interval_unit",
        "expire_after_specific_number_of_charges",
        "order_interval_frequency"
    ]

    # Read the input CSV file into a DataFrame
    df = pd.read_csv(input_file).astype(str)

    # Remove columns that are not in the required_columns list
    columns_to_remove = [col for col in df.columns if col not in required_columns]
    df.drop(columns_to_remove, axis=1, inplace=True)

    # Create the "output" folder in the current working directory if it doesn't exist
    output_folder = 'output'
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    # Create the full path for the output CSV file in the "Downloads" folder
    output_path = os.path.join(output_folder, output_file_name)

    # Save the modified DataFrame to the output CSV file
    df.to_csv(output_path, index=False)

    print("Subscription CSV file converted successfully. Output saved to", output_path)


def processed_charge_convertor(input_file, output_file_name):
    # Define the required column names for processed charge conversion
    required_columns = [
        "line_item_subscription_id",
        "charge_id",
        "transaction_id",
        "customer_id",
        "address_id",
        "multiple_rows",
        "total_shipping",
        "processor_name",
        "processed_at",
        "shipping_lines",
        "external_order_id",
        "discount_code"
    ]

    # Read the input CSV file into a DataFrame
    df = pd.read_csv(input_file).astype(str)

    # Remove columns that are not in the required_columns list
    columns_to_remove = [col for col in df.columns if col not in required_columns]
    df.drop(columns_to_remove, axis=1, inplace=True)

    # Create the "output" folder in the current working directory if it doesn't exist
    output_folder = 'output'
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    # Create the full path for the output CSV file in the "Downloads" folder
    output_path = os.path.join(output_folder, output_file_name)

    # Save the modified DataFrame to the output CSV file
    df.to_csv(output_path, index=False)

    print("Processed Charge CSV file converted successfully. Output saved to", output_path)


def queued_charge_convertor(input_file, output_file_name):
    # Define the required column names for queued charge conversion
    required_columns = [
        "line_item_subscription_id",
        "charge_id",
        "scheduled_at",
        "total_shipping",
        "shipping_lines",
        "multiple_rows",
        "discount_code",
        "processor_name"
    ]

    # Read the input CSV file into a DataFrame
    df = pd.read_csv(input_file).astype(str)

    # Remove columns that are not in the required_columns list
    columns_to_remove = [col for col in df.columns if col not in required_columns]
    df.drop(columns_to_remove, axis=1, inplace=True)

    # Create the "output" folder in the current working directory if it doesn't exist
    output_folder = 'output'
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    # Create the full path for the output CSV file in the "Downloads" folder
    output_path = os.path.join(output_folder, output_file_name)

    # Save the modified DataFrame to the output CSV file
    df.to_csv(output_path, index=False)

    print("Queued Charge CSV file converted successfully. Output saved to", output_path)


def addresses_convertor(input_file, output_file_name):
    # Define the required column names for address conversion
    required_columns = [
        "address_id",
        "shipping_first_name",
        "shipping_last_name",
        "address_1",
        "address_2",
        "city",
        "province",
        "country",
        "zip",
        "phone"
    ]

    # Read the input CSV file into a DataFrame
    df = pd.read_csv(input_file).astype(str)

    # Remove columns that are not in the required_columns list
    columns_to_remove = [col for col in df.columns if col not in required_columns]
    df.drop(columns_to_remove, axis=1, inplace=True)

    # Create the "output" folder in the current working directory if it doesn't exist
    output_folder = 'output'
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    # Create the full path for the output CSV file in the "Downloads" folder
    output_path = os.path.join(output_folder, output_file_name)

    # Save the modified DataFrame to the output CSV file
    df.to_csv(output_path, index=False)

    print("Addresses CSV file converted successfully. Output saved to", output_path)


def customers_convertor(input_file, output_file_name):
    # Define the required column names for address conversion
    required_columns = [
        "customer_id",
        "external_customer_id"
    ]

    # Read the input CSV file into a DataFrame
    df = pd.read_csv(input_file).astype(str)

    # Remove columns that are not in the required_columns list
    columns_to_remove = [col for col in df.columns if col not in required_columns]
    df.drop(columns_to_remove, axis=1, inplace=True)

    # Create the "output" folder in the current working directory if it doesn't exist
    output_folder = 'output'
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    # Create the full path for the output CSV file in the "Downloads" folder
    output_path = os.path.join(output_folder, output_file_name)

    # Save the modified DataFrame to the output CSV file
    df.to_csv(output_path, index=False)

    print("Customers CSV file converted successfully. Output saved to", output_path)


def authorize_transactions_convertor(input_file, output_file_name):
    # Define the required column names for address conversion
    required_columns = [
        "transaction_id",
        "email",
        "invoice_number",
    ]

    # Read the input CSV file into a DataFrame
    df = pd.read_csv(input_file).astype(str)

    # Remove columns that are not in the required_columns list
    columns_to_remove = [col for col in df.columns if col not in required_columns]
    df.drop(columns_to_remove, axis=1, inplace=True)

    # Create the "output" folder in the current working directory if it doesn't exist
    output_folder = 'output'
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    # Create the full path for the output CSV file in the "Downloads" folder
    output_path = os.path.join(output_folder, output_file_name)

    # Save the modified DataFrame to the output CSV file
    df.to_csv(output_path, index=False)

    print("Authorize Transactions CSV file converted successfully. Output saved to", output_path)

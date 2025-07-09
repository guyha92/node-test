import os

import pandas as pd


def change_variants(input_file, output_file_name, variant_ids_map):

    # Read the input CSV file into a DataFrame
    df = pd.read_csv(input_file).astype(str)

    # Split the variant IDs in the LINESHOPIFYPRODUCTVARIANTID column by double colons (::)
    df['LINESHOPIFYPRODUCTVARIANTID'] = df['LINESHOPIFYPRODUCTVARIANTID'].str.split('::')

    # Apply the variant ID mapping individually for each variant ID in each row
    df['LINESHOPIFYPRODUCTVARIANTID'] = df['LINESHOPIFYPRODUCTVARIANTID'].apply(
        lambda variant_ids: [variant_ids_map.get(variant_id, variant_id) for variant_id in variant_ids]
    )

    # Join the modified variant IDs back into a single string separated by double colons (::)
    df['LINESHOPIFYPRODUCTVARIANTID'] = df['LINESHOPIFYPRODUCTVARIANTID'].apply(lambda variant_ids: '::'.join(variant_ids))

    # Create the "output" folder in the current working directory if it doesn't exist
    output_folder = 'output'
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    # Create the full path for the output CSV file in the "Downloads" folder
    output_path = os.path.join(output_folder, output_file_name)

    # Save the modified DataFrame to the output CSV file
    df.to_csv(output_path, index=False)

    print("Migration CSV file converted successfully. Output saved to", output_path)

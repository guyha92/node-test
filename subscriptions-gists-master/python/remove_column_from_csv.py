import pandas as pd
import sys

arguments = sys.argv

file_name = arguments[1]
column_to_remove = arguments[2]

# Read the CSV file into a pandas DataFrame
df = pd.read_csv(file_name)

# Remove the specified column from the DataFrame
df = df.drop(column_to_remove, axis=1)

# Write the updated DataFrame to a new CSV file
df.to_csv(file_name, index=False)

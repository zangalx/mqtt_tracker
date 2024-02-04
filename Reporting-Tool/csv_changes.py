import pandas as pd
import os
from google.cloud import storage
from dotenv import load_dotenv

load_dotenv()

# Initialize the Google Cloud Storage client
storage_client = storage.Client()
bucket = storage_client.bucket(os.environ['STORAGE_BUCKET'])
blob = bucket.blob(os.environ['STORAGE_BLOB'])

blob_filename = os.environ['BLOB_FILENAME']

# Download the CSV file from the bucket
blob.download_to_filename(blob_filename)

# Load the CSV file into a pandas DataFrame
df = pd.read_csv(blob_filename)

# Rename column
#df = df.rename(columns={'Vorname': 'Name'})

# Delete Rows
#valid_topics = ["friendtracker/wi21a", "friendtracker/projektarbeit", "friendtracker/feier"]
#df = df[df['Topic'].isin(valid_topics)]

# Delete Columns
#df = df.drop('nachname', axis=1)

# Find rows where 'Name' is 'Isabell Syd2' and change 'Name' to 'Isabell'
#df.loc[df['Name'] == 'Isabell Syd2', 'Name'] = 'Isabell'

# Keep only the rows where 'Name' is not 'Alex'
#df = df[df['Name'] != 'Alex']

# Upload the Pandas DataFrame back to the bucket
df.to_csv(blob_filename, index=False)
blob.upload_from_filename(blob_filename)
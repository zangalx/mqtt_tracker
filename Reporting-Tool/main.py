import os, json, threading
import pandas as pd
import paho.mqtt.client as mqtt
from google.cloud import storage
from dotenv import load_dotenv

load_dotenv()
blob_filename = os.environ['BLOB_FILENAME']

# Initialize the DataFrame
df = pd.DataFrame(columns=['Timestamp', 'Art', 'Gruppe', 'Topic', 'Name', 'Laengengrad', 'Breitengrad'])

# Initialize the Google Cloud Storage client
storage_client = storage.Client()

# Gets called new MQTT Broker gets connected
def on_connect(client, userdata, flags, rc):
    print("Connected with result code "+str(rc))
    client.subscribe("friendtracker/#")

# Gets called when a new MQTT message arrives
def on_message(client, userdata, msg):
    #print(msg.topic+" "+str(msg.payload))

    # Parse the MQTT message
    message = json.loads(msg.payload)

    # Extract the required fields and append them to the DataFrame
    global df 
    new_row = pd.DataFrame({
    'Timestamp': [message['timestamp']],
    'Art': ['MQTT'],
    'Gruppe': [message['group']],
    'Topic': [msg.topic],
    'Name': [message['name']],
    'Laengengrad': [message['location']['lng']],
    'Breitengrad': [message['location']['lat']]
    })

    df = pd.concat([df, new_row], ignore_index=True)

# Upload new data to Google Cloud Storage (every 15 seconds)
def upload_data():

    global df
    if not df.empty:

        bucket = storage_client.bucket(os.environ['STORAGE_BUCKET'])
        blob = bucket.blob(os.environ['STORAGE_BLOB'])

        # Download the existing CSV file
        blob.download_to_filename(blob_filename)
        existing_df = pd.read_csv(blob_filename)

        # Append the new rows
        updated_df = pd.concat([existing_df, df])

        updated_df.to_csv(blob_filename, index=False)
        blob.upload_from_filename(blob_filename)
        #print("Uploaded to Google Cloud Storage")

        # Clear the DataFrame
        df = df.iloc[0:0]

    # Schedule the next upload
    threading.Timer(15, upload_data).start()

# Start the upload thread
upload_data()

# Start the MQTT client
client = mqtt.Client()
client.username_pw_set(os.environ['MQTT_BROKER_USER'], os.environ['MQTT_BROKER_PASSWORD'])
client.on_connect = on_connect
client.on_message = on_message
client.connect(os.environ['MQTT_BROKER_IP'],int(os.environ['MQTT_BROKER_PORT']) , 60)
client.loop_forever()
import json, time, os
from threading import Thread
import paho.mqtt.client as mqtt
from dotenv import load_dotenv

load_dotenv()

# MQTT-Server-Details
broker = os.environ['MQTT_BROKER_IP']
port = int(os.environ['MQTT_BROKER_PORT'])
username = os.environ['MQTT_BROKER_USER']
password = os.environ['MQTT_BROKER_PASSWORD']

# MQTT-Message-Details
topic = "friendtracker/projektarbeit"
message = {
    "name": "Lasttest",
    "group": "projektarbeit",
    "location": {"lat": 49.354136255433005, "lng": 9.150209328098938},
    "timestamp": 1704883592388,
}

# Function to send MQTT-Messages
def send_mqtt_message(client_id):
    client = mqtt.Client(client_id)
    client.username_pw_set(username, password)
    client.connect(broker, port)

    while True:
        client.publish(topic, json.dumps(message))
        time.sleep(5)

# Cretes 50 MQTT-Threads to send messages
for i in range(50):
    Thread(target=send_mqtt_message, args=(f"Client-{i}",)).start()
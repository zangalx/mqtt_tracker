# Installation
Before running, you need to install the required packages. Run `pip install -r requirements.txt` in the "Reporting-Tool" folder to install all required packages.

## Environment
You need to set the environment variables. The template can be found in the folder overneath. 
Fill the template and rename it to `.env`.

## main
Infinitly running python script, to subscribe to a specific mqtt topic, retrieve data   
and write that data into a csv-file stored in a google bucket [(main.py)](main.py)

## csv_changes
Script to make mainpulations in the csv-file (e.g. changing names, changing topics, deleting columns) [(csv_changes.py)](csv_changes.py)

## lasttest
Script to test the performance of the mqtt server [(lasttest.py)](lasttest.py). It publishes 50 mqtt messages every 5 seconds. 
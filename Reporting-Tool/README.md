# Reporting-Tool
Reporting-Tool provides a toolbox to handle the dashboard provisioning: 

## Installation
Before running, make sure that you've installed an current python version (e.g. 3.12). You also need to install the required packages. Therefore navigate to the "Reporting-Tool"-Folder by Command-Line. \
[Optional]: Create a Virtual Environment by running: `python3 -m venv Reporting-Tool` \
Run `pip install -r requirements.txt` in the "Reporting-Tool" folder to install all required packages.

## Environment
You need to set the environment variables. The template can be found via [(.env-template)](".env-template"). Keep in mind to rename it to `.env` after filling out the variables. 

### Running
Running scripts is easy, simly provide "pyton" and the scriptname in the console and click enter (e.g. "python lasttext.py" - enter)

### main.py
Infinitly running python script, to subscribe to a specific mqtt topic, retrieve data   
and write that data into a csv-file stored in a google bucket [(main.py)](main.py)

### csv_changes.py
Script to make mainpulations in the csv-file (e.g. changing names, changing topics, deleting columns) [(csv_changes.py)](csv_changes.py)

### lasttest.py
Script to test the performance of the mqtt server [(lasttest.py)](lasttest.py). It publishes 50 mqtt messages every 5 seconds. 




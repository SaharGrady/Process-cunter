# Monitoring Memory Usage and Logging Data Scripts

## PowerShell Script

### Description
This PowerShell script allows users to monitor the memory usage of a specific process and periodically log this data to a CSV file. It prompts the user to enter a Process ID (PID) and continuously records the timestamp and memory usage in kilobytes.

### Key Features
- User input for the process PID.
- Periodic monitoring of memory usage.
- Data is logged to a CSV file with a timestamp.


## Node.js Script

### Description
This Node.js script monitors the memory usage of specified processes and sends the data to Google Chat using a webhook. It also logs the data to local files and repeats the monitoring at intervals.

### Key Features
- Monitoring memory usage for specific processes.
- Sending data to Google Chat.
- Logging data to local files.
- Repeating the monitoring at specified intervals.


These scripts provide a means to monitor and log memory usage data for specific processes, with the PowerShell script focusing on local data logging and the Node.js script enabling communication with Google Chat. Users can choose the script that best fits their needs for memory monitoring and data handling.

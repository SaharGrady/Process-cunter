Monitoring Memory Usage and Logging Data Scripts
PowerShell Script
Description
This PowerShell script allows users to monitor the memory usage of a specific process and periodically log this data to a CSV file. It prompts the user to enter a Process ID (PID) and continuously records the timestamp and memory usage in kilobytes.

Key Features
User input for the process PID.
Periodic monitoring of memory usage.
Data is logged to a CSV file with a timestamp.
Script Explanation
Prompt for Process PID

$PROCESS_PID = Read-Host "Enter the process PID to monitor": The user is prompted to input the PID of the process they want to monitor, and it's stored in the $PROCESS_PID variable.
Set Sampling Interval

$INTERVAL = 600: The script is set to sample memory usage every 600 seconds (10 minutes).
Initialize Data Array

$data = @(): An empty array named $data is created to store memory usage data.
Infinite Loop

while ($true) { ... }: The script runs continuously, monitoring memory usage.
Retrieve Process Information

$process = Get-Process -Id $PROCESS_PID -ErrorAction SilentlyContinue: The script attempts to retrieve process information based on the provided PID.
Process Memory Usage

If the process is found (if ($process) { ... }), the script calculates memory usage in kilobytes.
Create Custom Object

A custom PowerShell object, $entry, is created to store timestamp and memory usage data.
Store Data in Array

$data += $entry: The $entry object, containing the timestamp and memory usage data, is added to the $data array.
Print Memory Usage

Write-Host "$currentDateTime t Memory Usage: $memoryUsage KB"`: The script displays the current timestamp and memory usage in the console.
Export Data to CSV

$data | Export-Csv -Path "memory_log.csv" -Append -NoTypeInformation: The script exports the data in the $data array to a CSV file named "memory_log.csv."
Sleep for Interval

Start-Sleep -Seconds $INTERVAL: After processing and logging the data, the script sleeps for the specified interval (10 minutes) before repeating the process.
Node.js Script
Description
This Node.js script monitors the memory usage of specified processes and sends the data to Google Chat using a webhook. It also logs the data to local files and repeats the monitoring at intervals.

Key Features
Monitoring memory usage for specific processes.
Sending data to Google Chat.
Logging data to local files.
Repeating the monitoring at specified intervals.
Script Explanation
Dependencies

The script uses various Node.js modules, including child_process, fs, and axios.
Configuration

processIds: An array of process IDs to monitor.
webhookUrl: The URL of a Google Chat webhook where the memory information is sent.
Functions

getCurrentTimestamp(): Retrieves the current timestamp in ISO format.
bytesToKB(bytes): Converts bytes to kilobytes and rounds the result.
Monitoring and Exporting Data

The script monitors the memory usage of specified processes and sends the data to Google Chat and logs it to local files.
The monitoring process is repeated at specified intervals.
These scripts provide a means to monitor and log memory usage data for specific processes, with the PowerShell script focusing on local data logging and the Node.js script enabling communication with Google Chat. Users can choose the script that best fits their needs for memory monitoring and data handling.

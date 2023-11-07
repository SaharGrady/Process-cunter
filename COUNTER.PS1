# Prompt the user for the process PID
$PROCESS_PID = Read-Host "Enter the process PID to monitor"

# Set the sampling interval (in seconds)
$INTERVAL = 600

# Initialize an array to store the data
$data = @()

# Infinite loop
while ($true) {
    # Get the process by its PID
    $process = Get-Process -Id $PROCESS_PID -ErrorAction SilentlyContinue

    if ($process) {
        # Get the process's memory usage (Working Set) in KB
        $memoryUsage = $process.WorkingSet / 1KB

        # Get the current date and time
        $currentDateTime = Get-Date -Format "yyyy-MM-dd HH:mm:ss"

        # Create a custom object with the data
        $entry = New-Object PSObject -Property @{
            "Timestamp" = $currentDateTime
            "MemoryUsageKB" = $memoryUsage
        }

        # Add the entry to the data array
        $data += $entry

        # Print memory usage in the terminal
        Write-Host "$currentDateTime `t Memory Usage: $memoryUsage KB"
    }
    else {
        Write-Host "Process with PID $PROCESS_PID not found."
    }

    # Export data to a CSV file
    $data | Export-Csv -Path "memory_log.csv" -Append -NoTypeInformation

    # Sleep for the specified interval
    Start-Sleep -Seconds $INTERVAL
}

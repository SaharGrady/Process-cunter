const { exec } = require('child_process');
const fs = require('fs');
const axios = require('axios');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csv = require('csv-parser');

const processIds = [5380, 31028];  //process id 
//send a webhook to google chat
const webhookUrl =
  'YOUR_URL ';

// Define a function to create the CSV writer for a specific process ID
function createCsvWriterForProcess(processId) {
  return createCsvWriter({
    path: `memory_usage_${processId}.csv`,
    header: [
      { id: 'timestamp', title: 'Timestamp' },
      { id: 'rss', title: 'RSS (KB)' },
      { id: 'vms', title: 'VMS (KB)' },
    ],
  });
}

function getCurrentTimestamp() {
  const now = new Date();
  return now.toISOString();
}

function bytesToKB(bytes) {
  return Math.round(bytes / 1024);
}

function monitorAndExportData() {
  const timestamp = getCurrentTimestamp();
  console.log(`Monitoring Memory Usage at ${timestamp}:`);

  processIds.forEach((processId) => {
    monitorMemoryUsage(processId, timestamp);
  });
}

function monitorMemoryUsage(processId, timestamp) {
  exec(
    `wmic process where "ProcessId=${processId}" get WorkingSetSize,PrivatePageCount`,
    (error, stdout) => {
      if (error) {
        console.error(`Error for PID ${processId}: ${error.message}`);
        return;
      }

      const lines = stdout.trim().split('\r\r\n');
      if (lines.length === 2) {
        const [rss, vms] = lines[1].split(/\s+/).map(Number);

        // Prepare the memory info data
        const memoryInfo = {
          timestamp,
          rss: bytesToKB(rss),
          vms: bytesToKB(vms),
        };

        // Create a CSV writer for the process ID (if not created yet)
        if (!csvWriters[processId]) {
          csvWriters[processId] = createCsvWriterForProcess(processId);
          csvWriters[processId].writeRecords([memoryInfo]).then(() => {
            console.log(`Data has been written to memory_usage_${processId}.csv`);
          });
        } else {
          csvWriters[processId].writeRecords([memoryInfo]);
        }

        // Send a message to Google Chat with memoryInfo
        const message = {
          text: `Memory usage monitored for PID ${processId} \n Memory Usage for PID ${processId} at ${timestamp}:\n    RSS (Resident Set Size): ${bytesToKB(
            rss
          )} KB\n    VMS (Virtual Memory Size): ${bytesToKB(vms)} KB`,
        };

        axios
          .post(webhookUrl, message)
          .then((response) => {
            console.log('Message sent successfully:', response.data);
          })
          .catch((error) => {
            console.error('Error sending message:', error.message);
          });
      } else {
        console.log(`Process with PID ${processId} not found.`);
      }
    }
  );
}

// Store CSV writers for each process ID
const csvWriters = {};

monitorAndExportData();

setInterval(monitorAndExportData, 600000); /// TO REPEAT THE SERVIE 

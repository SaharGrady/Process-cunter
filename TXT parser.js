onst { exec } = require('child_process');
const fs = require('fs');
const axios = require('axios');

const processIds = [5380 , 31028];  // 

const webhookUrl = 'URL';

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
  exec(`wmic process where "ProcessId=${processId}" get WorkingSetSize,PrivatePageCount`, (error, stdout) => {
    if (error) {
      console.error(`Error for PID ${processId}: ${error.message}`);
      return;
    }

    const lines = stdout.trim().split('\r\r\n');
    if (lines.length === 2) {
      const [rss, vms] = lines[1].split(/\s+/).map(Number);
      const memoryInfo = `Memory Usage for PID ${processId} at ${timestamp}:\n` +
        `    RSS (Resident Set Size): ${bytesToKB(rss)} KB\n` +
        `    VMS (Virtual Memory Size): ${bytesToKB(vms)} KB\n` +
        '-'.repeat(40) + '\n';

      const logFileName = `memory_process_info_${processId}.txt`;
      fs.appendFile(logFileName, memoryInfo, (err) => {
        if (err) {
          console.error(`Error writing to file ${logFileName}: ${err.message}`);
        }
      });

      // Send a message to Google Chat with memoryInfo
      const message = {
        text: `Memory usage monitored \n ${memoryInfo}`,
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
  });
}

monitorAndExportData();

setInterval(monitorAndExportData, 600000);

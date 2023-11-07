const { exec } = require('child_process');

const processIds = [5380, 31028]; // your process ids 

function getCurrentTimestamp() {
  const now = new Date();
  return now.toISOString();
}

function bytesToKB(bytes) {
  return Math.round(bytes / 1024);
}

function monitorMemoryUsage(processId) {
  const timestamp = getCurrentTimestamp();
  console.log(`Monitoring Memory Usage for PID ${processId} at ${timestamp}:`);

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

        // Log the memory usage for the process
        console.log(`Memory Usage for PID ${processId}:\n`);
        console.log(`Timestamp: ${timestamp}`);
        console.log(`RSS (Resident Set Size): ${bytesToKB(rss)} KB`);
        console.log(`VMS (Virtual Memory Size): ${bytesToKB(vms)} KB`);
        console.log('-----------------------');

      } else {
        console.log(`Process with PID ${processId} not found.`);
      }
    }
  );
}

// Monitor and log memory usage for each process
processIds.forEach((processId) => {
  monitorMemoryUsage(processId);
});

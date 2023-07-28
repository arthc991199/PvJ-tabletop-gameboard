let roundNumber = 0;
let score = 0;
let rollbackCounter = 0; // Initialize the Rollback/Reset counter
let suggestedServerNames = ["Domain Controller","pfSense FW/router","bind server","Web server","PBX server", "File Server", "Oracle proxy server", "VPN pool server", "Dev Lab ESXi server", "Accounting Apps Server", "NAS Server","Orders API Server","Audit Logging Server","Proj.System server","Security video/badges server"];

// Get the "servers" URL parameter and create additional server boxes if needed
const urlParams = new URLSearchParams(window.location.search);
const serverCount = validateServerCount(urlParams.get('servers'));
createServerBoxes(serverCount);
// Update the server numbers
updateServerNumbers();

let scriptsCounter = validateScriptsCount(urlParams.get('scripts'));
updateScriptsCount(scriptsCounter);

function performRollback() {
  if (score >= 150) {
    score -= 150;
    rollbackCounter++;
    document.getElementById('score').textContent = score;
    document.getElementById('rollbackCounter').textContent = rollbackCounter;
  }
}

function useFixerScript() {
  if (scriptsCounter > 0) {
    scriptsCounter--;
    document.getElementById('scriptsCount').textContent = scriptsCounter;
  }
}

function updateScriptsCount(scriptCount) {
  document.getElementById('scriptsCount').textContent = scriptCount;
}

function enterServerName(serverId) {
  const serverName = prompt('Enter server name:');
  if (serverName) {
    document.getElementById(serverId).querySelector('.server-name').textContent = serverName;
  }
}

function initializeServerStatus(serverId) {
  const serverStatusBtn = document.getElementById(serverId).querySelector('.server-status-btn');
  serverStatusBtn.textContent = 'UP';
  serverStatusBtn.style.backgroundColor = 'green';
//  fixTimeDisplay.textContent = '-';
}

function validateScriptsCount(scriptCount) {
  const parsedCount = parseInt(scriptCount);
  if (isNaN(parsedCount) || parsedCount < 0 || parsedCount > 10) {
    return 3; // Default to 3 if invalid count or not provided
  }
  return parsedCount;
}

function validateServerCount(serverCount) {
  const parsedCount = parseInt(serverCount);
  if (isNaN(parsedCount) || parsedCount < 5 || parsedCount > 15) {
    return 5; // Default to 5 if invalid count or not provided
  }
  return parsedCount;
}

function createServerBoxes(serverCount) {
  const statusBoard = document.getElementById('statusBoard');
  for (let i = 6; i <= serverCount; i++) {
    const serverDiv = document.createElement('div');
    serverDiv.className = 'server';
    serverDiv.id = `server${i}`;

    serverDiv.innerHTML = `
      <div class="server-name" onclick="enterServerName('server${i}')">${suggestedServerNames[i]}</div>
      <button class="server-status-btn" onclick="toggleServerStatus('server${i}')">UP</button>
      <div class="fix-time">Fix Time: <span id="fixTime${i}">-</span></div>
      <button class="assigned-btn" onclick="toggleAssignedStatus('server${i}')">Unassigned</button>
    `;

    statusBoard.appendChild(serverDiv);
  }
}

function toggleServerStatus(serverId) {
  const serverStatusBtn = document.getElementById(serverId).querySelector('.server-status-btn');
  const serverBox = document.getElementById(serverId);
  const fixTimeDisplay = document.getElementById(`fixTime${serverId.substr(6)}`);
 
  if (serverStatusBtn.textContent === 'UP') {
    serverStatusBtn.textContent = 'DOWN';
    serverStatusBtn.style.backgroundColor = 'red';
    serverBox.style.backgroundColor = 'red';
    fixTimeDisplay.textContent = Math.floor(Math.random() * 8) + 1;
  } else if (serverStatusBtn.textContent === 'DOWN') {
    if (event.shiftKey) {
      serverStatusBtn.textContent = 'BORKED';
      serverStatusBtn.style.backgroundColor = 'black';
      serverStatusBtn.style.color = 'lightgray';
      serverBox.style.backgroundColor = 'black';
      serverBox.style.color = 'lightgray';
      fixTimeDisplay.textContent = 99;
    } else {
      serverStatusBtn.textContent = 'UP';
      serverStatusBtn.style.backgroundColor = 'green';
      serverBox.style.backgroundColor = 'lightgreen';
      fixTimeDisplay.textContent = '-';
      assignStatus(serverId,'Unassigned');
    }
  } else if (serverStatusBtn.textContent === 'BORKED') {
    serverStatusBtn.textContent = 'UP';
    serverStatusBtn.style.backgroundColor = 'green';
    serverStatusBtn.style.color = 'white';
    serverBox.style.backgroundColor = 'lightgreen';
    serverBox.style.color = "black";
    fixTimeDisplay.textContent = '-';
    assignStatus(serverId,'Unassigned');
  }
}

function assignStatus(serverId,thestatus) {
  const assignedBtn = document.getElementById(serverId).querySelector('.assigned-btn');
  assignedBtn.textContent = thestatus;
}

function toggleAssignedStatus(serverId) {
  const assignedBtn = document.getElementById(serverId).querySelector('.assigned-btn');
  
  if (assignedBtn.textContent === 'Unassigned') {
    assignedBtn.textContent = 'Assigned';
  } else if (assignedBtn.textContent === 'Assigned') {
    if (event.shiftKey) {
      assignedBtn.textContent = 'Collab';
    } else {
      assignedBtn.textContent = 'Unassigned';
    }
  } else if (assignedBtn.textContent === 'Collab') {
    assignedBtn.textContent = 'Assigned';
  }
}

function nextRound() {
  const servers = document.querySelectorAll('.server');
  let upServerCount = 0;

  servers.forEach(server => {
    const serverStatusBtn = server.querySelector('.server-status-btn');
    const fixTimeDisplay = server.querySelector('.fix-time span');
    const assignedBtn = server.querySelector('.assigned-btn');
 
    // Parse the Fix Time value to an integer before performing any arithmetic operations
    let fixTimeValue = parseInt(fixTimeDisplay.textContent);

    if (serverStatusBtn.textContent === 'DOWN' && fixTimeValue !== 0 && assignedBtn.textContent != 'Unassigned') {
      fixTimeValue = Math.max(fixTimeValue - (assignedBtn.textContent === 'Collab' ? 2 : 1), 0);
      fixTimeDisplay.textContent = fixTimeValue;
    }

    if (fixTimeValue === 0 && serverStatusBtn.textContent === 'DOWN') {
      serverStatusBtn.textContent = 'UP';
      serverStatusBtn.style.backgroundColor = 'green';
      server.style.backgroundColor = 'lightgreen';
      assignedBtn.textContent = 'Unassigned';
      fixTimeDisplay.textContent = fixTimeValue;
    }

    if (serverStatusBtn.textContent === 'UP') {
      upServerCount++;
    }

    // Update the Fix Time display with the corrected value
    // fixTimeDisplay.textContent = fixTimeValue;
  });

  score += 5 * upServerCount;
  document.getElementById('score').textContent = score;
  roundNumber++;
  // Update the "Rounds" counter
  document.getElementById('rounds').textContent = roundNumber;
}

function updateServerNumbers() {
  const serverBoxes = document.querySelectorAll('.server');
  serverBoxes.forEach((server, index) => {
    const serverNumberElement = document.createElement('div');
    serverNumberElement.className = 'server-number';
    serverNumberElement.textContent = `(#${index + 1})`;

    const serverNameElement = server.querySelector('.server-name');
    server.insertBefore(serverNumberElement, serverNameElement);
  });
}


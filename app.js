let roundNumber = 1;
let score = 0;

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


function toggleServerStatus(serverId) {
  const serverStatusBtn = document.getElementById(serverId).querySelector('.server-status-btn');
  const serverBox = document.getElementById(serverId);
  const fixTimeDisplay = document.getElementById(`fixTime${serverId.slice(-1)}`);
  
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
}


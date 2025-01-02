let roundNumber = 0;
let score = 0;
let rollbackCounter = 0;
let eventLog = [];
let suggestedServerNames = [
  "zerobox", "win2012r2", "redis", "orangehrm", "ns", "mail", "mysql", "mediawiki", "drupal", "win10-1", "win7-1", "samba", "freepbx", "linux-1", "linux-2", "win10-2"
];

const urlParams = new URLSearchParams(window.location.search);
const serverCount = validateServerCount(urlParams.get("servers"));
createServerBoxes(serverCount);
updateServerNumbers();

let scriptsCounter = validateScriptsCount(urlParams.get("scripts"));
updateScriptsCount(scriptsCounter);

function logEvent(event) {
  eventLog.push(`[${roundNumber}] ${event}`);
  const logContainer = document.getElementById("eventLog");
  const newEvent = document.createElement("div");
  newEvent.textContent = `[${roundNumber}] ${event}`;
  logContainer.appendChild(newEvent);
}

function performRollback() {
  if (score >= 150) {
    score -= 150;
    rollbackCounter++;
    document.getElementById("score").textContent = score;
    document.getElementById("rollbackCounter").textContent = rollbackCounter;
    logEvent("Rollback performed. 150 points deducted.");
  }
}

function useFixerScript() {
  if (scriptsCounter > 0) {
    scriptsCounter--;
    document.getElementById("scriptsCount").textContent = scriptsCounter;
    logEvent("Prepared script used to fix a server.");
  }
}

function updateScriptsCount(scriptCount) {
  document.getElementById("scriptsCount").textContent = scriptCount;
}

function enterServerName(serverId) {
  const serverName = prompt("Enter server name:");
  if (serverName) {
    document.getElementById(serverId).querySelector(".server-name").textContent = serverName;
    logEvent(`Server ${serverId} renamed to ${serverName}.`);
  }
}

function initializeServerStatus(serverId) {
  const serverStatusBtn = document.getElementById(serverId).querySelector(".server-status-btn");
  serverStatusBtn.textContent = "UP";
  serverStatusBtn.style.backgroundColor = "green";
}

function validateScriptsCount(scriptCount) {
  const parsedCount = parseInt(scriptCount);
  return isNaN(parsedCount) || parsedCount < 0 || parsedCount > 10 ? 3 : parsedCount;
}

function validateServerCount(serverCount) {
  const parsedCount = parseInt(serverCount);
  return isNaN(parsedCount) || parsedCount < 5 || parsedCount > 15 ? 5 : parsedCount;
}

function createServerBoxes(serverCount) {
  const statusBoard = document.getElementById("statusBoard");
  for (let i = 6; i <= serverCount; i++) {
    const serverDiv = document.createElement("div");
    serverDiv.className = "server";
    serverDiv.id = `server${i}`;

    serverDiv.innerHTML = `
      <div class="server-name" onclick="enterServerName('server${i}')">${suggestedServerNames[i]}</div>
      <button class="server-status-btn" onclick="toggleServerStatus('server${i}')">
        <i class="fas fa-check-circle"></i> UP
      </button>
      <div class="fix-time">Fix Time: <span id="fixTime${i}">-</span></div>
      <button class="assigned-btn" onclick="toggleAssignedStatus('server${i}')">Unassigned</button>
    `;

    statusBoard.appendChild(serverDiv);
  }
}

function toggleServerStatus(serverId) {
  const serverStatusBtn = document.getElementById(serverId).querySelector(".server-status-btn");
  const serverBox = document.getElementById(serverId);
  const fixTimeDisplay = document.getElementById(`fixTime${serverId.substr(6)}`);

  if (serverStatusBtn.textContent.includes("UP")) {
    serverStatusBtn.innerHTML = '<i class="fas fa-times-circle"></i> DOWN';
    serverStatusBtn.style.backgroundColor = "red";
    serverBox.style.backgroundColor = "red";
    fixTimeDisplay.textContent = Math.floor(Math.random() * 8) + 1;
    logEvent(`${serverId} taken DOWN.`);
  } else if (serverStatusBtn.textContent.includes("DOWN")) {
    if (event.shiftKey) {
      serverStatusBtn.innerHTML = '<i class="fas fa-bug"></i> BORKED';
      serverStatusBtn.style.backgroundColor = "black";
      fixTimeDisplay.textContent = 99;
      logEvent(`${serverId} BORKED.`);
    } else {
      serverStatusBtn.innerHTML = '<i class="fas fa-check-circle"></i> UP';
      serverStatusBtn.style.backgroundColor = "green";
      serverBox.style.backgroundColor = "lightgreen";
      fixTimeDisplay.textContent = "-";
      assignStatus(serverId, "Unassigned");
      logEvent(`${serverId} fixed and set to UP.`);
    }
  } else if (serverStatusBtn.textContent.includes("BORKED")) {
    serverStatusBtn.innerHTML = '<i class="fas fa-check-circle"></i> UP';
    serverStatusBtn.style.backgroundColor = "green";
    serverBox.style.backgroundColor = "lightgreen";
    fixTimeDisplay.textContent = "-";
    assignStatus(serverId, "Unassigned");
    logEvent(`${serverId} restored from BORKED to UP.`);
  }
}

function assignStatus(serverId, theStatus) {
  const assignedBtn = document.getElementById(serverId).querySelector(".assigned-btn");
  assignedBtn.textContent = theStatus;
}

function toggleAssignedStatus(serverId) {
  const assignedBtn = document.getElementById(serverId).querySelector(".assigned-btn");

  if (assignedBtn.textContent === "Unassigned") {
    assignedBtn.textContent = "Assigned";
    logEvent(`${serverId} assigned to a team member.`);
  } else if (assignedBtn.textContent === "Assigned") {
    if (event.shiftKey) {
      assignedBtn.textContent = "Collab";
      logEvent(`${serverId} set to collaboration mode.`);
    } else {
      assignedBtn.textContent = "Unassigned";
      logEvent(`${serverId} unassigned.`);
    }
  } else if (assignedBtn.textContent === "Collab") {
    assignedBtn.textContent = "Assigned";
    logEvent(`${serverId} set back to single assignment.`);
  }
}

function nextRound() {
  const servers = document.querySelectorAll(".server");
  let upServerCount = 0;

  servers.forEach(server => {
    const serverStatusBtn = server.querySelector(".server-status-btn");
    const fixTimeDisplay = server.querySelector(".fix-time span");
    const assignedBtn = server.querySelector(".assigned-btn");

    let fixTimeValue = parseInt(fixTimeDisplay.textContent);

    if (serverStatusBtn.textContent.includes("DOWN") && fixTimeValue !== 0 && assignedBtn.textContent !== "Unassigned") {
      fixTimeValue = Math.max(fixTimeValue - (assignedBtn.textContent === "Collab" ? 2 : 1), 0);
      fixTimeDisplay.textContent = fixTimeValue;
      if (fixTimeValue === 0) {
        serverStatusBtn.innerHTML = '<i class="fas fa-check-circle"></i> UP';
        serverStatusBtn.style.backgroundColor = "green";
        server.style.backgroundColor = "lightgreen";
        assignedBtn.textContent = "Unassigned";
        logEvent(`${server.id} fixed and set to UP.`);
      }
    }

    if (serverStatusBtn.textContent.includes("UP")) {
      upServerCount++;
    }
  });

  score += 5 * upServerCount;
  document.getElementById("score").textContent = score;
  roundNumber++;
  document.getElementById("rounds").textContent = roundNumber;
  logEvent(`Round ${roundNumber} completed. ${upServerCount} servers UP.`);
}

function updateServerNumbers() {
  const serverBoxes = document.querySelectorAll(".server");
  serverBoxes.forEach((server, index) => {
    const serverNumberElement = document.createElement("div");
    serverNumberElement.className = "server-number";
    serverNumberElement.textContent = `(#${index + 1})`;

    const serverNameElement = server.querySelector(".server-name");
    server.insertBefore(serverNumberElement, serverNameElement);
  });
}
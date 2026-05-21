javascript
const operativeContainer =
  document.getElementById("newOperatives");

async function loadOperatives() {

  operativeContainer.innerHTML =
    `<div class="operative-loading">
      Syncing newest operatives...
    </div>`;

  // =========================================
  // TRY CHESS.COM SDK FIRST
  // =========================================

  try {

    if(typeof Chesscom !== "undefined"){

      Chesscom.getClubMembers(
        "the-codex",
        {},
        function(data){

          renderOperatives(data);

        }
      );

      return;

    }

  }

  catch(err){

    console.log("SDK failed:", err);

  }

  // =========================================
  // FALLBACK TO FETCH API
  // =========================================

  try {

    const response = await fetch(
      "https://corsproxy.io/?https://api.chess.com/pub/club/the-codex/members"
    );

    if(!response.ok){

      throw new Error("Fetch failed");

    }

    const data = await response.json();

    renderOperatives(data);

  }

  catch(error){

    operativeContainer.innerHTML = `
      <div class="operative-error">
        Failed to synchronize operative network.
      </div>
    `;

    console.error(error);

  }

}

function renderOperatives(data){

  const allMembers = data.all_time || [];

  const latestMembers =
    [...allMembers]
    .sort((a,b) => b.joined - a.joined)
    .slice(0,3);

  operativeContainer.innerHTML = "";

  latestMembers.forEach(member => {

    const joinedDate =
      new Date(member.joined * 1000)
      .toLocaleDateString();

    operativeContainer.innerHTML += `

      <div class="operative-card">

        <div class="operative-top">

          <div>
            <div class="operative-name">
              ${member.username}
            </div>

            <div class="operative-rank">
              New Operative
            </div>
          </div>

          <div class="operative-icon">
            ⚡
          </div>

        </div>

        <div class="operative-joined">
          Joined: ${joinedDate}
        </div>

      </div>

    `;

  });

}

loadOperatives();

const clubUrl = "The-Codex";

const operativesContainer =
document.getElementById("new-operatives-list");

async function loadNewOperatives(){

  try{

    const response = await fetch(
      `https://api.chess.com/pub/club/${clubUrl}/members`
    );

    const data = await response.json();

    /* ONLY ALL MEMBERS */

    const members = data.all_time;

    /* SORT NEWEST FIRST */

    members.sort(
      (a,b) => b.joined - a.joined
    );

    /* LATEST 12 */

    const latestMembers =
      members.slice(0,12);

    operativesContainer.innerHTML = "";

    latestMembers.forEach(member => {

      const joinedDate =
        new Date(member.joined * 1000);

      const formattedDate =
        joinedDate.toLocaleDateString();

      operativesContainer.innerHTML += `

        <div class="operative-card">

          <div class="operative-name">
            ${member.username}
          </div>

          <div class="operative-date">
            Joined: ${formattedDate}
          </div>

          <a
            class="operative-btn"
            href="https://www.chess.com/member/${member.username}"
            target="_blank">

            OPEN OPERATIVE PROFILE

          </a>

        </div>

      `;

    });

  }

  catch(error){

    operativesContainer.innerHTML = `

      <div class="loading-operatives">

        Failed to sync Chess.com API

      </div>

    `;

    console.error(error);

  }

}

loadNewOperatives();

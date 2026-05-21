document.addEventListener("DOMContentLoaded", async () => {

  const memberContainer =
    document.getElementById("new-members-list");

  if(!memberContainer) return;

  try{

    const response = await fetch(
      "https://api.chess.com/pub/club/The-Codex/members"
    );

    const data = await response.json();

    const allMembers = data.all_time || [];

    // newest first
    const newestMembers = allMembers
      .sort((a,b) => b.joined - a.joined)
      .slice(0,3);

    memberContainer.innerHTML = "";

    newestMembers.forEach(member => {

      const joinedDate =
        new Date(member.joined * 1000)
        .toLocaleDateString();

      const avatar =
        `https://images.chesscomfiles.com/uploads/v1/user/\
${member.username}.jpg`;

      const card = document.createElement("div");

      card.className = "member-card";

      card.innerHTML = `

        <div class="member-left">

          <div class="member-avatar">

            <img
              src="https://www.chess.com/bundles/web/images/user-image.007dad08.svg"
              alt="${member.username}">

          </div>

          <div class="member-info">

            <div class="member-name">
              ${member.username}
            </div>

            <div class="member-date">
              Joined ${joinedDate}
            </div>

          </div>

        </div>

        <a
          class="member-profile"
          href="https://www.chess.com/member/${member.username}"
          target="_blank">

          PROFILE

        </a>
      `;

      memberContainer.appendChild(card);

    });

  }
  catch(error){

    console.error(error);

    memberContainer.innerHTML = `

      <div class="member-loading">

        Unable to sync operatives.

      </div>

    `;
  }

});

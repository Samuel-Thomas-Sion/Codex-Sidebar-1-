async function loadNewestMembers() {

  const container =
    document.getElementById("new-members-list");

  try {

    const response = await fetch(
      "https://api.chess.com/pub/club/the-codex/members"
    );

    if(!response.ok){
      throw new Error("API failed");
    }

    const data = await response.json();

    const allMembers = [
      ...data.weekly,
      ...data.monthly,
      ...data.all_time
    ];

    /* REMOVE DUPLICATES */

    const uniqueMembers =
      Array.from(
        new Map(
          allMembers.map(member =>
            [member.username, member]
          )
        ).values()
      );

    /* SORT NEWEST FIRST */

    uniqueMembers.sort(
      (a,b) => b.joined - a.joined
    );

    /* TOP 3 */

    const newest =
      uniqueMembers.slice(0,3);

    container.innerHTML = "";

    newest.forEach((member,index)=>{

      const joinedDate =
        new Date(member.joined * 1000)
        .toLocaleDateString();

      container.innerHTML += `

        <div class="member-card">

          <div class="member-top">

            <div class="member-name">
              ${member.username}
            </div>

            <div class="member-badge">
              #${index + 1}
            </div>

          </div>

          <div class="member-joined">
            Joined: ${joinedDate}
          </div>

          <a
            class="member-btn"
            href="https://www.chess.com/member/${member.username}"
            target="_blank">

            VIEW OPERATIVE

          </a>

        </div>

      `;

    });

  }

  catch(error){

    console.error(error);

    container.innerHTML = `

      <div class="member-error">

        Failed to sync operative database.

      </div>

    `;

  }

}

loadNewestMembers();

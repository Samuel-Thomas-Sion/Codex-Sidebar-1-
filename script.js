```javascript
const operativeContainer = document.getElementById("operative-list");

async function loadOperatives() {

  try {

    const response = await fetch(
      "https://api.chess.com/pub/club/the-codex/members"
    );

    const data = await response.json();

    const allMembers = [
      ...data.weekly,
      ...data.monthly,
      ...data.all_time
    ];

    // Remove duplicates
    const uniqueMembers = [];

    const usernames = new Set();

    allMembers.forEach(member => {

      if (!usernames.has(member.username)) {

        usernames.add(member.username);

        uniqueMembers.push(member);

      }

    });

    // Sort newest first
    uniqueMembers.sort((a, b) => b.joined - a.joined);

    // Take top 3 newest
    const newest = uniqueMembers.slice(0, 3);

    operativeContainer.innerHTML = "";

    newest.forEach(member => {

      const joinDate = new Date(
        member.joined * 1000
      ).toLocaleDateString();

      operativeContainer.innerHTML += `
        <div class="operative-card">

          <div class="operative-top">

            <div class="operative-avatar">
              ⚡
            </div>

            <div>

              <div class="operative-name">
                ${member.username}
              </div>

              <div class="operative-date">
                Joined ${joinDate}
              </div>

            </div>

          </div>

          <a
            class="operative-btn"
            href="https://www.chess.com/member/${member.username}"
            target="_blank"
          >
            VIEW PROFILE
          </a>

        </div>
      `;

    });

  }

  catch(error) {

    console.error(error);

    operativeContainer.innerHTML = `
      <div class="operative-error">
        Failed to sync operative database.
      </div>
    `;

  }

}

loadOperatives();
```


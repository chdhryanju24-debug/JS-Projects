const searchButton = document.getElementById("searchButton");
const searchInput = document.getElementById("searchInput");
const profileContainer = document.getElementById("profileContainer");

// Search button click event
searchButton.addEventListener("click", () => {
    const username = searchInput.value.trim();

    if (username === "") {
        profileContainer.innerHTML = `<p>Please enter a GitHub username.</p>`;
        return;
    }

    fetchGitHubProfile(username);
});

// Fetch GitHub profile data
async function fetchGitHubProfile(username) {
    profileContainer.innerHTML = `<p>Loading...</p>`;

    try {
        const response = await fetch(`https://api.github.com/users/${username}`);

        // If user not found
        if (!response.ok) {
            throw new Error("User not found");
        }

        const data = await response.json();

        // Display profile data
        profileContainer.innerHTML = `
            <div class="profile-card">
                <img src="${data.avatar_url}" alt="${data.login}" width="150">
                
                <h2>${data.name || data.login}</h2>
                
                <p>${data.bio || "No bio available"}</p>

                <p><strong>Followers:</strong> ${data.followers}</p>
                <p><strong>Following:</strong> ${data.following}</p>
                <p><strong>Public Repositories:</strong> ${data.public_repos}</p>

                <a href="${data.html_url}" target="_blank">
                    Visit GitHub Profile
                </a>
            </div>
        `;
    } catch (error) {
        profileContainer.innerHTML = `
            <p style="color:red;">${error.message}</p>
        `;
    }
}
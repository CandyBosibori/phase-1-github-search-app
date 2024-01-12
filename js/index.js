document.getElementById('github-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('search').value;

    // Search for users
    searchUsers(username);
});

function searchUsers(username) {
    const apiUrl = `https://api.github.com/search/users?q=${username}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayUsers(data.items);
        })
        .catch(error => console.error('Error:', error));
}

function displayUsers(users) {
    const userList = document.getElementById('user-list');
    const reposList = document.getElementById('repos-list');

    // Clear previous results
    userList.innerHTML = '';
    reposList.innerHTML = '';

    users.forEach(user => {
        const userItem = document.createElement('li');
        userItem.innerHTML = `
            <img src="${user.avatar_url}" alt="${user.login}" style="width: 50px; height: 50px;">
            <p>Username: ${user.login}</p>
            <a href="${user.html_url}" target="_blank">Profile</a>
        `;

        userItem.addEventListener('click', function () {
            // When a user is clicked, fetch and display their repositories
            getUserRepositories(user.login);
        });

        userList.appendChild(userItem);
    });
}

function getUserRepositories(username) {
    const apiUrl = `https://api.github.com/users/${username}/repos`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(repos => {
            displayRepositories(repos);
        })
        .catch(error => console.error('Error:', error));
}

function displayRepositories(repositories) {
    const reposList = document.getElementById('repos-list');
    
    // Clear previous repositories
    reposList.innerHTML = '';

    repositories.forEach(repo => {
        const repoItem = document.createElement('li');
        repoItem.innerHTML = `
            <p><strong>Repository:</strong> ${repo.name}</p>
            <p><strong>Description:</strong> ${repo.description || 'N/A'}</p>
            <p><strong>Language:</strong> ${repo.language || 'N/A'}</p>
            <p><strong>URL:</strong> <a href="${repo.html_url}" target="_blank">${repo.html_url}</a></p>
            <hr>
        `;

        reposList.appendChild(repoItem);
    });
}

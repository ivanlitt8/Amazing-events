export function fetchPosts() {
    return fetch('https://mindhub-xj03.onrender.com/api/amazing')
        .then(response => response.json())
        .catch(error => console.error(error));
}
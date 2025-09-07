const output = document.getElementById('posts-container');
const button = document.getElementById('get-posts');

button.addEventListener('click', showPosts);

async function showPosts(){
    const res = await fetch('http://127.0.0.1:2025/api/posts');

    if(!res.ok) {
        throw new Error('Posts not found');
    }

    const posts = await res.json();
    output.innerHTML = '';

    posts.forEach(post => {
        const postEl = document.createElement('div');
        postEl.textContent = post.title;
        output.appendChild(postEl);
    });
}
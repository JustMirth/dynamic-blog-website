function loadBlogPosts() {
    const postList = document.getElementById('post-list');
    const posts = JSON.parse(localStorage.getItem('posts')) || [];

    if (posts.length === 0) {
        postList.innerHTML = '<p>No posts available. Create a new post!</p>';
    } else {
        postList.innerHTML = '';
        posts.forEach((post, index) => {
            const postElement = document.createElement('div');
            postElement.classList.add('post');
            postElement.innerHTML = `
                <h3><a href="post.html?id=${index}">${post.title}</a></h3>
                <p>${post.content}</p>
                ${post.imageUrl ? `<img src="${post.imageUrl}" alt="Post Image" class="post-image" />` : ''}
            `;
            postList.appendChild(postElement);
        });
    }
}

window.onload = loadBlogPosts;
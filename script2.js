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
                <p>${post.content}...</p>
            `;
            postList.appendChild(postElement);
        });
    }
}

function saveNewPost(title, content, imageUrl) {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    const newPost = {
        title,
        content,
        imageUrl: imageUrl || '',
    };
    posts.push(newPost);
    localStorage.setItem('posts', JSON.stringify(posts));
}

document.getElementById('create-post-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const title = document.getElementById('title').value.trim();
    const content = document.getElementById('content').value.trim();
    const image = document.getElementById('image').value.trim();

    if (title === '' || content === '') {
        alert('Title and content are required!');
        return;
    }

    saveNewPost(title, content, image);

    window.location.href = 'index.html';
});
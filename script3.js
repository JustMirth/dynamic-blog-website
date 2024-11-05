function loadPost() {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');
    const posts = JSON.parse(localStorage.getItem('posts')) || [];

    if (postId === null || postId < 0 || postId >= posts.length) {
        alert('Post not found!');
        window.location.href = 'index.html';
        return;
    }

    const post = posts[postId];

    document.getElementById('post-title').textContent = post.title;
    document.getElementById('post-content').textContent = post.content;

    document.getElementById('edit-title').value = post.title;
    document.getElementById('edit-content').value = post.content;
    document.getElementById('edit-image').value = post.imageUrl || '';

    document.getElementById('edit-form').style.display = 'flex';
    document.getElementById('edit-form').style.flexDirection = 'column';
    document.getElementById('edit-form').style.alignItems = 'center';
    document.getElementById('edit-form').style.justifyContent = 'center';
    
    document.getElementById('delete-btn').style.display = 'inline-block';

    document.getElementById('delete-btn').addEventListener('click', function () {
        deletePost(postId);
    });

    document.getElementById('edit-post-form').addEventListener('submit', function (e) {
        e.preventDefault();
        editPost(postId);
    });
}

function editPost(postId) {
    const title = document.getElementById('edit-title').value.trim();
    const content = document.getElementById('edit-content').value.trim();
    const imageUrl = document.getElementById('edit-image').value.trim();

    if (title === '' || content === '') {
        alert('Title and content are required!');
        return;
    }

    const posts = JSON.parse(localStorage.getItem('posts')) || [];

    posts[postId] = {
        title,
        content,
        imageUrl: imageUrl || '',
    };

    localStorage.setItem('posts', JSON.stringify(posts));

    window.location.reload();
}

function deletePost(postId) {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];

    posts.splice(postId, 1);

    localStorage.setItem('posts', JSON.stringify(posts));

    window.location.href = 'index.html';
}

window.onload = loadPost;
function loadPost() {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');
    const posts = JSON.parse(localStorage.getItem('posts')) || [];

    // Check if the post ID is valid
    if (postId === null || postId < 0 || postId >= posts.length) {
        alert('Post not found!');
        window.location.href = 'index.html';  // Redirect to homepage if invalid
        return;
    }

    const post = posts[postId];

    // Display the post details on the page
    document.getElementById('post-title').textContent = post.title;
    document.getElementById('post-content').textContent = post.content;

    // Set up the edit form with the current post details
    document.getElementById('edit-title').value = post.title;
    document.getElementById('edit-content').value = post.content;
    document.getElementById('edit-image').value = post.imageUrl || '';

    // Show the edit form and delete button
    document.getElementById('edit-form').style.display = 'block';
    document.getElementById('delete-btn').style.display = 'inline-block';

    // Event listener for the delete button
    document.getElementById('delete-btn').addEventListener('click', function () {
        deletePost(postId);
    });

    // Event listener for the edit form submission
    document.getElementById('edit-post-form').addEventListener('submit', function (e) {
        e.preventDefault();
        editPost(postId);
    });
}

// Function to edit a post and save changes to local storage
function editPost(postId) {
    const title = document.getElementById('edit-title').value.trim();
    const content = document.getElementById('edit-content').value.trim();
    const imageUrl = document.getElementById('edit-image').value.trim();

    // Validate input
    if (title === '' || content === '') {
        alert('Title and content are required!');
        return;
    }

    const posts = JSON.parse(localStorage.getItem('posts')) || [];

    // Update the post in the array
    posts[postId] = {
        title,
        content,
        imageUrl: imageUrl || '',  // Optional image URL
    };

    // Save the updated posts array to local storage
    localStorage.setItem('posts', JSON.stringify(posts));

    // Reload the page to display the updated post
    window.location.reload();
}

// Function to delete a post from local storage
function deletePost(postId) {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];

    // Remove the post from the array
    posts.splice(postId, 1);

    // Save the updated posts array to local storage
    localStorage.setItem('posts', JSON.stringify(posts));

    // Redirect to homepage after deletion
    window.location.href = 'index.html';
}

// Call loadPost when the page loads
window.onload = loadPost;
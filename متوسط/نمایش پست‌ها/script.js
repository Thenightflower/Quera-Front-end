const fetchPosts = async () => {
    try {
        const res = await fetch('http://localhost:3000/posts');
        const data = await res.json();

        const postList = document.getElementById('post-list');

        postList.innerHTML = data.map(d => (
            `
          <li>
            <h3>${d.title}</h3>
            <p>${d.body}</p>
            <em>شماره ${d.id}</em>
          </li>
        `)
        )
            .join(''); 
    } catch (error) {
        console.error('خطا در دریافت پست‌ها:', error);
    }
};

fetchPosts();

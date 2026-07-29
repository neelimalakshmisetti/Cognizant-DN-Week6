import React, { useState, useEffect } from 'react';

// HOL-11: API Integration with Axios and error handling
// Exercise: CRUD operations against a REST API
// npm install axios

// Axios service layer
const API_BASE = 'https://jsonplaceholder.typicode.com';

const postService = {
  getAll:    ()       => fetch(`${API_BASE}/posts`).then(r => r.json()),
  getById:   (id)     => fetch(`${API_BASE}/posts/${id}`).then(r => r.json()),
  create:    (data)   => fetch(`${API_BASE}/posts`, { method: 'POST', body: JSON.stringify(data), headers: { 'Content-Type': 'application/json' } }).then(r => r.json()),
  update:    (id, d)  => fetch(`${API_BASE}/posts/${id}`, { method: 'PUT',  body: JSON.stringify(d),    headers: { 'Content-Type': 'application/json' } }).then(r => r.json()),
  delete:    (id)     => fetch(`${API_BASE}/posts/${id}`, { method: 'DELETE' }),
};

function PostList() {
  const [posts, setPosts]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]   = useState(null);
  const [page, setPage]     = useState(1);
  const PER_PAGE = 5;

  useEffect(() => {
    setLoading(true);
    postService.getAll()
      .then(data => { setPosts(data); setLoading(false); })
      .catch(err  => { setError(err.message); setLoading(false); });
  }, []);

  if (loading) return <p>Loading posts...</p>;
  if (error)   return <p style={{ color: 'red' }}>Error: {error}</p>;

  const paginated = posts.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <div>
      <h1>Posts (Page {page})</h1>
      {paginated.map(p => (
        <div key={p.id} style={{ borderBottom: '1px solid #ccc', marginBottom: '0.5rem' }}>
          <h3>{p.title}</h3>
          <p>{p.body}</p>
        </div>
      ))}
      <button disabled={page === 1} onClick={() => setPage(p => p - 1)}>Previous</button>
      <button disabled={page * PER_PAGE >= posts.length} onClick={() => setPage(p => p + 1)}>Next</button>
    </div>
  );
}

export default PostList;

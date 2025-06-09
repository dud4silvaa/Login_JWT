async function getPosts() {
  const token = localStorage.getItem('token');
  if (!token) {
    return window.location.href = 'login.html';
  }

  try {
    const res = await fetch('http://localhost:3000/posts', {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (res.status === 401) {
      throw new Error('Token inválido ou expirado');
    }

    if (!res.ok) {
      throw new Error('Erro ao carregar posts');
    }

    const posts = await res.json();

    const container = document.getElementById('postList');
    if (!container) {
      console.error('Elemento com id "postList" não encontrado no HTML!');
      return;
    }

    container.innerHTML = '';

    posts.forEach(post => {
      const date = new Date(post.date);
      const formattedDate = isNaN(date) ? 'Data inválida' : date.toLocaleDateString();

      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <h3>${post.title}</h3>
        <p>${post.summary}</p>
        <small>${formattedDate}</small>
      `;

      container.appendChild(card);
    });

  } catch (err) {
    alert('Erro: ' + err.message);
    localStorage.removeItem('token');
    window.location.href = 'login.html';
  }
}

function logout() {
  localStorage.removeItem('token');
  window.location.href = 'login.html';
}

window.onload = getPosts;
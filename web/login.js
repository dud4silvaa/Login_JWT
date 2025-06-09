async function login() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const res = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
   body: JSON.stringify({ user: email, psw: password })

    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || 'Erro no login');
    }

    const data = await res.json();
    console.log(data);

    localStorage.setItem('token', data.token);
    window.location.href = 'home.html';
  } catch (err) {
    alert('Login falhou: ' + err.message);
  }
}

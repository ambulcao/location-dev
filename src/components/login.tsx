import React, { useState } from 'react';

function Login({ history }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Fazer uma chamada AJAX para o arquivo PHP
    fetch('caminho-para-seu-arquivo-php.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // Se o login for bem-sucedido, redirecione para a página do mapa
          history.push('/mapa');
        } else {
          alert(data.message);
        }
      })
      .catch((error) => {
        console.error('Erro ao fazer login:', error);
      });
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Usuário"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Entrar</button>
    </div>
  );
}

export default Login;

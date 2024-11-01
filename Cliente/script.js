loginButton.addEventListener('click', (event) => {
    event.preventDefault(); // Impede o envio do formulário

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!email || !password) {
        errorMessage.innerText = "Não pode deixar em branco";
        errorMessage.style.display = "block";
    } else {
        errorMessage.style.display = "none";

        // Verificação de login
        if (email === usuario.email && password === usuario.senha) {
            // Simulação de login bem-sucedido
            sessionStorage.setItem('loggedIn', true); // Armazena o estado de login
            sessionStorage.setItem('userName', usuario.nome); // Armazena o nome do usuário
            window.location.href = './index.html'; // Redireciona para a página principal
        } else {
            errorMessage.innerText = "E-mail ou senha incorretos";
            errorMessage.style.display = "block";
        }
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('container');
    const registerBtn = document.getElementById('register');
    const loginBtn = document.getElementById('login');
    const loginButton = document.getElementById('loginBtn');
    const errorMessage = document.getElementById('error-message');

    registerBtn.addEventListener('click', () => {
        container.classList.add("active");
    });

    loginBtn.addEventListener('click', () => {
        container.classList.remove("active");
    });

    loginButton.addEventListener('click', () => {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if (!email || !password) {
            errorMessage.innerText = "Não pode deixar em branco";
            errorMessage.style.display = "block";
        } else {
            errorMessage.style.display = "none";
            // Lógica para login, caso ambos os campos estejam preenchidos
        }
    });
});

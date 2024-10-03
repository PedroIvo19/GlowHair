const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');
const formCadastro = document.getElementById('formCadastro');
const formLogin = document.getElementById('formLogin');

// Alternar entre as telas de login e registro
registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

// Redirecionar após cadastro
formCadastro.addEventListener('submit', (e) => {
    e.preventDefault();  // Prevenir comportamento padrão de recarregar a página
    window.location.href = "index.html";  // Redirecionar para a página inicial
});

// Redirecionar após login
formLogin.addEventListener('submit', (e) => {
    e.preventDefault();  // Prevenir comportamento padrão de recarregar a página
    window.location.href = "../index.html";  // Redirecionar para a página inicial
});


function logar(){

    var email = document.getElementById('E-mail').value;
    var senha = document.getElementById('Senha').value;

    if(login == "admin" && "admin"){
        alert('Sucesso')
    }


}




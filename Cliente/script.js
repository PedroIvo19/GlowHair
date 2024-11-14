loginButton.addEventListener('click', (event) => {
    event.preventDefault(); // Impede o envio do formulário

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!email || !password) {
        errorMessage.innerText = "Campos Vazios";
        errorMessage.style.display = "block";
    } else {
        errorMessage.style.display = "none";

       
}})
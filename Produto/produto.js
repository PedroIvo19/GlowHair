// JavaScript para manipular a exibição das seções e tabs

// Seleciona os botões e conteúdos dos tabs
const benefitsBtn = document.getElementById('benefits-btn');
const howToUseBtn = document.getElementById('how-to-use-btn');
const benefitsContent = document.getElementById('benefits-content');
const howToUseContent = document.getElementById('how-to-use-content');

// Evento para exibir conteúdo de Benefícios
benefitsBtn.addEventListener('click', () => {
    benefitsContent.classList.add('active');
    howToUseContent.classList.remove('active');
    benefitsBtn.classList.add('active');
    howToUseBtn.classList.remove('active');
});

// Evento para exibir conteúdo de Como Usar
howToUseBtn.addEventListener('click', () => {
    benefitsContent.classList.remove('active');
    howToUseContent.classList.add('active');
    benefitsBtn.classList.remove('active');
    howToUseBtn.classList.add('active');
});

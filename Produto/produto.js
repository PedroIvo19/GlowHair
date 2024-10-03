function showContent(tab) {
    // Remove a classe 'active' de todas as tabs
    document.querySelectorAll('.tab').forEach(button => {
        button.classList.remove('active');
    });

    // Remove a classe 'active' de todos os conteúdos
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });

    // Adiciona a classe 'active' na tab e no conteúdo correspondente
    document.getElementById(tab).classList.add('active');
    document.getElementById(`content-${tab}`).classList.add('active');
}

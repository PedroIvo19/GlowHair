function filtrarProdutos(categoria) {
    const produtos = document.querySelectorAll('.card');

    produtos.forEach(produto => {
        // Se o produto contém a categoria selecionada, ele é exibido, senão é ocultado
        if (produto.classList.contains(categoria)) {
            produto.style.display = 'block';
        } else {
            produto.style.display = 'none';
        }
    });
}

function filtrarProdutos(filtro) {
    const cards = document.querySelectorAll('.card');
    let algumProdutoEncontrado = false;

    cards.forEach(card => {
        const problema = card.getAttribute('data-problema');
        const tipo = card.getAttribute('data-tipo');

        if (problema === filtro || tipo === filtro) {
            card.style.display = 'block';
            algumProdutoEncontrado = true;
        } else {
            card.style.display = 'none';
        }
    });

    if (!algumProdutoEncontrado) {
        alert('Nenhum produto encontrado para esse filtro.');
    }
}




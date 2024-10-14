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

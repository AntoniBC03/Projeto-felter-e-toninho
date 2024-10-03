// Obter os elementos da modal e os botões de fechar
const modal = document.getElementById('merchantModal');
const closeBtn = document.querySelector('.close-btn');

// Função para abrir a modal
function openModal(merchantCard) {
    const name = merchantCard.getAttribute('data-name');
    const address = merchantCard.getAttribute('data-address');
    const phone = merchantCard.getAttribute('data-phone');
    const products = JSON.parse(merchantCard.getAttribute('data-products'));

    document.getElementById('modalName').textContent = name;
    document.getElementById('modalAddress').textContent = address;
    document.getElementById('modalPhone').textContent = phone;

    const productList = document.getElementById('modalProducts');
    productList.innerHTML = ''; // Limpar a lista existente

    products.forEach(product => {
        const li = document.createElement('li');
        li.innerHTML = `<span>${product.name}</span>: ${product.quantity} unidades`;
        productList.appendChild(li);
    });

    modal.style.display = 'flex';
}

// Adicionar evento de clique a todos os cartões de comerciantes
document.querySelectorAll('.merchant-card').forEach(card => {
    card.addEventListener('click', () => openModal(card));
});

// Adicionar evento de clique para fechar a modal
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Fechar a modal ao clicar fora dela
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});
function openModal(merchant) {
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');

    const products = {
        comerciante1: [
            { nome: 'Produto A', quantidade: 10, preco: 'R$ 20,00' },
            { nome: 'Produto B', quantidade: 5, preco: 'R$ 30,00' }
        ],
        comerciante2: [
            { nome: 'Produto C', quantidade: 2, preco: 'R$ 15,00' },
            { nome: 'Produto D', quantidade: 8, preco: 'R$ 25,00' }
        ]
    };

    modalTitle.innerText = `Produtos de ${merchant.replace('comerciante', 'Comerciante ')}`;
    modalBody.innerHTML = products[merchant].map(product => `
        <div class="product-item">
            <span>${product.nome}</span>
            <span>${product.quantidade}</span>
            <span>${product.preco}</span>
        </div>
    `).join('');

    document.getElementById('modal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

function openAddMerchantModal() {
    document.getElementById('add-merchant-modal').style.display = 'flex';
}

function closeAddMerchantModal() {
    document.getElementById('add-merchant-modal').style.display = 'none';
}

document.getElementById('merchant-form').onsubmit = function(event) {
    event.preventDefault();
    const name = document.getElementById('merchant-name').value;
    const cnpj = document.getElementById('merchant-cnpj').value;
    const address = document.getElementById('merchant-address').value;

    const login = cnpj.replace(/\D/g, '') + "@example.com";
    const password = Math.random().toString(36).slice(-8);

    const merchantList = document.getElementById('merchant-list');
    const newMerchantCard = document.createElement('div');
    newMerchantCard.className = 'merchant-card';
    newMerchantCard.onclick = function() { openModal('comerciante' + (merchantList.children.length + 1)); };
    newMerchantCard.innerHTML = `
        <img src="path/to/placeholder.jpg" alt="${name}">
        <h2>${name}</h2>
        <p>Endereço: ${address}</p>
    `;
    merchantList.appendChild(newMerchantCard);

    document.getElementById('merchant-form').reset();
    closeAddMerchantModal();
    alert(`Novo comerciante adicionado!\nLogin: ${login}\nSenha: ${password}`);
};

// scripts/modal.js
let generatedToken = '';

function openModal() {
    const modal = document.getElementById('myModal');
    if (modal) {
        modal.style.display = 'block';
    } else {
        console.error('Modal não encontrada!');
    }
}

function closeModal() {
    const modal = document.getElementById('myModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function requestToken() {
    generatedToken = Math.random().toString(36).substr(2, 9).toUpperCase();
    alert('Token solicitado e enviado por e-mail: ' + generatedToken);
}

window.onclick = function(event) {
    const modal = document.getElementById('myModal');
    if (modal && event.target == modal) {
        closeModal();
    }
}
document.addEventListener('DOMContentLoaded', () => {
    const merchantCards = document.querySelectorAll('.merchant-card');
    const modal = document.getElementById('merchantModal');
    const closeBtn = modal.querySelector('.close');
    const modalName = document.getElementById('modalName');
    const modalAddress = document.getElementById('modalAddress');
    const modalPhone = document.getElementById('modalPhone');
    const modalProducts = document.getElementById('modalProducts');

    merchantCards.forEach(card => {
        card.addEventListener('click', () => {
            const name = card.getAttribute('data-name');
            const address = card.getAttribute('data-address');
            const phone = card.getAttribute('data-phone');
            const products = JSON.parse(card.getAttribute('data-products'));

            modalName.textContent = name;
            modalAddress.textContent = address;
            modalPhone.textContent = phone;

            modalProducts.innerHTML = '';
            products.forEach(product => {
                const li = document.createElement('li');
                li.innerHTML = `<span>${product.name}:</span> ${product.quantity} unidades, R$ ${product.price.toFixed(2)}`;
                modalProducts.appendChild(li);
            });

            modal.style.display = 'flex';
        });
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});

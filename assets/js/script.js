// CONFIGURAÇÕES
const PHONE_NUMBER = "5562985407058"; // COLOQUE SEU NÚMERO AQUI (DDD + NÚMERO, apenas números)

// Variáveis globais
let cart = [];
let currentItem = {};

// 1. Lógica do Horário de Funcionamento
function checkStatus() {
    const now = new Date();
    const day = now.getDay(); // 0 = Domingo, 1 = Segunda, ..., 6 = Sábado
    const hour = now.getHours();
    const minute = now.getMinutes();

    const dot = document.getElementById('statusDot');
    const text = document.getElementById('statusText');

    let isOpen = false;

    // Segunda (1) a Sexta (5): 07:00 as 17:00
    if (day >= 1 && day <= 5) {
        if (hour >= 7 && hour < 17) isOpen = true;
    }
    // Sábado (6): 08:00 as 13:00
    else if (day === 6) {
        if (hour >= 8 && hour < 13) isOpen = true;
    }

    if (isOpen) {
        dot.classList.remove('closed');
        dot.classList.add('open');
        text.innerText = "Estamos Abertos • Somente com hora marcada";
    } else {
        dot.classList.remove('open');
        dot.classList.add('closed');
        text.innerText = "Fechado agora • Somente com hora marcada";
    }
}

// Rodar verificação de horário ao carregar
checkStatus();

// 2. Lógica do Modal
function openModal(title, desc, price) {
    currentItem = { title, price }; // Salva o item atual

    document.getElementById('modalTitle').innerText = title;
    document.getElementById('modalDesc').innerText = desc;
    document.getElementById('modalPrice').innerText = price;

    document.getElementById('modalOverlay').style.display = 'flex';
}

function closeModal() {
    document.getElementById('modalOverlay').style.display = 'none';
}

// Fechar modal se clicar fora
document.getElementById('modalOverlay').addEventListener('click', function (e) {
    if (e.target === this) closeModal();
});

// 3. Lógica do "Carrinho" e WhatsApp
function addToCart() {
    cart.push(currentItem.title);
    updateCartCount();
    closeModal();
    alert("Adicionado! Você pode escolher mais itens ou clicar em 'Agendar no WhatsApp' lá embaixo.");
}

function updateCartCount() {
    const countSpan = document.getElementById('cartCount');
    if (cart.length > 0) {
        countSpan.style.display = 'inline-block';
        countSpan.innerText = cart.length;
    }
}

function directToWhatsapp() {
    // Envia apenas o item atual
    const msg = `Olá, Juliana Beauty Boss! Gostaria de saber mais sobre: ${currentItem.title}`;
    window.open(`https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
}

function finalizeOrder(event) {
    // Se o carrinho estiver vazio, manda mensagem genérica
    if (cart.length === 0) {
        // Deixa o link normal funcionar (href="#") ou abre msg generica
        event.preventDefault();
        const msg = "Olá! Gostaria de agendar um horário.";
        window.open(`https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
        return;
    }

    event.preventDefault();
    const itemsList = cart.join(', ');
    const msg = `Olá! Gostaria de agendar os seguintes procedimentos/cursos: ${itemsList}`;
    window.open(`https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
}

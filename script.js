// Dati dei luoghi - PERSONALIZZA QUESTI!
const memories = {
    1: {
        title: "Il Nostro Primo Incontro",
        text: "Quel giorno in cui i nostri sguardi si sono incrociati per la prima volta... chi avrebbe mai detto che sarebbe stato l'inizio di tutto questo?",
        emoji: "🌟"
    },
    2: {
        title: "Il Primo Bacio",
        text: "Il momento in cui il tempo si è fermato. Ancora adesso sento le farfalle nello stomaco quando ci penso.",
        emoji: "💋"
    },
    3: {
        title: "La Nostra Avventura",
        text: "Quel viaggio indimenticabile dove abbiamo riso, sognato e capito che insieme possiamo andare ovunque.",
        emoji: "✈️"
    }
};

// Password per ogni sezione segreta - CAMBIA QUESTE DATE!
const passwords = {
    1: "14/02/2024",  // Cambia con una data importante per voi
    2: "25/12/2023",  // Cambia con un'altra data speciale
    3: "01/01/2024"   // Cambia con un'altra data significativa
};

// Hint per le password
const hints = {
    1: "💝 Il giorno del nostro primo appuntamento",
    2: "🎄 Quando ci siamo detti 'ti amo' per la prima volta",
    3: "🎉 Il giorno che abbiamo deciso di stare insieme per sempre"
};

let currentSecretTarget = 1;

// Crea cuori fluttuanti all'avvio
window.addEventListener('load', () => {
    createFloatingHearts();
    setInterval(createFloatingHearts, 3000);
});

function createFloatingHearts() {
    const container = document.getElementById('heartsContainer');
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.innerHTML = '❤️';
    heart.style.left = Math.random() * 100 + '%';
    heart.style.animationDuration = (Math.random() * 3 + 5) + 's';
    heart.style.fontSize = (Math.random() * 10 + 15) + 'px';
    container.appendChild(heart);
    
    setTimeout(() => heart.remove(), 8000);
}

// Navigazione
function startJourney() {
    showPage('mapPage');
}

function goHome() {
    showPage('homePage');
}

function backToMap() {
    showPage('mapPage');
}

function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
}

// Mostra memoria del luogo
function showMemory(locationId) {
    const memory = memories[locationId];
    document.getElementById('memoryTitle').textContent = memory.title;
    document.getElementById('memoryImage').textContent = memory.emoji;
    document.getElementById('memoryText').textContent = memory.text;
    document.getElementById('memoryModal').classList.add('active');
}

function closeMemory() {
    document.getElementById('memoryModal').classList.remove('active');
}

// Sistema password per sezioni segrete
function showSecretPrompt() {
    currentSecretTarget = 1;
    openPasswordPrompt(1);
}

function promptSecret(secretNumber) {
    currentSecretTarget = secretNumber;
    openPasswordPrompt(secretNumber);
}

function openPasswordPrompt(secretNumber) {
    document.getElementById('passwordHint').textContent = hints[secretNumber];
    document.getElementById('passwordInput').value = '';
    document.getElementById('passwordError').textContent = '';
    document.getElementById('passwordModal').classList.add('active');
}

function closePasswordModal() {
    document.getElementById('passwordModal').classList.remove('active');
}

function checkPassword() {
    const input = document.getElementById('passwordInput').value.trim();
    const correctPassword = passwords[currentSecretTarget];
    
    if (input === correctPassword) {
        closePasswordModal();
        showPage('secretPage' + currentSecretTarget);
        celebrateUnlock();
    } else {
        document.getElementById('passwordError').textContent = '❌ Password errata. Riprova!';
        document.getElementById('passwordInput').value = '';
    }
}

// Animazione di celebrazione quando si sblocca un segreto
function celebrateUnlock() {
    for (let i = 0; i < 20; i++) {
        setTimeout(() => createFloatingHearts(), i * 100);
    }
}

// Permetti invio con Enter
document.addEventListener('DOMContentLoaded', () => {
    const passwordInput = document.getElementById('passwordInput');
    if (passwordInput) {
        passwordInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                checkPassword();
            }
        });
    }
    
    // Chiudi modal cliccando fuori
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    });
});

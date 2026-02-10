const preguntas = [
    "¿Te gusta organizar tus actividades para aprovechar mejor el tiempo?",
    "¿Sueles buscar soluciones prácticas a problemas cotidianos?",
    "¿Te siente cómodo trabajando en equipo y coordinando personas?",
    "¿Te interesa saber cómo las empresas pueden reducir desperdicios?",
    "¿Prefieres el orden y la lógica sobre el caos?",
    "¿Te motiva la idea de dirigir proyectos a gran escala?",
    "¿Eres curioso sobre cómo se fabrican los productos tecnológicos?",
    "¿Te gusta analizar datos o números para entender una situación?",
    "¿Crees que siempre hay una forma mejor de hacer las cosas?",
    "¿Te visualizas como un líder que toma decisiones importantes?"
];

let pasoActual = 0;
let puntajeTotal = 0;
let perfilAsignado = "";

function startQuiz() {
    document.getElementById('home-screen').classList.add('hidden');
    document.getElementById('quiz-screen').classList.remove('hidden');
    updateQuestion();
}

function updateQuestion() {
    document.getElementById('question-number').innerText = `Pregunta ${pasoActual + 1} de 10`;
    document.getElementById('question-text').innerText = preguntas[pasoActual];
    document.getElementById('progress').style.width = `${((pasoActual + 1) / preguntas.length) * 100}%`;
}

function handleAnswer(puntos) {
    puntajeTotal += puntos;
    pasoActual++;
    if (pasoActual < preguntas.length) {
        updateQuestion();
    } else {
        document.getElementById('quiz-screen').classList.add('hidden');
        document.getElementById('form-screen').classList.remove('hidden');
    }
}

// Escuchar el envío del formulario
document.getElementById('lead-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Validación sencilla de teléfonos (Mínimo 10 dígitos)
    const telEst = document.getElementById('tel_est').value;
    const telPad = document.getElementById('tel_pad').value;

    if (telEst.length < 10 || telPad.length < 10) {
        alert("Por favor, ingresa un número de teléfono válido (al menos 10 dígitos).");
        return;
    }

    const URL_GOOGLE_SHEETS = "https://script.google.com/macros/s/AKfycbzVlKd5vulHrKgYU-5HJqGMYgUStkojgZavlNrokxWu3GunSYjCLOcpbCEG9CDtEsy8/exec"; 

    const datos = {
        nombre: document.getElementById('nombre').value,
        email: document.getElementById('email').value,
        representante: document.getElementById('representante').value,
        tel_est: telEst,
        tel_pad: telPad,
        puntaje: puntajeTotal
    };

    // Enviar datos y mostrar resultado
    fetch(URL_GOOGLE_SHEETS, {
        method: 'POST',
        mode: 'no-cors', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos)
    }).then(() => {
        showFinalResult();
    }).catch(err => {
        console.error("Error al guardar:", err);
        showFinalResult(); 
    });
});

function showFinalResult() {
    document.getElementById('form-screen').classList.add('hidden');
    document.getElementById('result-screen').classList.remove('hidden');
    
    let titulo, descripcion, porcentaje, campo;
    
    // Segmentación por puntaje (10 a 40 puntos posibles)
    if (puntajeTotal >= 34) {
        porcentaje = Math.floor(Math.random() * (98 - 93 + 1)) + 93;
        titulo = "¡Perfil: Director de Operaciones!";
        descripcion = `Tu afinidad es del ${porcentaje}%. Tienes una mente brillante para la <strong>Optimización de Procesos y Logística</strong>.`;
        campo = "Campo de éxito: Plantas Industriales y Cadenas de Suministro.";
        perfilAsignado = "Director de Operaciones";
    } else if (puntajeTotal >= 25) {
        porcentaje = Math.floor(Math.random() * (92 - 86 + 1)) + 86;
        titulo = "¡Perfil: Líder de Gestión Empresarial!";
        descripcion = `Tu perfil coincide en un ${porcentaje}% con la carrera. Destacas por tu <strong>Liderazgo y enfoque en Calidad Total</strong>.`;
        campo = "Campo de éxito: Gerencia de Proyectos y Consultoría Administrativa.";
        perfilAsignado = "Líder de Gestión";
    } else {
        porcentaje = Math.floor(Math.random() * (85 - 75 + 1)) + 75;
        titulo = "¡Perfil: Especialista en Eficiencia Humana!";
        descripcion = `Posees un ${porcentaje}% de compatibilidad. Tu enfoque práctico es vital para la <strong>Seguridad Industrial y Ergonomía</strong>.`;
        campo = "Campo de éxito: Higiene, Seguridad y Gestión del Talento.";
        perfilAsignado = "Especialista en Eficiencia";
    }

    document.getElementById('result-title').innerText = titulo;
    document.getElementById('result-desc').innerHTML = `${descripcion}<br><br><strong>${campo}</strong>`;
    
    // Animación de las barras
    setTimeout(() => {
        document.getElementById('bar-liderazgo').style.width = `${porcentaje}%`;
        document.getElementById('bar-analisis').style.width = `${porcentaje - 5}%`;
    }, 100);
}

function contactarWhatsApp() {
    const nombre = document.getElementById('nombre').value;
    const telefonoAsesor = "584249257152"; 
    const mensaje = `Hola, soy ${nombre}. Acabo de realizar el test vocacional y mi perfil resultó: "${perfilAsignado}". Me gustaría recibir información sobre las inscripciones en la UCAB.`;
    
    const url = `https://wa.me/${telefonoAsesor}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
}
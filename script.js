const sobre = document.getElementById('sobre');
const carta = document.getElementById('carta');
const abrirBtn = document.getElementById('abrir');
const musica = document.getElementById('musica');
const musicaBtn = document.getElementById('musicaBtn');
const hearts = document.getElementById('hearts');
const texto = document.getElementById('texto');
const contenedor = document.querySelector('.contenedor');
const shareBtn = document.getElementById('shareBtn');

let abierto = false;
let musicaActiva = false;

/* Mensaje que irá dentro de la carta (tal como lo proporcionaste) */
const messageText = `Hoy quiero tomarme este momento para decirte algo que quizá no te digo lo suficiente…

Eres una de las personas más importantes que han pasado por mi vida. Tu amistad ha sido de las cosas más bonitas, sinceras y valiosas que me han pasado.

Desde que llegaste, todo se sintió diferente. Tu forma de ser, tu manera de hablar, de escuchar, de enojarte, de reír… incluso tus berrinches, todo eso es parte de lo que te hace única, y así exactamente te quiero.

Quiero que sepas que te quiero muchísimo. No de una forma pasajera, sino de una forma real, fuerte y sincera. Un cariño que ha crecido con el tiempo y que no se va a ir fácilmente.

Me encanta cuando me llamas… porque no sé por qué, pero cada vez que veo tu llamada me emociono. Es como si por un momento todo lo demás dejara de importar.

Gracias por estar conmigo en los momentos buenos, pero sobre todo por estar —o haber estado— en los momentos malos y difíciles. Eso es algo que no cualquiera hace, y de verdad lo valoro muchísimo.

Si algún día me preguntan qué ha sido de las mejores cosas que me han pasado en la vida, sin duda diré que conocerte y compartir contigo todo esto.

No importa lo que pase, quiero que sepas algo muy importante:  
siempre voy a estar para ti, incluso cuando las cosas no estén bien, incluso cuando todo se complique. No te voy a soltar fácilmente, porque eres alguien que marcó mi vida de una forma especial.

---

💌 POSDATA

Y sí… tengo que decirlo aquí porque si no, no me quedo tranquilo 😄

Me encantaría casarme con tu hermana algún día. Pero no lo digo como algo raro, sino como un pensamiento sincero: si ella es parte de una familia como la tuya, seguro es alguien increíble.

Y espero que cuando eso pase… podamos ser familia y seguir compartiendo todo como siempre.

---



Si algún día termino en tu familia, espero que no me pongas pruebas difíciles en las reuniones 😂  
porque ya con tus berrinches tengo suficiente entrenamiento como para sobrevivir cualquier cosa.

---

Con mucho cariño…  
y con todo lo que no siempre sé decirte en persona ❤️`;

/* Open card flow */
function abrirCarta() {
  if (abierto) return;
  abierto = true;

  // add classes to trigger CSS transitions
  sobre.classList.add('open');
  contenedor.classList.add('open');
  carta.classList.add('open');
  carta.setAttribute('aria-hidden', 'false');
  sobre.setAttribute('aria-pressed', 'true');

  // fade message, then slide envelope away
  const mensaje = document.querySelector('.mensajeAbrir');
  if (mensaje) {
    setTimeout(() => { mensaje.style.opacity = '0'; }, 300);
    setTimeout(() => { mensaje.style.display = 'none'; }, 900);
  }

  // after flap rotation start sliding the envelope away
  setTimeout(() => {
    sobre.classList.add('away');
    // remove envelope from flow after it moved away
    setTimeout(() => { sobre.style.display = 'none'; }, 900);
  }, 700);

  // typing effect after card is visible
  setTimeout(() => { escribirTexto(); }, 900);
}

/* typing effect */
function escribirTexto() {
  if (!texto) return;
  const contenido = messageText;
  texto.textContent = '';
  let i = 0;
  function escribir() {
    if (i < contenido.length) {
      texto.textContent += contenido.charAt(i);
      i++;
      setTimeout(escribir, 14);
    }
  }
  escribir();
}

/* Listeners */
sobre.addEventListener('click', abrirCarta);
abrirBtn.addEventListener('click', abrirCarta);
sobre.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); abrirCarta(); } });

/* Music button: open YouTube link in new tab */
musicaBtn.addEventListener('click', () => {
  const url = 'https://www.youtube.com/watch?v=GKdl-GCsNJ0&list=RDGKdl-GCsNJ0&start_radio=1';
  window.open(url, '_blank');
});

/* Share via WhatsApp */
if (shareBtn) {
  shareBtn.addEventListener('click', () => {
    const url = 'https://wa.me/?text=' + encodeURIComponent(messageText);
    window.open(url, '_blank');
  });
}

/* Floating hearts (kept lightweight) */
function crearCorazon() {
  const corazon = document.createElement('div');
  corazon.textContent = '❤️';
  corazon.style.position = 'absolute';
  corazon.style.left = Math.random() * 100 + 'vw';
  corazon.style.fontSize = (12 + Math.random() * 18) + 'px';
  corazon.style.bottom = '-20px';
  corazon.style.opacity = '0.9';
  corazon.style.pointerEvents = 'none';
  corazon.style.animation = 'subir 5s linear forwards';
  hearts.appendChild(corazon);
  setTimeout(() => corazon.remove(), 5200);
}
setInterval(crearCorazon, 600);

/* dynamic keyframes for hearts */
const styleTag = document.createElement('style');
styleTag.textContent = `@keyframes subir {0%{transform:translateY(0);opacity:1}100%{transform:translateY(-120vh);opacity:0}}`;
document.head.appendChild(styleTag);

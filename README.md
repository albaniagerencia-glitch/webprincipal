# Albania — Restaurante Campestre · albaniarestaurante.com

Sitio estático (sin build, sin frameworks, sin dependencias) del Restaurante
Albania Campestre — Ginebra y Santa Elena, Valle del Cauca.

Reconstrucción limpia del contenido que hoy vive en `albaniarestaurante.co`
(WordPress + Elementor + BookingPress), con tres diferencias de fondo:

1. **La carta es texto**, no imágenes: indexable por Google, legible por
   lectores de pantalla y reutilizable por el bot de WhatsApp.
2. **Precios de la carta de diciembre de 2025** (los del `.co` son de junio de
   2025 y están entre 8 % y 12 % por debajo).
3. **Las reservas se gestionan por WhatsApp**, no con un motor de citas: el
   formulario arma el mensaje y lo abre en WhatsApp. No hay backend, no hay
   datos almacenados en el navegador.

## Estructura

```
index.html                        Inicio
menu/index.html                   Carta completa con precios
eventos/index.html                Eventos, bodas, empresariales, recorrido
quienes-somos/index.html          Historia y propuesta
reserva/index.html                Formulario → mensaje de WhatsApp
terminos-y-condiciones/index.html Condiciones de reserva
404.html                          Página de error
styles.css                        Hoja de estilos única de todo el sitio
assets/                           Logo, imagen social y 37 fotos en WebP
sitemap.xml · robots.txt          SEO
netlify.toml                      Publicación, redirecciones y cabeceras
```

## Decisiones técnicas

- **Sin JavaScript obligatorio.** Solo la página de reserva y la portada usan
  JS, y ninguna de las dos lo necesita para mostrar su contenido. Todo lo demás
  (menú móvil, acordeón del directorio) funciona con HTML y CSS puros.
- **Portada en video** (`assets/hero.webm` + `assets/hero.mp4`, 6 s, ~570 KB):
  un bucle sin costura de tomas aéreas, mudo y decorativo. La foto
  (`assets/hero-poster.webp`) se pinta de inmediato y el video entra encima
  solo cuando está listo. No se descarga un solo byte de video si el visitante
  activó `prefers-reduced-motion` o va en ahorro de datos / 2G-3G, y siempre
  hay un botón de pausa (WCAG 2.2.2). Se detiene solo al ocultar la pestaña.
- **Imágenes en WebP**, redimensionadas al tamaño de uso real, con `width` y
  `height` declarados y `loading="lazy"` fuera de la primera pantalla.
  El sitio completo pesa ~3,6 MB, contra los ~2 MB de CSS y JS que carga
  Elementor en el `.co` antes de mostrar una sola foto.
- **Datos estructurados** (`schema.org`): `Organization`, un `Restaurant` por
  sede con horarios y aforo, el `Menu` completo con precios y una
  `ReserveAction`.
- **Reglas de negocio en el formulario de reserva**, que el sistema actual del
  `.co` no aplica: fecha mínima 24 h, franja 11:00 a. m. – 4:30 p. m., aviso
  cuando se pide Santa Elena entre semana (abre de viernes a domingo) y aviso
  de condiciones de evento a partir de 20 personas.

## Estado

Todas las páginas llevan `<meta name="robots" content="noindex, follow">`.
**Se levanta el `noindex` cuando el restaurante confirme por escrito la carta
vigente**, ya que publicar precios equivocados es un riesgo comercial y legal.
`robots.txt` ya queda configurado para ese momento.

## Publicación

`publish = "."` en `netlify.toml`: se sirve la raíz del repositorio, sin
compilación. Un `push` a `main` redespliega el sitio en menos de 80 segundos.

## Modo navidad (temporal, temporada 2026)

Decoración de temporada solo en el inicio (`index.html`), sin librerías
externas y fácil de retirar:

- `navidad.css`: franja superior, guirnalda de luces en la portada, destellos
  y la sección «Temporada navideña». Todo cuelga de `body.modo-navidad`.
- `navidad.js` (~1,7 KB): crea los destellos sobre la portada. No hace nada
  si el visitante pidió menos movimiento (`prefers-reduced-motion`) o va en
  ahorro de datos. El video de la portada no se toca.
- En `index.html` cada bloque está entre marcas `<!-- NAVIDAD:INICIO … -->` y
  `<!-- NAVIDAD:FIN … -->`, más dos líneas marcadas `<!-- NAVIDAD: … -->`.
- Los botones llevan al WhatsApp de siempre (+57 311 720 7140) con un mensaje
  prellenado de reserva navideña, y a `/reserva/`. No se publican precios,
  menús ni fechas: se invita a consultar por WhatsApp.

**Retirarlo en enero** (2 minutos):

1. Borrar `navidad.css` y `navidad.js`.
2. En `index.html`: quitar `class="modo-navidad"` del `<body>`, las dos líneas
   marcadas `<!-- NAVIDAD: … -->` con su `<link>`/`<script>` y los tres bloques
   entre `NAVIDAD:INICIO` y `NAVIDAD:FIN` (franja, guirnalda, temporada).
3. Comprobar: `grep -c NAVIDAD index.html` debe dar `0`.

Si se regenera `index.html` con los scripts de abajo, los bloques navideños se
pierden: hay que volver a insertarlos (o regenerar ya en enero, sin ellos).

## Regenerar

Las páginas se generan con los scripts `_build.py`, `_datos_menu.py`,
`_paginas.py` y `_paginas2.py` (no versionados en este repositorio). La carta
vive en `_datos_menu.py`: al cambiar un precio ahí, se regeneran el HTML y los
datos estructurados en un solo paso.

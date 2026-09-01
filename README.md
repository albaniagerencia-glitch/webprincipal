# Albania — Restaurante Campestre · Sitio "en construcción"

Página estática de una sola pantalla ("estamos preparando algo especial") para
Albania — Restaurante Campestre (Valle del Cauca, Colombia).

## Contenido

```
index.html      Página principal (HTML semántico, en español)
styles.css      Estilos — estética campestre/rústica, tonos tierra, responsive
assets/logo.png Logo de Albania (copia local, no se enlaza al dominio original)
```

- Sin frameworks ni build. Solo se carga una fuente de Google Fonts
  (*Fraunces*) con respaldo del sistema; el resto (textura de fondo, iconos
  de Instagram / Facebook / WhatsApp) va embebido como SVG / data-URI.
- JavaScript mínimo: una línea para el año del pie de página.
- Botón flotante de WhatsApp a `wa.me/573117207140`.

## Publicar

Sube el contenido de esta carpeta tal cual a cualquier hosting estático
(Netlify, Vercel, GitHub Pages, Cloudflare Pages, hosting cPanel, etc.).
La raíz del sitio debe servir `index.html`.

### Prueba local

```bash
python3 -m http.server 8000
# abre http://localhost:8000
```

## Datos incluidos

- **Sedes:** Ginebra (Km 2 Vía a Ginebra, Costa Rica) · Santa Elena
  (Km. 5 Vía Amaime, El Cerrito).
- **Contacto:** Tel./WhatsApp (+57) 311 720 7140 ·
  Instagram [@albaniarestaurante](https://instagram.com/albaniarestaurante) ·
  Facebook [albania.restaurante](https://facebook.com/albania.restaurante).

Para cambiar textos o direcciones, edita directamente `index.html`.
Los colores están centralizados en las variables `:root` de `styles.css`.

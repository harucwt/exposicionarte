# Exposición de arte

Fondo LiquidEther en React, con JSX y CSS separados. El componente usa WebGL2;
si el navegador no puede crear ese contexto, se muestra un fondo CSS de respaldo.
Las fichas individuales reutilizan una tarjeta volteable y un plano provisional
de la exposición.

## Desarrollo

```bash
npm install
npm run build
```

Después de compilar, abre `index.html`. Las fichas numeradas se encuentran en
`pinturas/001.html` a `pinturas/030.html`; sus imágenes, datos y plano se pueden
reemplazar al contar con los materiales definitivos.

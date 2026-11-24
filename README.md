# Exposición de arte

Catálogo de 30 pinturas con un carrusel React y páginas individuales generadas
por número (`pinturas/001.html` a `pinturas/030.html`). Los datos están en
`src/paintings.js`; asigna el archivo de cada obra en el campo `image` y actualiza
su ficha individual. Las páginas que ya existen no se sobrescriben durante el build.

## Desarrollo

```bash
npm install
npm run build
```

El build genera los bundles que carga `index.html` y crea las fichas que aún no
existen. Después abre `index.html`. Las fichas existentes no se sobrescriben.

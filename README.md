# Snake Game con React + Vite

## Descripción
Este proyecto es una implementación del juego clásico Snake desarrollada con React y Vite. El objetivo principal fue construir el juego con una estructura clara basada en componentes, props y estado.

La aplicación incluye:
- Movimiento de la serpiente con teclado.
- Comida aleatoria.
- Crecimiento al comer.
- Puntaje.
- Colisiones con paredes y con el propio cuerpo.
- Pantalla de `Game Over`.
- Reinicio del juego sin recargar la página.

## Tecnologías usadas
- React
- Vite
- JavaScript con JSX
- CSS

## Instalación
Desde la raíz del proyecto, ejecuta:

```bash
npm install
```

## Ejecución
Para iniciar el servidor de desarrollo:

```bash
npm run dev
```

Luego abre en el navegador la URL que muestre Vite en la terminal, normalmente `http://localhost:5173`.

## Cómo jugar
- Presiona una flecha del teclado o `W`, `A`, `S`, `D` para iniciar.
- Mueve la serpiente para comer la comida.
- Cada comida aumenta el tamaño de la serpiente y suma 1 punto.
- Evita chocar con las paredes.
- Evita chocar con tu propio cuerpo.
- Si pierdes, puedes reiniciar con el botón `Reiniciar`.
- También puedes reiniciar presionando `Enter` cuando aparezca `Game Over`.

## Scripts disponibles
```bash
npm run dev
npm run build
npm run preview
npm run lint
```

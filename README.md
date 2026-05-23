# Snake Game con React y Vite

## Descripción
Este proyecto es una implementación del juego clásico Snake desarrollada con React y Vite. El objetivo no fue solo hacer que el juego funcionara, sino también organizarlo correctamente con componentes, props, estado y efectos de React.

El juego permite:
- Mover la serpiente con teclado.
- Comer comida para crecer.
- Sumar puntaje.
- Detectar colisiones con paredes y con el propio cuerpo.
- Mostrar estado de juego y pantalla de fin.
- Reiniciar la partida sin recargar la página.

## Tecnologías utilizadas
- React
- Vite
- JavaScript con JSX
- CSS

## Estructura principal
El proyecto está dividido en componentes y lógica separada:

```text
src/
  components/
    Board.jsx
    Food.jsx
    GameHeader.jsx
    Score.jsx
    Snake.jsx
  game/
    constants.js
    utils.js
  hooks/
    useSnakeGame.js
  App.jsx
  App.css
  index.css
```

## Instalación
Desde la raíz del proyecto ejecuta:

```bash
npm install
```

## Ejecución en desarrollo
Para iniciar el servidor local:

```bash
npm run dev
```

Luego abre en el navegador la URL que Vite muestre en terminal, normalmente:

```text
http://localhost:5173
```

## Cómo jugar
- Presiona una flecha del teclado o las teclas `W`, `A`, `S`, `D` para iniciar.
- Mueve la serpiente por el tablero.
- Come la comida para crecer y aumentar el puntaje.
- Evita chocar con las paredes.
- Evita chocar con tu propio cuerpo.
- Si pierdes, usa el botón `Reiniciar`.
- También puedes reiniciar presionando `Enter` cuando aparezca la pantalla final.

## Scripts disponibles

```bash
npm run dev
```
Inicia el servidor de desarrollo.

```bash
npm run build
```
Genera la versión de producción en `dist/`.

```bash
npm run preview
```
Permite previsualizar la build de producción.

```bash
npm run lint
```
Ejecuta ESLint para revisar el código.

## Componentes principales
- `App.jsx`: contenedor principal de la aplicación.
- `Board.jsx`: renderiza el tablero del juego.
- `Snake.jsx`: dibuja la serpiente.
- `Food.jsx`: dibuja la comida.
- `Score.jsx`: muestra puntaje, estado e instrucciones.

## Lógica del juego
La lógica principal del juego fue separada para mantener el código más claro:
- `useSnakeGame.js`: controla estado, movimiento, puntaje, colisiones y reinicio.
- `constants.js`: define valores base del juego.
- `utils.js`: contiene funciones auxiliares para posiciones, colisiones y comida aleatoria.

## Estado actual
El proyecto está listo para ejecutarse con:

```bash
npm install
npm run dev
```

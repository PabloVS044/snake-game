# Documento de Trabajo por Sesiones: Snake con React + Vite

## Resumen
Este plan está diseñado para usarse en múltiples sesiones de trabajo con prompts cortos y concretos. La idea es que en cada sesión puedas pedir exactamente una etapa, validar el resultado, y luego continuar con la siguiente sin perder consistencia técnica ni estructura.

Supuesto de guardado:
- Guardar este documento como `PLAN.md` en la raíz del proyecto.
- Mantenerlo en español.
- Usarlo como fuente de verdad para todas las sesiones futuras.

Objetivo final:
- Construir un juego de Snake en React + Vite que cumpla la rúbrica.
- Lograr separación correcta en componentes.
- Usar props de forma clara.
- Manejar estado con `useState`.
- Implementar el loop del juego con `useEffect`.
- Completar movimiento, comida, crecimiento, colisiones, game over y puntaje.
- Dejar un `README.md` final listo para entrega.

## Estado actual del proyecto
Punto de partida confirmado en el repositorio:
- Ya existe un proyecto Vite + React funcional.
- La app actual sigue siendo la plantilla de ejemplo.
- No hay todavía componentes del juego.
- `npm run lint` ya pasa en el estado actual.
- Existe `.gitignore`.
- Existe `README.md`, pero todavía es el de la plantilla.

Esto permite comenzar directamente desde la base ya creada, sin tener que recrear el proyecto.

## Arquitectura Decidida
La implementación completa debe seguir estas decisiones para evitar rehacer trabajo entre sesiones.

### Componentes obligatorios
La app debe quedar separada al menos en estos archivos:
- `src/App.jsx`
- `src/components/Board.jsx`
- `src/components/Snake.jsx`
- `src/components/Food.jsx`
- `src/components/Score.jsx`

### Responsabilidades
- `App.jsx`
  - Contenedor principal.
  - Dueño de todo el estado.
  - Manejo del teclado.
  - Loop del juego con `useEffect`.
  - Reglas de movimiento, comida, colisiones, game over y reinicio.
- `Board.jsx`
  - Contenedor visual del tablero.
  - Render del área de juego.
  - Composición de `Snake` y `Food`.
  - Overlay o mensaje visual de estado si hace falta.
- `Snake.jsx`
  - Render de los segmentos de la serpiente.
  - Sin lógica de negocio.
- `Food.jsx`
  - Render de la comida.
  - Sin lógica de negocio.
- `Score.jsx`
  - Mostrar puntaje.
  - Mostrar estado del juego.
  - Mostrar instrucciones de uso o reinicio.

### Estado del juego
Todo el estado debe vivir en `App.jsx`, sin variables globales.

Estructura recomendada:
- `snake`: `[{ x, y }]`
- `direction`: `{ x, y }`
- `nextDirection`: `{ x, y }`
- `food`: `{ x, y }`
- `score`: `number`
- `gameStatus`: `'idle' | 'running' | 'gameOver'`

### Configuración base
Definir constantes simples para no dispersar valores mágicos:
- Tamaño del tablero: `16`.
- Velocidad inicial: `150` ms por tick.
- Posición inicial de serpiente: 3 segmentos centrados.
- Dirección inicial: derecha.

Estas constantes pueden vivir:
- Al inicio de `App.jsx`.
- En `src/gameConfig.js`.

Para esta tarea, cualquiera de las dos opciones es válida. La opción recomendada es `src/gameConfig.js` si quieres más orden desde el inicio.

## Plan por Etapas

### Etapa 1: Reemplazar la plantilla y crear la estructura base
**Objetivo**
Eliminar el contenido de ejemplo de Vite y dejar la app con la estructura mínima exigida por la tarea.

**Resultado esperado**
Una interfaz estática del juego ya montada, sin lógica real todavía, pero con los componentes obligatorios creados y conectados.

**Cambios a realizar**
- Eliminar el contenido demo de `App.jsx`.
- Limpiar `App.css` e `index.css`.
- Crear la carpeta `src/components`.
- Crear:
  - `Board.jsx`
  - `Snake.jsx`
  - `Food.jsx`
  - `Score.jsx`
- Conectar todos esos componentes desde `App.jsx`.
- Mostrar:
  - Título del juego.
  - Tablero visible.
  - Serpiente de ejemplo.
  - Comida de ejemplo.
  - Puntaje en `0`.
  - Instrucciones de teclado.
- Preparar clases CSS para:
  - Layout general.
  - Panel de puntaje.
  - Tablero.
  - Celdas o elementos posicionados.
  - Mensaje auxiliar.

**Decisiones técnicas de esta etapa**
- La UI debe quedar ya pensada para soportar render basado en coordenadas.
- Aunque el juego aún no se mueva, `snake` y `food` deben representarse como posiciones en cuadrícula, no como texto o HTML hardcodeado sin relación con el modelo real.
- `Board` debe recibir props desde `App`, aunque sean datos estáticos.

**Props recomendadas**
- `Board`
  - `boardSize`
  - `snakeSegments`
  - `foodPosition`
  - `gameStatus`
- `Snake`
  - `segments`
- `Food`
  - `position`
- `Score`
  - `score`
  - `gameStatus`
  - `message`

**Criterios de aceptación**
- Ya no queda rastro visual de la plantilla de Vite.
- Existen los 5 componentes requeridos.
- `App` pasa datos por props.
- El tablero se ve claro y usable.
- `npm run lint` pasa.

**Prompt sugerido para esa sesión**
"Implementa la Etapa 1 del `PLAN.md`: reemplaza la plantilla de Vite por la estructura base del juego Snake con los componentes `App`, `Board`, `Snake`, `Food` y `Score`, usando datos estáticos pero con props reales. No avances todavía a movimiento ni lógica del juego."

### Etapa 2: Movimiento automático y control por teclado
**Objetivo**
Hacer que la serpiente se mueva continuamente y cambie de dirección con el teclado.

**Resultado esperado**
La serpiente se mueve por el tablero y responde a flechas o `WASD`, pero todavía sin crecer ni colisionar formalmente.

**Cambios a realizar**
- Migrar `snake` de dato estático a estado con `useState`.
- Crear `direction` con `useState`.
- Crear `nextDirection` con `useState`.
- Crear `gameStatus` con valor inicial `'idle'`.
- Implementar un `useEffect` para escuchar teclado.
- Implementar un `useEffect` para el loop del juego con `setInterval`.
- Mover la serpiente en cada tick:
  - Calcular nueva cabeza.
  - Agregar cabeza nueva.
  - Remover cola.
- Iniciar partida cuando el usuario presione una tecla válida.
- Permitir:
  - Flechas.
  - Opcionalmente `WASD`.
- Bloquear reversa inmediata:
  - Si va a la derecha, no permitir izquierda en el mismo frame lógico.

**Decisiones técnicas de esta etapa**
- La serpiente debe dejar de ser una lista estática y pasar a ser el verdadero origen del render.
- `nextDirection` se usa para evitar comportamientos inconsistentes entre eventos de teclado y ticks.
- El loop debe depender del estado de juego, no correr siempre si el juego no ha iniciado.

**Comportamiento esperado**
- Al cargar, la app está en estado `idle`.
- Se muestra instrucción como "Presiona una flecha para iniciar".
- Al primer input, `gameStatus` cambia a `running`.
- La serpiente comienza a moverse.
- El tablero se actualiza sin manipular el DOM manualmente.

**Criterios de aceptación**
- La serpiente avanza sola.
- Cambia de dirección con teclado.
- No puede girar 180° de inmediato.
- La UI sigue estable y sin flicker evidente.
- `npm run lint` pasa.

**Prompt sugerido para esa sesión**
"Implementa la Etapa 2 del `PLAN.md`: agrega estado real de serpiente y dirección, control por teclado y loop de movimiento con `useEffect`. Mantén la arquitectura en `App` y no agregues todavía comida ni colisiones finales."

### Etapa 3: Comida, crecimiento y puntaje
**Objetivo**
Agregar la mecánica principal de recompensa del juego.

**Resultado esperado**
La serpiente come comida, crece y el puntaje aumenta.

**Cambios a realizar**
- Agregar `food` como estado.
- Crear función para generar comida en una coordenada válida.
- Evitar que la comida aparezca sobre la serpiente.
- En cada tick:
  - Calcular nueva cabeza.
  - Verificar si coincide con `food`.
  - Si comió:
    - Conservar la cola para crecer.
    - Sumar `1` al `score`.
    - Generar nueva comida.
  - Si no comió:
    - Mover normalmente.
- Actualizar `Score` en tiempo real.

**Decisiones técnicas de esta etapa**
- La lógica de generación de comida debe ser determinística y segura.
- Si el tablero está muy ocupado, la función debe seguir evitando posiciones inválidas.
- No hace falta optimización prematura; basta con intentar posiciones aleatorias hasta encontrar una libre, dado el tamaño pequeño del tablero.

**Comportamiento esperado**
- Comer comida aumenta longitud en 1 segmento.
- El puntaje refleja la cantidad de comidas consumidas.
- La comida reaparece en otra celda libre.

**Criterios de aceptación**
- El crecimiento funciona consistentemente.
- El puntaje nunca se desfasa del tamaño esperado.
- La comida no aparece dentro del cuerpo.
- `npm run lint` pasa.

**Prompt sugerido para esa sesión**
"Implementa la Etapa 3 del `PLAN.md`: agrega comida aleatoria, crecimiento de la serpiente y puntaje. Mantén toda la lógica en `App` y deja `Board`, `Snake`, `Food` y `Score` como componentes presentacionales por props."

### Etapa 4: Colisiones y game over
**Objetivo**
Completar la lógica obligatoria de derrota.

**Resultado esperado**
El juego detecta colisión con pared o con sí misma, se detiene y muestra game over.

**Cambios a realizar**
- Detectar colisión con bordes:
  - `x < 0`
  - `x >= boardSize`
  - `y < 0`
  - `y >= boardSize`
- Detectar colisión consigo misma:
  - La nueva cabeza coincide con algún segmento existente.
- Cuando hay colisión:
  - Cambiar `gameStatus` a `'gameOver'`.
  - Detener el loop.
  - Mantener visible el estado final del tablero.
  - Mostrar mensaje de derrota.
- Actualizar `Score` para reflejar el estado final.

**Decisiones técnicas de esta etapa**
- La detección debe hacerse antes de confirmar el nuevo estado de la serpiente.
- El loop no debe seguir ejecutándose en game over.
- No debe requerirse recarga de página para salir del estado perdido, aunque el reinicio formal venga en la siguiente etapa.

**Comportamiento esperado**
- Perder por pared funciona.
- Perder por auto-colisión funciona.
- Al perder, el juego deja de moverse inmediatamente.
- El puntaje queda visible.

**Criterios de aceptación**
- Game over confiable en ambos tipos de colisión.
- No hay movimiento residual después de perder.
- El mensaje de game over se entiende.
- `npm run lint` pasa.

**Prompt sugerido para esa sesión**
"Implementa la Etapa 4 del `PLAN.md`: agrega colisiones con pared y con el propio cuerpo, cambia el estado a `gameOver` y detén el loop sin recargar la página."

### Etapa 5: Reinicio y pulido visual final
**Objetivo**
Agregar el extra elegido y dejar la interfaz lista para evaluación.

**Resultado esperado**
El juego puede reiniciarse y la presentación se ve clara, ordenada y usable.

**Cambios a realizar**
- Crear `resetGame()`.
- Restaurar:
  - Serpiente inicial.
  - Dirección inicial.
  - Próxima dirección inicial.
  - Comida nueva válida.
  - Puntaje en `0`.
  - Estado `idle`.
- Agregar botón visible de reinicio.
- Opcionalmente permitir reinicio con teclado como mejora pequeña.
- Mejorar estilos:
  - Layout centrado.
  - Tablero con proporciones claras.
  - Celdas consistentes.
  - Serpiente distinguible.
  - Comida visible.
  - Panel de puntaje legible.
  - Mensajes de estado claros.
- Asegurar visualización razonable en pantallas pequeñas.

**Decisiones técnicas de esta etapa**
- Reinicio debe pasar por una sola función y no repetir lógica dispersa.
- La UI no debe usar un diseño genérico descuidado; debe verse intencional y limpia.
- El tablero puede implementarse con:
  - `display: grid` y elementos posicionados por coordenada.
  - Contenedor relativo y bloques absolutos calculados por CSS.
- La opción recomendada es `display: grid` o posicionamiento simple basado en `transform`, priorizando claridad sobre complejidad.

**Comportamiento esperado**
- Tras game over, el usuario puede reiniciar sin refrescar.
- La app vuelve a estado inicial limpio.
- La interfaz transmite claramente:
  - Puntaje.
  - Estado actual.
  - Instrucciones.

**Criterios de aceptación**
- Reinicio funcional.
- Interfaz clara y consistente.
- Responsive básico correcto.
- `npm run lint` pasa.

**Prompt sugerido para esa sesión**
"Implementa la Etapa 5 del `PLAN.md`: agrega reinicio completo del juego y pule la interfaz para que quede clara, usable y lista para evaluación, sin cambiar la arquitectura principal."

### Etapa 6: README, revisión final y entrega
**Objetivo**
Cerrar el proyecto para entrega en GitHub.

**Resultado esperado**
Proyecto documentado, consistente y listo para ejecutar con `npm install` y `npm run dev`.

**Cambios a realizar**
- Reemplazar el `README.md` actual por uno del proyecto.
- Incluir:
  - Descripción breve.
  - Requisitos.
  - Instalación.
  - Ejecución.
  - Instrucciones para jugar.
- Revisar claridad del código:
  - Nombres.
  - Separación de responsabilidades.
  - Mensajes visibles.
- Ejecutar verificaciones finales:
  - `npm run lint`
  - `npm run build`
- Revisar que `.gitignore` siga cubriendo `node_modules`.

**Contenido esperado del README**
- Nombre del proyecto.
- Breve descripción del juego.
- Tecnologías usadas.
- Pasos:
  - `npm install`
  - `npm run dev`
- Cómo jugar:
  - Mover con flechas o `WASD`.
  - Comer comida.
  - Evitar pared y cuerpo.
  - Reiniciar si pierde.

**Criterios de aceptación**
- README correcto y alineado con el comportamiento real.
- Lint y build pasan.
- Proyecto listo para subir a GitHub sin cambios manuales extra.

**Prompt sugerido para esa sesión**
"Implementa la Etapa 6 del `PLAN.md`: prepara el README final de entrega, revisa coherencia del código y valida el proyecto con lint y build."

## Interfaces y contrato entre componentes
Para evitar cambios de forma entre sesiones, usar este contrato base.

### `App`
- Props: ninguna.
- Responsabilidades:
  - Estado.
  - Reglas.
  - Input.
  - Loop.
  - Reset.

### `Board`
- Props:
  - `boardSize`
  - `snakeSegments`
  - `foodPosition`
  - `gameStatus`
- Responsabilidades:
  - Render del área de juego.
  - Composición de `Snake` y `Food`.
  - Posible overlay visual según estado.

### `Snake`
- Props:
  - `segments`
  - Opcional `boardSize` si el método visual lo requiere.
- Responsabilidades:
  - Render puro de segmentos.

### `Food`
- Props:
  - `position`
  - Opcional `boardSize` si el método visual lo requiere.
- Responsabilidades:
  - Render puro de la comida.

### `Score`
- Props:
  - `score`
  - `gameStatus`
  - `message`
- Responsabilidades:
  - Mostrar información del juego.
  - No manejar lógica.

## Decisiones técnicas cerradas
Estas decisiones deben mantenerse estables durante todas las sesiones para no introducir retrabajo.

- No usar variables globales.
- No usar `document.getElementById`, listeners manuales fuera de React ni manipulación directa del DOM.
- Usar `useState` para todo el estado del juego.
- Usar `useEffect` para:
  - Teclado.
  - Loop del juego.
- Pasar datos por props entre componentes.
- Toda la lógica central vive en `App`.
- Componentes visuales simples y reutilizables.
- Sin librerías externas para estado, animación o teclado.
- Alcance final: obligatorio completo + reinicio.
- No incluir dificultad progresiva ni niveles en esta primera versión final.
- No incluir backend, almacenamiento persistente ni high scores.

## Verificación al final de cada sesión
Cada etapa debe cerrar con una pequeña validación.

### Checklist obligatorio por sesión
- La app corre sin errores.
- No se rompió la separación en componentes.
- No apareció lógica duplicada innecesaria.
- `npm run lint` pasa.

### Checklist funcional según etapa
- Etapa 1:
  - Estructura visible correcta.
- Etapa 2:
  - Movimiento y teclado correctos.
- Etapa 3:
  - Comida, crecimiento y score correctos.
- Etapa 4:
  - Colisiones y game over correctos.
- Etapa 5:
  - Reinicio e interfaz correctos.
- Etapa 6:
  - README, lint y build correctos.

## Riesgos a evitar
- Meter demasiada lógica dentro de `Board`, `Snake`, `Food` o `Score`.
- Usar varios estados desconectados que se contradigan.
- Permitir reversa instantánea y romper la lógica.
- Generar comida sobre la serpiente.
- No limpiar correctamente el `setInterval`.
- Hacer toda la UI en un solo componente.
- Pulir el diseño demasiado pronto antes de cerrar la lógica central.
- Dejar `README` para el final sin reflejar el comportamiento real.

## Forma recomendada de trabajar en futuras sesiones
Usar una sesión por etapa. En cada sesión:
1. Pedir exactamente una etapa.
2. Implementar solo esa etapa.
3. Validar con lint.
4. Revisar visual o comportamiento.
5. Avanzar a la siguiente recién cuando la anterior esté estable.

## Assumptions
- El archivo final a crear en el proyecto debe llamarse `PLAN.md`.
- El idioma del documento será español.
- El tablero se implementará con una cuadrícula fija de 16x16.
- La velocidad inicial será 150 ms por tick.
- El control principal será con flechas, con `WASD` como soporte opcional aceptable.
- El documento debe servir tanto como guía humana como base para prompts futuros.

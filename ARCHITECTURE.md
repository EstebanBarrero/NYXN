# Architecture

Respuestas breves a las tres preguntas del reto técnico NYXN.

---

## 1. Escenario de Carga

Con millones de registros en React priorizaría paginación en el servidor (solo traer la página visible), virtualización de listas (`react-window` o TanStack Virtual) para no montar nodos fuera del viewport, y SSR/ISR en Next.js para entregar HTML útil desde el primer byte; complementaría con caché de datos (p. ej. TanStack Query) y skeletons para la percepción de velocidad. En este proyecto la primera página llega por SSR con `fetch` e ISR (`revalidate: 60` en `httpClient`), la grilla muestra como máximo 20 cards por vista, `CharacterCacheContext` evita repetir peticiones al volver a una página ya visitada, y `useDebounce` limita las búsquedas en red.

## 2. Uso de IA

Uso Claude Code para arquitectura y planes de implementación, Cursor para iterar y depurar en el editor, Gemini para investigación técnica profunda y ChatGPT/Codex para dudas puntuales; en todos los casos no expongo credenciales ni datos sensibles, trabajo con fragmentos descontextualizados y reviso manualmente todo lo que integro al repositorio.

## 3. Manejo de Estado

Reservo Zustand o Redux Toolkit para estado global que cruza rutas o muchos consumidores desacoplados (sesión, carrito, preferencias); para estado local de UI, formularios o flujos acotados uso `useState`/`useReducer`, y en este reto el listado vive en `useCharacters` con caché en contexto (`CharacterCacheProvider`) porque solo lo necesita el árbol de la grilla sin justificar una store global.

# Plan-Entrena-David — Documentación Técnica

**Versión:** 0.0.0
**Fecha:** Marzo 2026
**Autor:** David Velázquez Gómez
**Repositorio:** https://github.com/dvelazquez1976/Bruno-Strong-Rutinas

---

## Índice

1. [Descripción general](#1-descripción-general)
2. [Arquitectura del sistema](#2-arquitectura-del-sistema)
3. [Stack tecnológico](#3-stack-tecnológico)
4. [Estructura de directorios](#4-estructura-de-directorios)
5. [Instalación y puesta en marcha](#5-instalación-y-puesta-en-marcha)
6. [Variables de entorno y configuración Firebase](#6-variables-de-entorno-y-configuración-firebase)
7. [Modelo de datos (Firestore)](#7-modelo-de-datos-firestore)
8. [Módulos y componentes](#8-módulos-y-componentes)
9. [API interna — funciones Firestore](#9-api-interna--funciones-firestore)
10. [Rutas de navegación](#10-rutas-de-navegación)
11. [Autenticación](#11-autenticación)
12. [Rutinas disponibles](#12-rutinas-disponibles)
13. [Despliegue (Firebase Hosting)](#13-despliegue-firebase-hosting)
14. [Reglas de seguridad Firestore](#14-reglas-de-seguridad-firestore)
15. [Limitaciones conocidas y deuda técnica](#15-limitaciones-conocidas-y-deuda-técnica)

---

## 1. Descripción general

Plan-Entrena-David es una aplicación web progresiva (PWA-ready) de registro y seguimiento de entrenamientos de fuerza. Permite al usuario seleccionar una rutina de entre 18 sesiones predefinidas, registrar series, repeticiones y carga por ejercicio, y visualizar el progreso histórico mediante gráficos.

La aplicación migró de una implementación vanilla JS con persistencia en `localStorage` a una arquitectura React con base de datos en la nube (Cloud Firestore) y autenticación por email/contraseña, lo que permite el acceso desde cualquier dispositivo.

**Funcionalidades principales:**

- Selección de rutina y registro de sesión de entrenamiento
- Visualización del último entrenamiento para cada rutina (referencia de cargas)
- Temporizador de sesión y temporizador de descanso configurable con alerta sonora
- Historial completo de sesiones con detalle por ejercicio
- Gráficos de progreso: frecuencia semanal, volumen por sesión, progresión por ejercicio
- Autenticación con email y contraseña
- Diseño responsive adaptado a móvil y escritorio

---

## 2. Arquitectura del sistema

```
┌─────────────────────────────────────────────┐
│              Navegador / Móvil              │
│                                             │
│  ┌─────────────────────────────────────┐    │
│  │         React 19 (Vite)             │    │
│  │                                     │    │
│  │  AuthContext ──► Firebase Auth      │    │
│  │  Pages / Components                 │    │
│  │  Firestore utils ──► Cloud Firestore│    │
│  │  Recharts (gráficos)                │    │
│  └─────────────────────────────────────┘    │
└─────────────────────────────────────────────┘
                      │
          ┌───────────▼───────────┐
          │    Firebase (Google)  │
          │                       │
          │  Authentication       │
          │  Cloud Firestore      │
          │  Hosting              │
          └───────────────────────┘
```

El frontend es una SPA (Single Page Application) compilada con Vite y servida estáticamente desde Firebase Hosting. No existe backend propio; toda la lógica de persistencia y autenticación se delega a Firebase.

---

## 3. Stack tecnológico

| Componente | Tecnología | Versión |
|---|---|---|
| Framework UI | React | 19.2.x |
| Bundler | Vite | 8.x |
| Enrutamiento | React Router DOM | 7.x |
| Base de datos | Cloud Firestore (Firebase) | SDK 12.x |
| Autenticación | Firebase Authentication | SDK 12.x |
| Gráficos | Recharts | 3.x |
| Iconos | Lucide React | 0.577.x |
| Estilos | CSS plano con variables custom | — |
| Hosting | Firebase Hosting | — |
| Linter | ESLint | 9.x |

---

## 4. Estructura de directorios

```
plan-entrena-david/
│
├── index.html                  # Punto de entrada HTML
├── package.json                # Dependencias y scripts npm
├── vite.config.js              # Configuración del bundler
├── eslint.config.js            # Reglas de linting
├── firebase.json               # Configuración Firebase Hosting
├── .firebaserc                 # Alias de proyecto Firebase
├── .gitignore
│
├── public/
│   ├── favicon.svg
│   └── icons.svg
│
└── src/
    ├── main.jsx                # Punto de entrada React
    ├── App.jsx                 # Enrutador raíz y guardas de ruta
    ├── firebase.js             # Inicialización Firebase (config)
    │
    ├── contexts/
    │   └── AuthContext.jsx     # Context API de autenticación
    │
    ├── components/
    │   ├── Layout.jsx          # Sidebar + cabecera móvil + Outlet
    │   ├── ExerciseCard.jsx    # Tarjeta individual de ejercicio
    │   └── RestTimer.jsx       # Temporizador de descanso
    │
    ├── pages/
    │   ├── Login.jsx           # Pantalla login / registro
    │   ├── Workout.jsx         # Página principal de entrenamiento
    │   ├── History.jsx         # Historial de sesiones
    │   └── Progress.jsx        # Gráficos de progreso
    │
    ├── data/
    │   └── routines.js         # Definición de las 18 rutinas
    │
    ├── utils/
    │   └── firestore.js        # Funciones de acceso a Firestore
    │
    └── styles/
        └── global.css          # Estilos globales y variables CSS
```

---

## 5. Instalación y puesta en marcha

### Requisitos previos

- Node.js 18 o superior
- npm 9 o superior
- Cuenta de Google con acceso al proyecto Firebase `bruno-strong`

### Instalación local

```bash
# Clonar el repositorio
git clone https://github.com/dvelazquez1976/Bruno-Strong-Rutinas.git
cd Bruno-Strong-Rutinas

# Instalar dependencias
npm install

# Arrancar servidor de desarrollo
npm run dev
```

La app queda disponible en `http://localhost:5173`.

### Scripts disponibles

| Comando | Descripción |
|---|---|
| `npm run dev` | Servidor de desarrollo con HMR |
| `npm run build` | Compilación de producción (salida en `dist/`) |
| `npm run preview` | Previsualización del build de producción |
| `npm run lint` | Análisis estático con ESLint |

### Acceso en red local (móvil en la misma WiFi)

```bash
npm run dev -- --host
```

Vite mostrará la dirección IP local (ej. `http://192.168.1.x:5173`) accesible desde cualquier dispositivo en la misma red.

---

## 6. Variables de entorno y configuración Firebase

La configuración de Firebase se encuentra en `src/firebase.js`. No se usan variables de entorno `.env` en esta versión; las credenciales están embebidas en el código fuente (práctica aceptable para proyectos de uso personal donde el repositorio es privado).

```js
// src/firebase.js
const firebaseConfig = {
  apiKey: "AIzaSyDsSm9He7465Va4xqvBrKEnaqC168b2Vho",
  authDomain: "bruno-strong.firebaseapp.com",
  projectId: "bruno-strong",
  storageBucket: "bruno-strong.firebasestorage.app",
  messagingSenderId: "102097236836",
  appId: "1:102097236836:web:331dfd462dfedc2fc70071",
  measurementId: "G-J0PH975663"
};
```

Si en el futuro se quiere usar `.env`, bastará con:

```bash
# .env.local
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_PROJECT_ID=...
```

Y referenciar `import.meta.env.VITE_FIREBASE_API_KEY` en el código.

---

## 7. Modelo de datos (Firestore)

La base de datos usa una estructura jerárquica por usuario. Cada usuario autenticado tiene su propia subcolección de entrenamientos, garantizando aislamiento completo de datos.

### Colección: `users/{userId}/workouts`

Cada documento representa una sesión de entrenamiento completada.

```
users/
└── {userId}/                         ← UID del usuario (Firebase Auth)
    └── workouts/
        └── {workoutId}/              ← ID autogenerado por Firestore
            ├── routineName: string   ← Ej: "Starter Pack - Fase 1, Día 1"
            ├── date: string          ← Ej: "2026-03-21" (ISO 8601)
            ├── duration: number      ← Duración en segundos
            ├── createdAt: Timestamp  ← Timestamp Firestore (para ordenación)
            └── exercises: {
                    "Nombre del ejercicio": [
                        { reps: string, load: string },  ← Serie 1
                        { reps: string, load: string },  ← Serie 2
                        { reps: string, load: string }   ← Serie 3
                    ]
                }
```

### Ejemplo de documento real

```json
{
  "routineName": "Starter Pack - Fase 1, Día 1",
  "date": "2026-03-21",
  "duration": 3240,
  "createdAt": "2026-03-21T18:30:00Z",
  "exercises": {
    "Incline dumbbell press": [
      { "reps": "8", "load": "22.5" },
      { "reps": "8", "load": "22.5" },
      { "reps": "7", "load": "22.5" }
    ],
    "Trap bar deadlifts": [
      { "reps": "8", "load": "40" },
      { "reps": "8", "load": "40" },
      { "reps": "8", "load": "40" }
    ]
  }
}
```

---

## 8. Módulos y componentes

### `src/App.jsx`

Componente raíz. Define el árbol de rutas con React Router y dos guardas:

- `PrivateRoute`: redirige a `/login` si no hay usuario autenticado.
- `PublicRoute`: redirige a `/` si ya hay sesión activa (evita que un usuario logado vea el login).

### `src/contexts/AuthContext.jsx`

Context API que expone el estado de autenticación a toda la aplicación.

| Exportación | Tipo | Descripción |
|---|---|---|
| `useAuth()` | Hook | Accede al contexto desde cualquier componente |
| `AuthProvider` | Componente | Envuelve la app y provee el contexto |
| `currentUser` | `User \| null` | Usuario autenticado actual (objeto Firebase) |
| `loading` | `boolean` | Indica si Firebase está resolviendo la sesión inicial |
| `signup(email, password, displayName)` | `Promise` | Crea cuenta nueva y asigna displayName |
| `login(email, password)` | `Promise` | Inicia sesión |
| `logout()` | `Promise` | Cierra sesión |

### `src/components/Layout.jsx`

Estructura de navegación de la app autenticada. Contiene:

- Sidebar con enlaces a las tres páginas principales.
- Cabecera móvil con botón hamburguesa.
- Overlay para cerrar el sidebar en móvil.
- Información del usuario (avatar inicial + email) y botón de logout.
- `<Outlet />` de React Router donde se renderizan las páginas hijas.

### `src/components/ExerciseCard.jsx`

Tarjeta de un ejercicio individual dentro de una sesión. Muestra:

- Nombre del ejercicio y repeticiones objetivo.
- Tres filas de input (una por serie): campo de repeticiones y campo de carga (kg).
- Datos del último entrenamiento para esa misma rutina (referencia de carga).

### `src/components/RestTimer.jsx`

Temporizador de descanso entre series. Características:

- Presets de 30 s, 60 s, 90 s y 120 s.
- Cuenta regresiva visual.
- Alerta sonora al llegar a cero, generada con la Web Audio API (sin dependencias externas).
- Se puede pausar y reiniciar manualmente.

### `src/pages/Login.jsx`

Pantalla de acceso. Alterna entre modo login y modo registro en la misma vista. Gestiona los códigos de error de Firebase Auth y los muestra en español.

### `src/pages/Workout.jsx`

Página principal. Flujo de uso:

1. El usuario selecciona una rutina del desplegable.
2. Se carga el último entrenamiento registrado para esa rutina (referencia de cargas anteriores).
3. Se muestran los bloques y ejercicios con `ExerciseCard`.
4. El temporizador de sesión corre desde que se selecciona la rutina.
5. Al guardar, se persiste el documento en Firestore con todos los datos.

### `src/pages/History.jsx`

Lista de todas las sesiones registradas, ordenadas por fecha descendente. Cada fila muestra fecha, rutina y duración. Al hacer clic se abre un modal con el detalle completo por ejercicio y serie. Permite eliminar sesiones.

### `src/pages/Progress.jsx`

Panel de analítica. Contiene:

- Tarjetas de resumen: total de sesiones, días únicos entrenados, frecuencia semanal media (últimas 4 semanas), tiempo total acumulado.
- Gráfico de barras de frecuencia semanal (Recharts `BarChart`).
- Gráfico de barras de volumen total por sesión.
- Selector de ejercicio con gráfico de líneas dual (peso máximo + volumen total por sesión).

### `src/data/routines.js`

Catálogo de rutinas. Define 18 sesiones agrupadas en tres programas:

| Programa | Fases | Sesiones por fase |
|---|---|---|
| Starter Pack | 2 | 3 días |
| Sequel | 2 | 3 días |
| The Trilogy | 2 | 3 días |

Cada sesión contiene entre 3 y 4 bloques, con 2 a 4 ejercicios por bloque.

---

## 9. API interna — funciones Firestore

Todas las funciones están en `src/utils/firestore.js` y son asíncronas.

### `saveWorkout(userId, workoutData) → Promise<string>`

Guarda una sesión de entrenamiento. Añade automáticamente `createdAt` con el timestamp actual. Devuelve el ID del documento creado.

```js
await saveWorkout(uid, {
  routineName: "Starter Pack - Fase 1, Día 1",
  date: "2026-03-21",
  duration: 3600,
  exercises: { ... }
});
```

### `getWorkouts(userId) → Promise<Workout[]>`

Devuelve todas las sesiones del usuario ordenadas por fecha descendente.

### `getExerciseHistory(userId, exerciseName) → Promise<ExerciseHistory[]>`

Devuelve el historial de un ejercicio concreto a través de todas las sesiones, ordenado cronológicamente. Útil para los gráficos de progresión.

### `getLastWorkout(userId, routineName) → Promise<Workout | null>`

Devuelve la última sesión registrada para una rutina concreta. Se usa en `Workout.jsx` para mostrar la referencia de cargas anteriores.

### `getStats(userId) → Promise<Stats>`

Calcula y devuelve estadísticas agregadas:

```js
{
  totalWorkouts: number,
  totalDuration: number,      // segundos totales
  uniqueDays: number,
  weeklyFrequency: number,    // media de las últimas 4 semanas
  exerciseVolume: { [exerciseName]: number },
  recentWorkouts: Workout[]
}
```

### `deleteWorkout(userId, workoutId) → Promise<void>`

Elimina un documento de entrenamiento por su ID.

---

## 10. Rutas de navegación

| Ruta | Componente | Acceso |
|---|---|---|
| `/login` | `Login` | Solo usuarios no autenticados |
| `/` | `Workout` | Solo usuarios autenticados |
| `/history` | `History` | Solo usuarios autenticados |
| `/progress` | `Progress` | Solo usuarios autenticados |
| `*` | Redirige a `/` | — |

---

## 11. Autenticación

El sistema usa Firebase Authentication con proveedor Email/Password. El estado de sesión persiste entre recargas gracias al listener `onAuthStateChanged` en `AuthContext`.

**Flujo de registro:**

1. Usuario introduce nombre, email y contraseña.
2. Se crea la cuenta con `createUserWithEmailAndPassword`.
3. Se asigna el nombre con `updateProfile`.
4. El listener `onAuthStateChanged` actualiza `currentUser` automáticamente.
5. `PublicRoute` detecta el usuario y redirige a `/`.

**Flujo de login:**

1. Usuario introduce email y contraseña.
2. Se llama `signInWithEmailAndPassword`.
3. Mismo flujo de redirección automática.

**Códigos de error gestionados:**

| Código Firebase | Mensaje mostrado al usuario |
|---|---|
| `auth/user-not-found` | Usuario no encontrado |
| `auth/wrong-password` | Contraseña incorrecta |
| `auth/email-already-in-use` | El email ya está registrado |
| `auth/weak-password` | La contraseña es demasiado débil |
| `auth/invalid-email` | El email no es válido |

---

## 12. Rutinas disponibles

La aplicación incluye 18 rutinas predefinidas organizadas en tres programas:

**Starter Pack** (6 sesiones: Fases 1 y 2, Días 1-3)
**Sequel** (6 sesiones: Fases 1 y 2, Días 1-3)
**The Trilogy** (6 sesiones: Fases 1 y 2, Días 1-3)

Cada sesión está estructurada en bloques de ejercicios en supersets o circuits. Los ejercicios se realizan con mancuernas, barra trap, TRX u otros implementos de gimnasio en casa o box.

---

## 13. Despliegue (Firebase Hosting)

### Archivos de configuración

`firebase.json`:

```json
{
  "hosting": {
    "site": "plan-entrena-david",
    "public": "dist",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [{ "source": "**", "destination": "/index.html" }]
  }
}
```

La regla `rewrites` es necesaria para que React Router funcione correctamente al acceder a rutas directas (ej. `https://plan-entrena-david.web.app/history`).

### Proceso de despliegue

```bash
# 1. Instalar Firebase CLI (solo la primera vez)
npm install -g firebase-tools

# 2. Autenticarse (solo la primera vez)
firebase login

# 3. Crear el sitio en Firebase (solo la primera vez)
firebase hosting:sites:create plan-entrena-david

# 4. Compilar
npm run build

# 5. Desplegar
firebase deploy
```

La URL pública resultante es `https://plan-entrena-david.web.app`.

Para deploys sucesivos, solo son necesarios los pasos 4 y 5.

---

## 14. Reglas de seguridad Firestore

Las reglas actuales están en **modo test** y expiran 30 días después de la creación del proyecto. Antes de esa fecha deben actualizarse en la consola de Firebase (Firestore → Reglas).

**Reglas recomendadas para producción:**

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/workouts/{workoutId} {
      allow read, write: if request.auth != null
                         && request.auth.uid == userId;
    }
  }
}
```

Esta regla garantiza que cada usuario solo puede leer y escribir sus propios entrenamientos.

---

## 15. Limitaciones conocidas y deuda técnica

**Sin variables de entorno:** Las credenciales de Firebase están embebidas en el código. Aceptable para uso personal con repositorio privado; no recomendado si el repositorio se hace público.

**Bundle size:** El bundle de producción supera los 500 KB (980 KB sin comprimir, ~295 KB gzip). Está por encima del umbral de advertencia de Vite. Para reducirlo se podría aplicar code splitting con `React.lazy` + `Suspense` en las páginas.

**Sin tests automatizados:** No existen pruebas unitarias ni de integración. Para añadirlas se recomendaría Vitest + React Testing Library.

**Reglas Firestore en modo test:** Ver sección 14. Actualizar antes de la fecha de expiración.

**Índices Firestore:** Las consultas con `where` + `orderBy` en la misma colección (usadas en `getLastWorkout`) requieren un índice compuesto en Firestore. La primera vez que se ejecute esa consulta Firebase generará un enlace en la consola del navegador para crearlo automáticamente.

**Sin soporte PWA completo:** La app es responsive pero no tiene service worker ni manifest de instalación. Para instalarla como app en el móvil (icono en pantalla de inicio, modo offline) habría que añadir el plugin `vite-plugin-pwa`.

---

*Documentación generada en marzo de 2026.*

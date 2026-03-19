# 🎬 Netflix Clone — Full Stack Web App

Un prodetto simile a Netflix sviluppato come progetto portfolio, con autenticazione JWT, gestione profili, watchlist e molto altro.

## 🛠️ Stack Tecnologico

### Backend
- **Node.js** + **Express.js**
- **MySQL** con **mysql2**
- **JWT** per l'autenticazione
- **bcrypt** per la crittografia delle password
- **dotenv** per le variabili d'ambiente
- **CORS** per la gestione delle origini

### Frontend
- **React** + **Vite**
- **React Router DOM** per la navigazione
- **Fetch API** per le chiamate HTTP
- **CSS** con inline styles e media queries responsive

---

## ✨ Funzionalità

- 🔐 **Autenticazione** — Registrazione e login con JWT
- 👤 **Profili** — Creazione, modifica ed eliminazione profili utente
- 🎬 **Catalogo** — Film e serie TV con dettagli completi
- 📺 **Episodi** — Visualizzazione episodi per ogni serie
- 🎭 **Generi** — Navigazione per genere
- ❤️ **Watchlist** — Aggiunta e rimozione film dalla lista
- 🔍 **Ricerca** — Barra di ricerca con debounce
- 📱 **Responsive** — Ottimizzato per mobile, tablet e desktop
- 🛡️ **Rotte protette** — Accesso alle pagine private solo per utenti loggati

---

## 📁 Struttura del Progetto
```
netflix-clone/
├── back-end/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── usersController.js
│   │   ├── profilesController.js
│   │   ├── moviesController.js
│   │   ├── genresController.js
│   │   ├── episodesController.js
│   │   ├── watchlistController.js
│   │   └── watchHistoryController.js
│   ├── routers/
│   ├── middlewares/
│   ├── data/
│   ├── .env.example
│   └── app.js
├── front-end/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── layouts/
│   │   └── api/
│   └── index.html
└── README.md
```

---

## ⚙️ Installazione

### Prerequisiti
- Node.js >= 18
- MySQL >= 8

### Backend
```bash
cd back-end
npm install
```

Crea il file `.env` partendo da `.env.example`:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=netflix_clone_db
JWT_SECRET=il_tuo_segreto
PORT=3000
```

Importa il database:
```bash
# Importa il file SQL in MySQL Workbench
# File: back-end/database/netflix_clone_db.sql
```

Avvia il server:
```bash
npm run dev
```

### Frontend
```bash
cd front-end
npm install
npm run dev
```

---

## 📡 API Endpoints

### Auth
| Metodo | Endpoint | Descrizione |
|--------|----------|-------------|
| POST | `/auth/register` | Registrazione |
| POST | `/auth/login` | Login |

### Users
| Metodo | Endpoint | Descrizione |
|--------|----------|-------------|
| GET | `/users` | Lista utenti |
| GET | `/users/:id` | Dettaglio utente |
| POST | `/users` | Crea utente |
| PUT | `/users/:id` | Modifica utente |
| DELETE | `/users/:id` | Elimina utente |

### Profiles
| Metodo | Endpoint | Descrizione |
|--------|----------|-------------|
| GET | `/users/:userId/profiles` | Lista profili |
| POST | `/users/:userId/profiles` | Crea profilo |
| PATCH | `/users/:userId/profiles/:id` | Modifica profilo |
| DELETE | `/users/:userId/profiles/:id` | Elimina profilo |

### Movies
| Metodo | Endpoint | Descrizione |
|--------|----------|-------------|
| GET | `/movies` | Lista film |
| GET | `/movies/:id` | Dettaglio film |
| POST | `/movies` | Crea film |
| PUT | `/movies/:id` | Modifica film |
| DELETE | `/movies/:id` | Elimina film |

### Episodes
| Metodo | Endpoint | Descrizione |
|--------|----------|-------------|
| GET | `/movies/:movieId/episode` | Lista episodi |
| GET | `/movies/:movieId/episode/:episode_number` | Dettaglio episodio |
| POST | `/movies/:movieId/episode` | Crea episodio |
| DELETE | `/movies/:movieId/episode/:episode_number` | Elimina episodio |

### Genres
| Metodo | Endpoint | Descrizione |
|--------|----------|-------------|
| GET | `/genres` | Lista generi |
| GET | `/genres/:id` | Film per genere |

### Watchlist
| Metodo | Endpoint | Descrizione |
|--------|----------|-------------|
| GET | `/profiles/:id/watchlist` | Lista watchlist |
| POST | `/profiles/:id/watchlist` | Aggiungi film |
| DELETE | `/profiles/:id/watchlist/:movieId` | Rimuovi film |

---

## 👨‍💻 Autore

**Nicola Pasqua** — Jr Full Stack Web Developer

LinkedIn https://www.linkedin.com/in/nicola-pasqua-3a74853a4/
GitHub https://github.com/Nicolapsq

---
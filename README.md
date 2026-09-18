# dm Job Search – Coding Challenge

A job search web application. Users can search job postings by title, filter by location radius, and browse results with a detail view.

---

## Tech Stack

### Core

| Library      | Version | Purpose                 |
| ------------ | ------- | ----------------------- |
| React        | 19      | UI framework            |
| TypeScript   | 6       | Type safety             |
| Vite         | 8       | Build tool & dev server |
| Tailwind CSS | 4       | Styling                 |

### State & Routing

| Library       | Version | Purpose                                   |
| ------------- | ------- | ----------------------------------------- |
| Redux Toolkit | 2       | Global state management (jobs, filters)   |
| React Redux   | 9       | React bindings for Redux                  |
| React Router  | 7       | Client-side routing (list / detail views) |

### Forms & Data

| Library         | Version | Purpose                           |
| --------------- | ------- | --------------------------------- |
| React Hook Form | 7       | Search and filter form handling   |
| date-fns        | 4       | Date formatting for posting dates |

### Testing

| Library | Version | Purpose          |
| ------- | ------- | ---------------- |
| Vitest  | 5       | Unit test runner |
| Cypress | 16      | End-to-end tests |

### Dev Tooling

| Tool                                   | Purpose                                         |
| -------------------------------------- | ----------------------------------------------- |
| ESLint + typescript-eslint             | Linting                                         |
| Commitizen + cz-conventional-changelog | Conventional commit messages (`npm run commit`) |

---

## Prerequisites

- **Node.js** ≥ 22 (matches the Docker base image)
- **npm** ≥ 10

---

## Local Setup & Start

```bash
# 1. Install dependencies
npm install

# 2. Start the development server (hot-reload at http://localhost:5173)
npm run dev
```

### Other useful commands

```bash
# Production build
npm run build

# Preview the production build locally
npm run preview

# Lint
npm run lint

# Conventional commit helper
npm run commit
```

---

## Running Tests

### Unit tests (Vitest)

```bash
# Watch mode (re-runs on file changes)
npm run test

# Single run (CI-friendly)
npm run test:run
```

Unit tests cover:

- Haversine distance calculation (`src/helpers/tests/getDistanceInKm.test.ts`)
- Pagination logic (`src/hooks/tests/usePagination.test.ts`)
- URL search-param sync (`src/hooks/tests/useJobsParams.test.ts`)

### End-to-end tests (Cypress)

The dev server must be running before launching Cypress.

```bash
# Start the app first
npm run dev

# In a second terminal – open Cypress Test Runner (interactive)
npm run cy:open
```

---

## Docker Setup & Start

The Docker image builds the app and serves the production bundle via `vite preview`.

```bash
# Build the image
docker build -t dm-recruitment .

# Run the container (app available at http://localhost:5173)
docker run -p 5173:5173 dm-recruitment
```

No `docker-compose.yml` is included – a single container is sufficient for this frontend-only app.

---

## Assumptions

I assumed that this component would be a part of a bigger project, and it could be integrated into it. That's why I introduced heavier libraries and decided to use a more modular approach. So the main idea was - this component will be integrated to already existing enterprise project.

---

## Architecture

The main goal was to create a component/view which functionalities (sorting, filtering) can be easily expanded. For the architecture I decided to use React since I have the most experience with it and tasks like this are not experimentation time. I used react redux/toolkit as it is a robust frontend state management library that is an industry standard. When I saw filters I immediately knew I am going to use react-hook-form as it makes working with forms much easier and more pleasant. Same for date-fns with data handling. For cleaner code I defined custom aliases for paths and of course introduced clear naming for folders. I also used prettier and eslint for clean code standards. Probably the most interesting part of the project is handling filters, sorting and pagination through search params. This creates better UX, where you can share links with concrete filters, and also in the future use this for quick loading from backend when the functionality is moved there. Since there are no bigger outer guidelines from the stakeholders, for the component naming size, etc I went with my own preferences. Some of them I would destructure a bit more if I had more time (mentioned in future works). I have also used tailwind, since for me it is a clean modern solution. However I also considered Sass.

---

## Trade-offs

Definitely frontend filtering, which should be handled by backend. Using predefined locations based on data is also a shortcut used for this project but in a working app, an external API or a database would have to be used.

---

## AI Assistance

Claude Code (with Sonnet 4.6 for smaller costs and token output) and Gemini chat bot were used during development. I asked Claude especially for styling and repetitive tasks. For example - I implemented one filter then asked it to implement others based on my first implementation. Similarly with other features. I also asked it to generate me tests. As you can see in the claude file, I asked it not to create tests that I do not ask for, so it won't create a bunch of redundant tests on its own. I used Gemini to verify large chunks of code generated by Claude for some feedback that I might have not noticed while, reviewing it manually.

---

## Time Spent

> Around 8-9 hours. I tried to set up the project, so that it could be developed more in the future. Configuration took a while as a result.

---

## Bonus: Future Architecture

- Add Zod for schema validation
- Get backend people to introduce filters and sorting, so I don't have to filter on frontend.
- Introduce reusable components that are already styled like **ButtonDefault**. Especially useful for inputs that are used in advanced filters.
- Introduce better title search, that includes typos.
- Show recommended jobs first (backend required).
- Add saved filters for future reuse.
- Fix Linter
- Add internationalization (i18n).
- Change **CreateAsyncThunk** to RTK Query data fetching API in redux store.
- Use real APIs for postal codes and locations
- Parametrize filters through configuration file for easier configuration
- And definitely some more features that I can't think of now.

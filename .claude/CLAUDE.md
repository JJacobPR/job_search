# Guidelines

## Code Style

- Use arrow functions for component definitions and utilities.
- Use TypeScript `interface` over `type` for object definitions.
- Avoid default exports; prefer named exports.
- Use aliases from vite.config.ts when importing.
- Keep functions small, modular, and pure where possible.
- Use explicit Props interfaces with standard function .signatures instead of `React.FC` / `React.FunctionComponent`.
- Use `@vitest-environment` for tests.
- Don't create more than needed test cases, unless explicitly asked to do so.

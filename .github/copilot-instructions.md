# Copilot Instructions for Astro Project

## Overview
This document provides essential guidelines for AI coding agents working within this Astro project. Understanding the architecture, workflows, and conventions will enable effective contributions.

## Project Structure
The project follows a standard Astro structure:
- **public/**: Contains static assets like images and favicons.
- **src/**: Main source directory containing:
  - **assets/**: Static assets used in the project.
  - **components/**: Reusable components, e.g., `Welcome.astro`.
  - **layouts/**: Layout components, e.g., `Layout.astro`.
  - **pages/**: Page components, e.g., `index.astro`.

Refer to the [Astro documentation](https://docs.astro.build/en/basics/project-structure/) for more details.

## Developer Workflows
### Commands
- **Install dependencies**: `npm install`
- **Start development server**: `npm run dev` (available at `localhost:4321`)
- **Build for production**: `npm run build` (output in `./dist/`)
- **Preview build**: `npm run preview`
- **Run Astro CLI commands**: `npm run astro ...`

### Testing and Debugging
- Ensure to run tests after making changes. Use `npm test` if configured.
- Debugging can be done using browser developer tools or by adding console logs in components.

## Patterns and Conventions
- Components should be reusable and follow naming conventions (PascalCase).
- Use CSS modules for styling components to avoid global scope issues.

## Integration Points
- The project integrates with various external services via API calls. Check the `src/components` for examples of how to handle API responses.

## Conclusion
This document should serve as a starting point for AI agents to understand the project structure and workflows. For further assistance, refer to the [Astro documentation](https://docs.astro.build) or the project's README.md for specific commands and configurations.
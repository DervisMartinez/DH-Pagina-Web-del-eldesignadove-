# Clean Architecture - Features

Cada carpeta dentro de `features` representa un módulo de dominio o "Feature" (ej: `auth`, `products`, `users`).

Cada módulo debe seguir la siguiente estructura basada en SOLID y Clean Architecture:

- **domain**: Entidades, Modelos de datos, e Interfaces (Contratos). No debe tener dependencias externas (solo TypeScript).
- **application**: Casos de uso (Lógica de negocio). Depende del `domain`. Aquí van los servicios y validaciones de negocio.
- **infrastructure**: Implementaciones concretas de las interfaces del `domain` (Ej: Repositorios usando Fetch/Axios, adaptadores de LocalStorage). Depende de `domain` y librerías externas.
- **presentation**: Componentes de UI (React), Hooks, y ViewModels específicos de este módulo. Depende de `application`.

Esto asegura el cumplimiento de:

- **SRP (Single Responsibility Principle)**: Separación de UI, Lógica y Datos.
- **DIP (Dependency Inversion Principle)**: La lógica depende de abstracciones (interfaces del `domain`) y no de implementaciones (`infrastructure`).

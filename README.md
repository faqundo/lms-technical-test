
# Technical Test: LMS Service


# LMS Service

## Introduction

This is a technical test designed to demonstrate the ability to create an LMS (Learning Management System) service. The service manages the creation of courses and tracks the completion of lessons for users. Two main approaches were considered:
1. **One level of modules**: A flat structure where each course contains modules, and each module contains lessons.
2. **Infinite levels of modules**: A hierarchical structure where modules can contain submodules, and submodules can contain lessons.

We implemented the **one level of modules** approach, ensuring simplicity and clarity in the data model while maintaining flexibility for future enhancements.

- One level of modules. Example:
  - Course 1:
    - Module 1
      - Lesson 1.1
      - Lesson 1.2
      - Lesson 1.3
    - Module 2
      - Lesson 2.1
      - Lesson 2.2
    - Module 3
      - Lesson 3.1
      - Lesson 3.2

The service stores data in a relational database (MySQL) using TypeORM as the ORM. Additionally, we adopted a layered architecture inspired by **Clean Architecture** to ensure separation of concerns and maintainability.

---

## Features Implemented

- **Course Management**:
  - Create, update, delete, and retrieve courses.
  - Each course contains multiple modules, and each module contains multiple lessons.

- **Lesson Completion Tracking**:
  - Track lesson completions for users.
  - Calculate the total number of lessons, completed lessons, and completion percentage for each course.

- **Caching with Redis**:
  - Cache frequently accessed data (e.g., course lists) to improve performance and reduce database load.

- **Integration Tests**:
  - Comprehensive integration tests for the `/courses` endpoints using a real database and Redis.

---

## Technologies Used

- **Node.js**: Backend runtime environment.
- **Express**: Web framework for handling HTTP requests and responses.
- **TypeORM**: Object-Relational Mapping (ORM) library for interacting with the MySQL database.
- **MySQL**: Relational database for storing course, module, lesson, and user progress data.
- **Redis**: In-memory data store used for caching to optimize response times.
- **Docker & Docker Compose**: Containerization tools for setting up the development environment with a single command.

---

## Project Structure

The project follows a layered architecture inspired by **Clean Architecture**, with the following structure:


### Running the project
To run the project you need to have Docker and Docker Compose installed. After that, you can run the following commands in the root of the project:

Start docker:

```bash
# MacOS
make 

# Windows
docker compose up -d --build
```

Install the dependencies:

```bash
# MacOS
make install

# Windows
docker-compose exec node npm install
```

Run the node server:

```bash
# MacOS
make run

# Windows
docker-compose exec node npm run dev
```

Run the test suite:

```bash
# MacOS
make test

# Windows
docker-compose exec node npm run test
```



### **Key Decisions**

1.  **ORM: TypeORM**
    
    -   **Why** : TypeORM was chosen because it supports multiple databases (e.g., MySQL, PostgreSQL, SQLite) and provides a robust set of features for managing database interactions.
    -   **Advantages** :
        -   Easy migration management.
        -   Strong typing and compatibility with TypeScript.
        -   Flexible query builder and repository pattern.
2.  **Adoption of Clean Architecture**
    
    -   **Principles** :
        -   **Domain Layer** : Contains core entities (`Course`, `Module`, `Lesson`) and business logic.
        -   **Application Layer** : Implements specific business rules and orchestrates interactions between layers.
        -   **Infrastructure Layer** : Handles database connections, caching, and external services.
        -   **Interface Layer** : Defines routes, controllers, and other interaction points.
    -   **Benefits** :
        -   Clear separation of concerns.
        -   Improved testability and maintainability.
        -   Flexibility to replace technologies without affecting core logic.
3.  **Caching with Redis**
    
    -   **Why** : Redis was added to cache frequently accessed data (e.g., course lists) and reduce the load on the database.
    -   **Implementation** :
        -   Integrated Redis into the `/courses` endpoint to cache course data.
        -   Configured Redis in `docker-compose.yml` for seamless setup.
    -   **Advantages** :
        -   Faster response times for cached data.
        -   Reduced database queries for repeated requests.

----------

### **Endpoints**

#### **Courses**

-   **POST /api/courses** : Create a new course.
-   **GET /api/courses** : Get a list of all courses.
-   **GET /api/courses/:id** : Get details of a specific course, including its modules and lessons.
-   **PUT /api/courses/:id** : Update details of a specific course.
-   **DELETE /api/courses/:id** : Delete a specific course.

#### **Lesson Completion**

-   **POST /api/completions** : Mark a lesson as completed for a specific user.

----------

### **Testing**

#### **Integration Tests**

-   Comprehensive integration tests for the `/courses` endpoints.
-   Tests include scenarios such as:
    -   Creating a course.
    -   Retrieving a course with populated modules and lessons.
    -   Updating and deleting a course.
    -   Calculating lesson completion percentages.

#### **Test Execution**

# MacOS

make test

# Windows

docker-compose exec node npm run test

----------

### **Additional Notes**

-   **Error Handling** : Centralized error handling ensures consistent responses across all endpoints.
-   **DTOs** : Data Transfer Objects (DTOs) are used to format responses and expose only necessary fields to the client.
-   **Validation** : Input validation is performed at both the controller and entity levels to ensure data integrity.

----------

### **Future Improvements**

-   **Asynchronous Processing** : Consider integrating RabbitMQ or another message broker to handle lesson completions asynchronously.
-   **Pagination** : Add pagination support for endpoints that return large datasets.
-   **Authentication & Authorization** : Implement user authentication and role-based access control for secure interactions.

----------

### **Conclusion**

This project demonstrates a clean and modular implementation of an LMS service, adhering to best practices in software architecture and leveraging modern technologies like TypeORM and Redis. The solution is scalable, maintainable, and ready for further enhancements.


## Diagram example (Clean Architecture)
src/
├── application/                  # Capa de aplicación
│   ├── usecases/                 # Casos de uso
│   │   ├── CreateCourseUseCase.ts  # Crear un curso
│   │   ├── GetCourseUseCase.ts    # Obtener un curso
│   │   ├── CompleteLessonUseCase.ts # Marcar una lección como completada
│   │   └── GetUserProgressUseCase.ts # Obtener el progreso de un usuario
│   │
│   └── interfaces/               # Interfaces abstractas
│       ├── ICourseRepository.ts    # Contrato para el repositorio de cursos
│       ├── IModuleRepository.ts    # Contrato para el repositorio de módulos
│       ├── ILessonRepository.ts    # Contrato para el repositorio de lecciones
│       └── IUserProgressRepository.ts # Contrato para el progreso del usuario
│
├── domain/                       # Capa de dominio
│   ├── entities/                 # Entidades del dominio
│   │   ├── Course.ts             # Modelo Course con atributos y validaciones
│   │   ├── Module.ts             # Modelo Module
│   │   ├── Lesson.ts             # Modelo Lesson
│   │   └── UserProgress.ts       # Modelo UserProgress
│   │
│   └── exceptions/               # Excepciones de dominio
│       ├── InvalidCourseError.ts   # Ejemplo: Excepción para cursos inválidos
│       └── InvalidLessonError.ts   # Ejemplo: Excepción para lecciones inválidas
│
├── infrastructure/               # Capa de infraestructura
│   ├── persistence/              # Implementaciones de persistencia
│   │   ├── CourseRepository.ts     # Repositorio TypeORM para Cursos
│   │   ├── ModuleRepository.ts     # Repositorio TypeORM para Módulos
│   │   ├── LessonRepository.ts     # Repositorio TypeORM para Lecciones
│   │   └── UserProgressRepository.ts # Repositorio TypeORM para Progreso
│   │
│   └── web/                      # Configuración del servidor
│       └── ExpressServer.ts      # Configuración de Express
│
├── interfaces/                   # Interfaces específicas (HTTP, CLI, etc.)
│   ├── http/                     # Interfaz HTTP
│   │   ├── controllers/          # Controladores
│   │   │   ├── CourseController.ts # Controlador para endpoints de Curso
│   │   │   ├── ModuleController.ts # Controlador para endpoints de Módulo
│   │   │   └── LessonController.ts # Controlador para endpoints de Lección
│   │   └── routes/               # Rutas
│   │       ├── courseRoutes.ts     # Rutas relacionadas con Curso
│   │       ├── moduleRoutes.ts     # Rutas relacionadas con Módulo
│   │       └── lessonRoutes.ts     # Rutas relacionadas con Lección
│   │
│   └── cli/                      # Interfaz CLI (opcional)
│       └── SeedCommand.ts        # Ejemplo: Comando para sembrar datos iniciales
│
└── tests/                        # Pruebas
    ├── unit/                     # Pruebas unitarias
    │   ├── application/          # Pruebas para casos de uso
    │   │   ├── CreateCourseUseCase.test.ts
    │   │   ├── GetCourseUseCase.test.ts
    │   │   └── CompleteLessonUseCase.test.ts
    │   └── domain/               # Pruebas para entidades
    │       ├── CourseEntity.test.ts
    │       ├── ModuleEntity.test.ts
    │       └── LessonEntity.test.ts
    │
    └── integration/              # Pruebas de integración
        ├── controllers/          # Pruebas para controladores
        │   ├── CourseController.test.ts
        │   ├── ModuleController.test.ts
        │   └── LessonController.test.ts
        └── infrastructure/       # Pruebas para repositorios y servicios
            ├── CourseRepository.test.ts
            ├── ModuleRepository.test.ts
            └── LessonRepository.test.ts


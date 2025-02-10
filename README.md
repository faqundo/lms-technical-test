
# Technical Test: LMS Service

### Introduction
This is a technical test that is designed to test your ability to create a LMS (Learning Management System) service. The service should be able to manage the creation of courses and completion (given an userId) of courses. There are two main ways to solve it and that will show us your level of knowledge in algorithms and data structures:
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
- Infinite levels of modules. Example:
  - Course 1:
    - Module 1
      - Lesson 1.1
      - Lesson 1.2
      - Lesson 1.3
      - Module 1.1
        - Lesson 1.1.1
        - Lesson 1.1.2
        - Lesson 1.1.3
        - Module 1.1.1
          - Lesson 1.1.1.1
          - Lesson 1.1.1.2
    - Module 2
      - Lesson 2.1
      - Lesson 2.2
    - Module 3
      - Lesson 3.1
      - Lesson 3.2

The minimal requirements for the service can be found in project code. You can create new endpoints, entities (models) and services if you want.
You need to store the data in a database. You can use MySQL or MongoDB but you need to use it in a relation way (not NoSQL way). This means cannot be tables / collections with nested objects, arrays, etc.

With this technical review, we are looking to see what is your level of knowledge. There are tens of ways to implement this service, and we are looking for the best way you can do it. 
Feel free to use any library, technology (Redis, RabbitMQ, etc) or pattern you want in order to achieve the best result. For example, you may want to use some kind of caching mechanism to improve the performance of the service or use some kind of message broker to handle the completion of courses asynchronously. Just do a brief explanation of why you choose to use it in a Markdown file or in the code. Only requirement is that you need to add the technology in the docker-compose file in order to up the service with a single command.

Also, we want to see how you write tests and how you name them. You are required to write integration test (with a real database and the other technologies you choose) of the `/courses` endpoints.

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


additional modules:

ORM: TypeORM
Elegí TypeORM porque es un ORM que soporta múltiples bases de datos, lo cual es muy útil para este caso, ya que podríamos cambiar a MongoDB o a cualquier otra base de datos relacional sin problemas.

typeorm: El ORM principal.
mysql2: El driver de MySQL compatible con TypeORM.
reflect-metadata: Necesario para que TypeORM funcione con decoradores.

Adopción de arquitectura basada en capas (Clean Architecture):
Principios Clave:
Capa de Dominio : Contiene las entidades y casos de uso centrales del sistema.
Capa de Aplicación : Implementa la lógica de negocio específica del sistema.
Capa de Infraestructura : Maneja detalles técnicos como bases de datos, APIs externas, etc.
Capa de Presentación : Controla las interacciones con el usuario (en este caso, las rutas y controladores).

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
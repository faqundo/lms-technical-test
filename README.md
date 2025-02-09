
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



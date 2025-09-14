# Backend API

This directory contains the Node.js backend for the student management system.

## Project Architecture

The backend follows a layered architecture to ensure a clean separation of concerns, making the codebase maintainable and scalable.

-   **`src/routes`**: Defines the API endpoints and maps them to the appropriate controller functions.
-   **`src/controllers`**: Handles the HTTP request and response cycle. It extracts data from requests and calls the corresponding service layer functions.
-   **`src/services`**: Contains all the business logic and database interactions. This layer is completely decoupled from the web layer (Express).
-   **`src/config`**: Manages application configuration, such as the Prisma Client instance.
-   **`src/middlewares`**: Contains middleware functions, including the global error handler.
-   **`src/utils`**: Holds utility classes and functions, like the custom `ApiError` class.

## API Endpoints

All endpoints are prefixed with the base path: `/api/v1`.

---

### **Carreras Resource**

Base Path: `/api/v1/carreras`

This resource manages academic careers.

#### `GET /carreras`

-   **Description:** Retrieves a list of all careers.
-   **Success Response:** `200 OK`
    ```json
    [
      {
        "id": 1,
        "nombre": "Ingeniería de Software"
      },
      {
        "id": 2,
        "nombre": "Diseño Gráfico"
      }
    ]
    ```

#### `GET /carreras/:id`

-   **Description:** Retrieves a single career by its unique ID.
-   **URL Parameters:**
    -   `id` (integer, required): The ID of the career.
-   **Success Response:** `200 OK`
    ```json
    {
      "id": 1,
      "nombre": "Ingeniería de Software"
    }
    ```
-   **Error Response:** `404 Not Found` if the career does not exist.

#### `POST /carreras`

-   **Description:** Creates a new career.
-   **Request Body:**
    ```json
    {
      "nombre": "Administración de Empresas"
    }
    ```
-   **Success Response:** `201 Created`
    ```json
    {
      "id": 3,
      "nombre": "Administración de Empresas"
    }
    ```

#### `PATCH /carreras/:id`

-   **Description:** Updates an existing career's information.
-   **URL Parameters:**
    -   `id` (integer, required): The ID of the career to update.
-   **Request Body:**
    ```json
    {
      "nombre": "Ingeniería en Sistemas Computacionales"
    }
    ```
-   **Success Response:** `200 OK`
    ```json
    {
      "id": 1,
      "nombre": "Ingeniería en Sistemas Computacionales"
    }
    ```

#### `DELETE /carreras/:id`

-   **Description:** Deletes a career by its ID.
-   **URL Parameters:**
    -   `id` (integer, required): The ID of the career to delete.
-   **Success Response:** `204 No Content`

---

### **Alumnos Resource**

Base Path: `/api/v1/alumnos`

This resource manages students.

#### `GET /alumnos`

-   **Description:** Retrieves a list of all students, including their assigned career information.
-   **Success Response:** `200 OK`
    ```json
    [
      {
        "id": 1,
        "nombre": "Roberto",
        "apellidos": "Gomez",
        "carreraId": 1,
        "carrera": {
          "id": 1,
          "nombre": "Ingeniería de Software"
        }
      }
    ]
    ```

#### `GET /alumnos/:id`

-   **Description:** Retrieves a single student by ID, including their assigned career.
-   **URL Parameters:**
    -   `id` (integer, required): The ID of the student.
-   **Success Response:** `200 OK`
    ```json
    {
      "id": 1,
      "nombre": "Roberto",
      "apellidos": "Gomez",
      "carreraId": 1,
      "carrera": {
        "id": 1,
        "nombre": "Ingeniería de Software"
      }
    }
    ```
-   **Error Response:** `404 Not Found` if the student does not exist.

#### `POST /alumnos`

-   **Description:** Creates a new student.
-   **Request Body:**
    ```json
    {
      "nombre": "Ana",
      "apellidos": "Martinez",
      "carreraId": 2
    }
    ```
-   **Success Response:** `201 Created`
    ```json
    {
      "id": 2,
      "nombre": "Ana",
      "apellidos": "Martinez",
      "carreraId": 2
    }
    ```

#### `PATCH /alumnos/:id`

-   **Description:** Updates an existing student's information.
-   **URL Parameters:**
    -   `id` (integer, required): The ID of the student to update.
-   **Request Body:** (All fields are optional)
    ```json
    {
      "apellidos": "Perez",
      "carreraId": 1
    }
    ```
-   **Success Response:** `200 OK`
    ```json
    {
      "id": 2,
      "nombre": "Ana",
      "apellidos": "Perez",
      "carreraId": 1
    }
    ```

#### `DELETE /alumnos/:id`

-   **Description:** Deletes a student by ID.
-   **URL Parameters:**
    -   `id` (integer, required): The ID of the student to delete.
-   **Success Response:** `204 No Content`

---

## Error Handling

The API uses a standardized error response format for all client and server errors.

**Example Error Response (`404 Not Found`):**

```json
{
  "success": false,
  "message": "Alumno not found",
  "stack": "Error: Alumno not found at getAlumnoById (/app/src/services/alumno.service.js:31:11)
    ..."
}
```

-   The `stack` property is only included in non-production environments for easier debugging.
-   **Common Status Codes:**
    -   `400 Bad Request`: For validation errors or malformed requests (not implemented yet, but reserved).
    -   `404 Not Found`: When a requested resource does not exist.
    -   `500 Internal Server Error`: For unexpected server-side errors.
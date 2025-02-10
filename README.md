# Gestor Académico
El proyecto consiste en una aplicación de ambiente web (solamente Backend) la cual servirá para poder llevar la administración del control de alumnos de un centro educativo. 

# API Endpoints

## Autenticación

### Registrar Usuario
- **URL**: `http://localhost:3002/academicSystem/v1/auth/register`
- **Método**: `POST`
- **Cuerpo**:
```json
{
  "name": "string",
  "surname": "string",
  "username": "string",
  "email": "string",
  "password": "string",
  "profilePicture": "file",
  "phone": "string",
  "role": "string"
}

```

### **Iniciar Sesión**
- **URL**: `http://localhost:3002/academicSystem/v1/auth/login`
- **Método**: `POST`
- **Cuerpo**:
```json
{
  "email": "string",
  "password": "string"
}
```
- **Notas**: Si se desea registrar un alumno, el rol es por default. Si se desea registrar un profesor, se debe colocar el rol.


---

### **ALUMNOS**

#### Asignación de Cursos
- **URL**: `http://localhost:3002/academicSystem/v1/course/assignCourse`
- **Método**: `POST`
- **Cuerpo**:
```json
{
  "userId": "ID de Usuario",
  "nameCourse": "string"
}
```

#### Visualizar Cursos Asignados
- **URL**: `http://localhost:3002/academicSystem/v1/course/student/:uid/courses`
- **Método**: `GET`

#### Editar Perfil
- **URL**: `http://localhost:3002/academicSystem/v1/user/updateUser/:uid`
- **Método**: `PUT`
- **Cuerpo**:
```json
{
  "name": "string",
  "surname": "string",
  "username": "string1",
  "email": "string1@gmail.com",
  "phone": "09872122"
}
```
- **Notas**: Se pueden actualizar los atributos que se deseen, incluyendo la contraseña.

#### Eliminar Perfil
- **URL**: `http://localhost:3002/academicSystem/v1/user/deleteUser/:uid`
- **Método**: `DELETE`

---

### **PROFESOR**

#### Crear Curso
- **URL**: `http://localhost:3002/academicSystem/v1/course/createdCourse`
- **Método**: `POST`
- **Cuerpo**:
```json
{
  "userId": "ID profesor",
  "nameCourse": "string",
  "description": "string"
}
```

#### Visualizar Cursos Asignados
- **URL**: `http://localhost:3002/academicSystem/v1/course/teacher/:uid/courses`
- **Método**: `GET`

#### Editar Curso
- **URL**: `http://localhost:3002/academicSystem/v1/course/updateCourse/:uid`
- **Método**: `PUT`
- **Cuerpo**:
```json
{
  "nameCourse": "string",
  "description": "string"
}
```

#### Eliminar Curso
- **URL**: `http://localhost:3002/academicSystem/v1/course/deleteCourse/:uid`
- **Método**: `DELETE`


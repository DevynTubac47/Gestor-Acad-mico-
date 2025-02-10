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

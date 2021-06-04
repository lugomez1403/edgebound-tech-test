# CRUD Node js, express y mongodb

Clonal el proyecto y realizar npm install

realizar: 
    npm run dev para el ambiente de desarrollo
    npm run statrt para el ambiente de producción

Proyecto creado con:
    Node js
    Express
    Mongodb

Se usa: 
    Un motor de plantillas llamado handlebar
    bcrypt para encriptar la contraseña a la base de datos
    flash para enviar mensajes al usuario
    espress-session para gestionar la sesión del usuario
    mongose para gestionar las conexiones con Mongodb
    passport midelware de autenticación

CREACION DE NUEVOS USUARIOS

Ir a la página de signup para registrar nuevos usuarios:

    * La contraseña debe tener más de 4 digitos
    * Asignar un rol: admin o user
                * admin: puede crear nuevas ordenes, editar status, editar las ordenes
                * user: sólo puede ver las ordenes y su detalle

INGRESAR AL SISTEMA

Ir a la página de signin para ingresar al sistema con las credenciales de los usuarios creados


ACCIONES

Una vez dentro del sistema:

Si es admin:
    * Podra añadir ordenes dentro de la pestaña orders/ add orders
    * Podra editar la ordenes
    * Podra editar el status

Si es user:
    * Podra ver las ordenes y sus detalles
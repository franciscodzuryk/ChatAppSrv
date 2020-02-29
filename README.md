# ChatAppSrv

### Descripción
Servicio Web para un sistema de chat entre una empresa y sus clientes. Permite la comunicación entre N usuarios y una compañía.
El objetivo de este servicio es puramente académico y con fines educativos. Puede ver el front-end de iOS en este repositorio:

https://github.com/franciscodzuryk/ChatApp

### Requisitos:
Descargue e instale Node JS desde:
https://nodejs.org/

### Características:
Toda la información es guardad en memoria, NO en base de datos. Esto responde al uso académico del servicio. Si se detiene y se vuelve a ejecutar, comienza desde cero, sin datos de usuarios, compañia o mensajes.

Puede ejecutarse en modo seguro, utilizando https. Este modo NO se recomienda ya que iOS no permite utilizar certificados no seguros.

### API:

#####  POST '/user/login' 
Ejecuta el login de un usuario.

* Request Body:
```json
{
    "name": "Fran1984"
}
```
* Response Body:
```json
{
    "name": "Fran1984",
    "id": 0,
    "available": true,
    "msgsCount": 0
}
```
#####  POST '/user/:id_user/logout'
Hace logout de un usuario identificandolo por ID (:id_user).

#####  GET '/user/' 
Devuelve la lista de usuarios logueados.
* Response Body:
```json
[
    {
        "name": "Fran1984",
        "id": 0,
        "available": true,
        "msgsCount": 0
    },
    {
        "name": "Some User",
        "id": 1,
        "available": true,
        "msgsCount": 0
    }
]
```

#####  POST '/user/:id_user/message'
Envía un mensaje a un usuario, se identifica al usuario por ID (:id_user).

* Request Body:
```json
{
    "id": 0,
    "message": "Some message"
}
```
* Response Body:
```json
{
    "status": 1
}
```

#####  GET '/user/:id_user/message'
Devuelve toda la lista de mensajes de un usuario identificado por ID (:id_user).
Una vez devuelta la lista de mensajes, estos son eliminados del servidor; se quitan para liberar memoria.

* Response Body:
```json
[
    {
        "id": 0,
        "message": "Some message"
    },
    {
        "id": 0,
        "message": "Some message 2"
    }
]
```
#####  POST '/company/login', company.login);
Ejecuta el login de la compañia.

> Corrección pendiente: debe volver a loguear la misma compañia. De momento hace un nuevo login, esto es un error.

*  Request Body:
```json
{
    "name": "Johnny B. Goode Co."
}
```
* Response Body:
```json
{
    "name": "Johnny B. Goode Co.",
    "status": 1
}
```

#####  POST '/company/logout', company.logout);
Hace logout de la compañía.

#####  GET '/company/status', company.status);
Devuelve el estado de la Compañia.
* Response Body:
```json
{
    "name": "Johnny B. Goode Co.",
    "status": 1
}
```

#####  POST '/company/message', company.sendMessage);
Envía un mensaje a la compañía.
* Request Body:
```json
{
    "id": 0,
    "message": "Some message for Company."
}
```
* Response Body:
```json
{
    "status": 1
}
```

#####  GET '/company/message', company.getAllMessages);
Devuelve toda la lista de mensajes de la Compañía.
>  Una vez devuelta la lista de mensajes, estos son eliminados del servidor; se quitan para liberar memoria.

* Response Body:
```json
[
    {
        "userId": 0,
        "msgs": [
            {
                "user_id": 0,
                "message": "Some message for Company."
            },
            {
                "user_id": 0,
                "message": "Another message for Company..."
            }
        ]
    }
]
```

#####  GET '/company/message/user/:id_user', company.getMessages);
Devuelve la lista de mensajes de la Compañía que fueron enviados por un usuario específico identificado por ID (:id_user).
> Una vez devuelta la lista de mensajes, estos son eliminados del servidor; se quitan para liberar memoria. SOLO se eliminan los mensajes del usuario especificado por ID (:id_user).

* Response Body:
```json
[
    {
        "user_id": 1,
        "message": "Some message for Company."
    },
    {
        "user_id": 1,
        "message": "Another message for Company..."
    }
]
```

### Ejecutar el servidor:
Descargue e instale NODE JS. Desde:

https://nodejs.org/

### Comandos para descargar el proyecto; ejecute en un terminal:

```sh
$ git clone https://github.com/franciscodzuryk/ChatAppSrv.git
$ cd ChatAppSrv/
$ npm install
```


### Ejecutar el servicio:
Modo NO seguro:
```sh
$ node app.js 
```
Motrará: 'Node server running on http://xxx.xxx.xxx.xxx:8443' es la BASE URL con su correspondiente puerto, es donde el servidor escuchará los requests descriptos anteriormente.

Modo seguro:
```sh
$ node app.js https
```

Motrará: 'Node server running on https://xxx.xxx.xxx.xxx:8443'
ESTE MODO NO SE RECOMIENDA. En iOS no se permite el uso de certificados no seguros.


##### Una vez inicializado, muestra la ip local. Esta ip es el BASE URL que debe utilizar en el front-end.



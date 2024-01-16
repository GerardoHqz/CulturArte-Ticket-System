# Documentacion de CulturAte 

## Descripción de la aplicación 

CulturArte es una plataforma web innovadora que permite a los usuarios comprar y vender una amplia variedad de eventos culturales y artísticos. Ya sea que estés interesado en música, arte, literatura o foros de discusión, culturArte ofrece una experiencia única para descubrir y participar en eventos de alta calidad y de gran interés.

Con una interfaz intuitiva y fácil de usar, culturArte brinda a los usuarios la oportunidad de explorar una amplia gama de eventos disponibles, desde conciertos en vivo y exposiciones de arte hasta talleres de escritura y presentaciones literarias. Los usuarios pueden navegar por las diferentes categorías, filtrar los eventos según sus preferencias y realizar compras de manera segura y conveniente.

La aplicación culturArte también cuenta con un área exclusiva para empleados, donde se lleva a cabo la gestión integral de la plataforma. Los empleados tienen privilegios especiales que les permiten administrar usuarios, supervisar eventos, realizar seguimiento de ventas y garantizar un funcionamiento óptimo de la aplicación. Esto asegura que cada evento ofrecido en culturArte cumpla con altos estándares de calidad y proporcione una experiencia satisfactoria para todos los usuarios.

### Principales características y funciones de culturArte:

° Búsqueda y exploración de eventos: Los usuarios pueden buscar eventos por categoría, eventos pasados y eventos proximos, lo que les permite descubrir eventos que se adapten a sus intereses y preferencias o simplemente conocer eventos que se han promocionado en la aplicacion.

° Compra y venta de entradas: Los usuarios pueden comprar entradas de manera segura a través de la plataforma, lo que les brinda acceso garantizado a los eventos que deseen. 

° Canjear tickes: Al comprar una entrada se le otorga un ticket digital, el cual puede canjear al momomento del evento y este generara un codigo QR que puede presentar para disfrutar de su evento.

° Transferir tickets: Los usuarios pueden transferir sus tickets a otros usuarios, con el fin de que si 
deseas hacer un regalo o no quieres desperdiciar tu ticket lo puedes regalar a otra persona.

° Notificaciones y recordatorios: Los usuarios recibirán notificaciones y recordatorios sobre eventos relevantes, fechas límite de compra de entradas y actualizaciones importantes relacionadas con los eventos en los que estén interesados.

° Área de empleados: Los empleados tienen acceso exclusivo a un panel de control donde pueden gestionar usuarios, eventos, ventas, estadsiticas y realizar tareas administrativas importantes.

° Gestion de permisos: para una mayor distribucion de personal, el area de empleados esta seccionada por permisos, donde cada empleado puede tener distintas funcionalidades como validar tickets, crear y editar eventos, asignar personal a los eventos, consultar estadisticas de los eventos para la generacion de reportes, suspender cuentas de usuarios, gestionar los permisos de los usuarios, desactivar los serivicios. Todo estos son servicios los cuales dependeran de la administracion de personal que desees.


CulturArte es la plataforma ideal para los amantes del arte y la cultura, brindando una experiencia única para descubrir, participar y disfrutar de eventos significativos en un entorno seguro y confiable. Ya sea que desees asistir a un concierto de tu banda favorita, sumergirte en el mundo de la literatura o explorar nuevas formas de expresión artística, culturArte te ofrece todo en un solo lugar.

## Instalación de CulturArte

Para utilizar el proyecto CulturArte, asegúrate de tener los siguientes requisitos previos:

- Node.js: Descarga e instala Node.js desde el sitio web oficial: [https://nodejs.org](https://nodejs.org)
- NPM: Node.js incluye NPM (Node Package Manager), que se utiliza para instalar las dependencias del proyecto.
- IDE (Entorno de desarrollo integrado): Puedes utilizar cualquier IDE de tu preferencia, como Visual Studio Code, WebStorm, Atom, etc.

Sigue los pasos a continuación para instalar y ejecutar el CulturArte:

### Paso 1: Clonar el repositorio

Clona el repositorio de CulturArte en tu máquina local utilizando Git o descargándolo directamente desde el repositorio.

### Paso 2: Instalar dependencias

Abre una terminal y navega hasta el directorio del proyecto `Client/culturarte.app/culturArte`.


Ejecuta el siguiente comando para instalar las dependencias del proyecto:

`npm install`

Este comando instalará todas las dependencias necesarias para ejecutar la aplicación.

### Paso 3: Levantar el cliente

Una vez que se hayan instalado las dependencias, puedes iniciar el cliente de CulturArte con el siguiente comando:

`npm start`


Esto iniciará el servidor de desarrollo del cliente y la aplicación se abrirá en tu navegador predeterminado en la dirección `http://localhost:3000`. Cualquier cambio que realices en los archivos se actualizará automáticamente en el navegador.

### Paso 4: Conexión con la base de datos y API

Para conectar el cliente de CulturArte a la base de datos y la API, deberás crear una instancia local siguiendo la documentación proporcionada. Aquí debes agregar los pasos específicos o enlaces a la documentación correspondiente para configurar la base de datos y la API en tu entorno local.

¡Listo! Ahora tienes el proyecto CulturArte instalado y en funcionamiento en tu máquina local. Puedes comenzar a explorar y desarrollar la aplicación.


## Guia de instalacion y documentacion de API CulturArte

La API CulturArte cumple la función de ejecutar los servicios de la aplicación web CulturArte y proporcionar datos de la base de datos a la aplicación web. A continuación, se presentan las instrucciones para la instalación y configuración local de la API.

### Requisitos previos

Antes de proceder con la instalación, asegúrate de cumplir con los siguientes requisitos:

- JDK 17 instalado en tu máquina
- Docker instalado para crear y ejecutar contenedores
- Un IDE de preferencia como Spring Boot Suite, IntelliJ IDEA o Eclipse

### Instrucciones de desarrollo

1. Ejecuta el archivo `DB CulturArte.sql` que se encuentra en la carpeta del proyecto. Este archivo contiene el script de la base de datos y el comando para crear un contenedor de Docker.

2. Abre una consola de Windows y ejecuta el siguiente comando de Docker para crear un contenedor de PostgreSQL:

`docker run --name <nombre-contenedor> -e POSTGRES_USER=<usuario> -e POSTGRES_PASSWORD=<contraseña> -e POSTGRES_DB=<nombre-base-datos> -p 5432:5432 -d postgres`


Asegúrate de reemplazar `<nombre-contenedor>`, `<usuario>`, `<contraseña>` y `<nombre-base-datos>` con los valores deseados.

3. Conéctate a la base de datos utilizando una herramienta como DBeaver y crea la base de datos utilizando el script proporcionado en el paso 1.

4. Abre el proyecto `CulturArteAPI` en tu IDE y ejecútalo como una aplicación Spring Boot. Esto iniciará la API en tu entorno local.

5. Puedes consumir y probar la API utilizando las rutas definidas en el archivo `CulturArte-API-Routes.json`. Importa este archivo en tu cliente de preferencia para conocer todas las rutas disponibles.

### Información adicional

La API utiliza las siguientes librerías y tecnologías:

- `spring-boot-starter-oauth2-client` para la autenticación con Google mediante OAuth2.
- `spring-security` para la protección de rutas y la validación de usuarios.
- `spring-data-jpa` para el soporte de acceso a la base de datos con JPA.
- `spring-validation` para la validación de datos de entrada en los controladores.
- `jsonwebtoken` para la generación y validación de tokens JWT.
- `JavaMail` para el envío de correos electrónicos.

Además, se recomienda consultar la documentación de Spring Boot y Spring Security para obtener más información sobre el uso de estas librerías y sus configuraciones específicas.

¡Listo! Ahora tienes la API CulturArte instalada y ejecutándose localmente. Puedes comenzar a consumir los servicios y probar su funcionalidad.

Recuerda que esta es una guía básica de instalación y configuración. Para obtener información más detallada sobre el uso de la API, los parámetros de las rutas y otras características, consulta la documentación completa en: 
- https://app.swaggerhub.com/templates-docs/GERARDOHENRIQUEZSV/CulturArteAPI/1.0.0

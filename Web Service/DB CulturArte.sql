-- comando para docker
-- docker run --name CulturArte -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=9L^k3N@Jm!s2P -e POSTGRES_DB=culturarte -p 5432:5432 -d postgres
 
-- Crear la tabla USERS
CREATE TABLE USERS (
    user_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR null,
    state BOOLEAN NOT NULL DEFAULT TRUE
);
alter table USERS alter column password DROP NOT NULL;
-- Crear la tabla PERMISSION
CREATE TABLE PERMISSIONS (
    permission_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name_permission VARCHAR(30) UNIQUE  NOT NULL
);

-- Crear la tabla CATEGORY
CREATE TABLE CATEGORY (
    category_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name_category VARCHAR(20) UNIQUE NOT NULL,
    color VARCHAR(10) NOT NULL
);

-- Crear la tabla SPONSORSHIP
--delete from sponsorship 
--drop table sponsorship 
--select * from sponsorship
CREATE TABLE SPONSORSHIP (
    sponsorship_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name_sponsorship VARCHAR(30) UNIQUE NOT NULL,
    logo UUID NOT NULL
);
--

-- Crear la tabla IMAGE
CREATE TABLE IMAGE (
    image_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    path VARCHAR NOT NULL,
    name VARCHAR NOT NULL
);

--delete from events
--alter table events add column description VARCHAR(255) not null
--select * from events
-- Crear la tabla EVENT
CREATE TABLE EVENTS (
    event_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    place VARCHAR(50) NOT NULL,
    title VARCHAR(30) NOT NULL,
    involved VARCHAR(50) NOT NULL,
    description VARCHAR(255) not null,
    image_id UUID NOT NULL,
    date DATE NOT NULL,
    hour TIME NOT NULL,
    duration INT NOT NULL,
    state BOOLEAN NOT NULL DEFAULT TRUE,
    category_id UUID NOT NULL,
    FOREIGN KEY (image_id) REFERENCES IMAGE(image_id) ON DELETE cascade,
    FOREIGN KEY (category_id) REFERENCES CATEGORY(category_id) ON DELETE CASCADE
);

-- Crear la tabla TIER
CREATE TABLE TIER (
    tier_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name_tier VARCHAR(30) NOT NULL,
    amount_seant INT NOT NULL,
    amount_seant_original INT NOT NULL, 
    price FLOAT NOT NULL,
    event_id UUID NOT NULL,
    FOREIGN KEY (event_id) REFERENCES EVENTS(event_id) ON DELETE CASCADE
);

-- Crear la tabla BILL
CREATE TABLE BILL (
    bill_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    seat VARCHAR(10) NOT NULL,
    date DATE NOT NULL,
    hour TIME NOT NULL,
    redmed BOOLEAN NOT NULL,
    tier_id UUID NOT NULL,
    user_id UUID NOT NULL,
    event_id UUID NOT NULL,
    FOREIGN KEY (tier_id) REFERENCES TIER(tier_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES USERS(user_id) ON DELETE CASCADE,
    FOREIGN KEY (event_id) REFERENCES EVENTS(event_id) ON DELETE CASCADE
);

-- Crear la tabla SPONSORSHIPXEVENT
CREATE TABLE SPONSORSHIPXEVENT (
    sponsorshipxevent_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    sponsorship_id UUID NOT NULL,
    event_id UUID NOT NULL,
    FOREIGN KEY (sponsorship_id) REFERENCES SPONSORSHIP(sponsorship_id) ON DELETE CASCADE,
    FOREIGN KEY (event_id) REFERENCES EVENTS(event_id) ON DELETE CASCADE
);

-- Crear la tabla TICKET
CREATE TABLE TICKET (
    ticket_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    date date not null,
    hour time not null,
    redmed BOOLEAN NOT NULL DEFAULT false,
    tier_id UUID NOT NULL,
    user_id UUID NOT NULL,
    event_id UUID NOT NULL,
    seat VARCHAR not null,
    FOREIGN KEY (tier_id) REFERENCES TIER(tier_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES USERS(user_id) ON DELETE CASCADE,
    FOREIGN KEY (event_id) REFERENCES EVENTS(event_id) ON DELETE CASCADE
);

-- Crear la tabla TRANSFER
CREATE TABLE TRANSFER (
    transfer_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    date_transfer TIMESTAMP NOT NULL,
    ticket_id UUID NOT NULL,
    user_id UUID NOT NULL,
    FOREIGN KEY (ticket_id) REFERENCES TICKET(ticket_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES USERS(user_id) ON DELETE CASCADE
);

-- Crear la tabla USERXPERMISSION
CREATE TABLE USERXPERMISSIONS (
    userxpermission_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL,
    permission_id UUID NOT NULL,
    FOREIGN KEY (user_id) REFERENCES USERS(user_id) ON DELETE CASCADE,
    FOREIGN KEY (permission_id) REFERENCES PERMISSIONS(permission_id) ON DELETE CASCADE
);

-- Crear la tabla USERXEVENT
CREATE TABLE USERXEVENT (
    userxevent_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL,
    event_id UUID NOT NULL,
    FOREIGN KEY (user_id) REFERENCES USERS(user_id) ON DELETE CASCADE,
    FOREIGN KEY (event_id) REFERENCES EVENTS(event_id) ON DELETE CASCADE
);

-- Crear la tabla TOKEN
CREATE TABLE TOKEN (
    token_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    content VARCHAR NOT NULL,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    timestamp TIMESTAMP without time zone NULL DEFAULT CURRENT_TIMESTAMP,
    user_id UUID NOT NULL,
    FOREIGN KEY (user_id) REFERENCES USERS(user_id) ON DELETE CASCADE
);

--Crear la tabla QRCode
--drop table qrcode 
CREATE TABLE QRCode (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    create_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    active BOOLEAN DEFAULT false,
    ticket_id UUID NOT NULL,
    FOREIGN KEY (ticket_id) REFERENCES TICKET(ticket_id) ON DELETE CASCADE
);


--Insertando categorias 
INSERT INTO CATEGORY (name_category, color) VALUES ('Arte', '#F7B12F');
INSERT INTO CATEGORY (name_category, color) VALUES ('Cine', '#4CB9AC');
INSERT INTO CATEGORY (name_category, color) VALUES ('Danza', '#B686E5');
INSERT INTO CATEGORY (name_category, color) VALUES ('Debate', '#51C35C');
INSERT INTO CATEGORY (name_category, color) VALUES ('Foro', '#43ACCD');
INSERT INTO CATEGORY (name_category, color) VALUES ('Literatura', '#C34949');
INSERT INTO CATEGORY (name_category, color) VALUES ('Musica', '#3C6C8F');
INSERT INTO CATEGORY (name_category, color) VALUES ('Stand up y Comedia', 'FFA6FC');
INSERT INTO CATEGORY (name_category, color) VALUES ('Teatro', '#AE1644');


--Insertando permisos por defecto con uuid
INSERT INTO PERMISSIONS (permission_id, name_permission) VALUES ('39a8ab5d-2a35-4ed2-83b9-78161e12e7b1', 'gestion de tickets');
INSERT INTO PERMISSIONS (permission_id, name_permission) VALUES ('8826f3a9-66c7-47c8-9a44-7d66943127f8', 'gestion de eventos');
INSERT INTO PERMISSIONS (permission_id, name_permission) VALUES ('c8b0d85b-c688-4e72-bb82-eb0d9d50aece', 'gestion de permisos');
INSERT INTO PERMISSIONS (permission_id, name_permission) VALUES ('4fd929fe-2732-4c6b-9e2e-481a7e7b8d0a', 'asignacion de personal');
INSERT INTO PERMISSIONS (permission_id, name_permission) VALUES ('4f5011b0-6715-43b3-9c82-2459f13ee9f1', 'acceso a estadisticas');
INSERT INTO PERMISSIONS (permission_id, name_permission) VALUES ('5eeb1eae-4470-4b0c-91c0-d04f4e5d8e69', 'desactivar/activar usuarios');
INSERT INTO PERMISSIONS (permission_id, name_permission) VALUES ('a96b6ce6-4867-4318-b0a5-06397b4bb92b', 'validacion de tickets');
INSERT INTO PERMISSIONS (permission_id, name_permission) VALUES ('34a2ab1d-c11a-448b-89f7-5a67e67756f9', 'consultar usuarios');
INSERT INTO PERMISSIONS (permission_id, name_permission) VALUES ('23ef15d7-5f6f-42b7-9e37-35c49d674f11', 'desactivar/activar API');




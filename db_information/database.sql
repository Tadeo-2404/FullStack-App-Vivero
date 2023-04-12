CREATE DATABASE vivero
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'Spanish_Spain.1252'
    LC_CTYPE = 'Spanish_Spain.1252'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;
	
CREATE TABLE producto (
	id_producto SERIAL PRIMARY KEY,
	nombre VARCHAR(50) NOT NULL,
	descripcion VARCHAR(50) NOT NULL,
	precio int NOT NULL,
	cantidad int NOT NULL
);

CREATE TABLE sustrato (
	id SERIAL PRIMARY KEY,
	nombre VARCHAR(50) NOT NULL,
	descripcion  VARCHAR(50) NOT NULL,
	precio int NOT NULL,
	cantidad int NOT NULL
);

CREATE TABLE proveedor (
    id SERIAL PRIMARY KEY, 
    nombre VARCHAR(50) NOT NULL,
    telefono VARCHAR(10) NOT NULL
);

CREATE TABLE cliente (
	id SERIAL PRIMARY KEY,
	nombre VARCHAR(30) NOT NULL
);

CREATE TABLE sucursal (
	id_sucursal SERIAL PRIMARY KEY,
	direccion VARCHAR(50) NOT NULL,
	telefono VARCHAR(10) NOT NULL,
	email VARCHAR(30) NOT NULL,
	hora_apertura TIME NOT NULL,
	hora_cierre TIME NOT NULL
);

CREATE TABLE empleado (
	id_empleado SERIAL PRIMARY KEY,
	nombre VARCHAR(30) NOT NULL,
	hora_entrada TIME NOT NULL,
	hora_salida TIME NOT NULL,
	id_sucursal int NOT NULL,
	FOREIGN KEY (id_sucursal) REFERENCES sucursal(id_sucursal)
);
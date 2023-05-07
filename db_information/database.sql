CREATE DATABASE vivero
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'Spanish_Spain.1252'
    LC_CTYPE = 'Spanish_Spain.1252'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;
	
CREATE TABLE IF NOT EXISTS "Proveedor" (
    "id" SERIAL,
    "nombre" VARCHAR(255) NOT NULL,
    "telefono" VARCHAR(255) NOT NULL,
    
    PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "Producto" (
    "id" SERIAL,
    "id_proveedor" INTEGER NOT NULL REFERENCES "Proveedor" ("id"),
    "nombre" VARCHAR(255) NOT NULL,
    "descripcion" TEXT NOT NULL,
    "precio" FLOAT NOT NULL,
    "cantidad" INTEGER NOT NULL,
    
    PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "Compra" (
    "id" SERIAL,
    "id_proveedor" INTEGER NOT NULL REFERENCES "Proveedor" ("id"),
    "fecha" TIMESTAMP WITH TIME ZONE NOT NULL,
    "total" FLOAT NOT NULL,
    
    PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "CompraProducto" (
    "id" SERIAL,
    "id_compra" INTEGER NOT NULL REFERENCES "Compra" ("id"),
    "id_producto" INTEGER NOT NULL REFERENCES "Producto" ("id"),
    "cantidad" INTEGER NOT NULL,
    "subtotal" INTEGER NOT NULL,
    PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "Venta" (
    "id" SERIAL,
    "fecha" TIMESTAMP WITH TIME ZONE,
    "total" FLOAT NOT NULL,
    
    PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "VentaProducto" (
    "id" SERIAL,
    "id_venta" INTEGER NOT NULL REFERENCES "Venta" ("id"),
    "id_producto" INTEGER NOT NULL REFERENCES "Producto" ("id"),
    "cantidad" INTEGER NOT NULL,
    "subtotal" INTEGER NOT NULL,
    
    PRIMARY KEY ("id")
);
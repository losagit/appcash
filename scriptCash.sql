create table categorias(
	id int primary key auto_increment,
    nombre varchar(100),
    imagen blob,
    createdAt datetime,
    updatedAt datetime
);
create table productos(
	id int primary key auto_increment,
    categoria_id int,
    nombre varchar(100),
    descripcion varchar(200),
    imagen blob,
    precio decimal(10,2),
    stock int,
    createdAt datetime,
    updatedAt datetime
);
create table usuarios(
	id int primary key auto_increment,
	nombres varchar(100),
    apellidos varchar(100),
    usr varchar(100),
    pwd varchar(100),
    createdAt datetime,
    updatedAt datetime
);
create table usuarios(
	id int primary key auto_increment,
	nombres varchar(100),
    apellidos varchar(100),
    direccion varchar(100),
    telefono varchar(12),
    whatsapp varchar(12),
    usr varchar(100),
    pwd varchar(100),
    createdAt datetime,
    updatedAt datetime
);
create table pedidos(
	id int primary key auto_increment,
    usuario_id int,
    direccion varchar(225),
    estado int,
    fecha_pedido datetime,
    total decimal,
    createdAt datetime,
    updatedAt datetime
);
create table pedidos_detalle(
	id int primary key auto_increment,
    pedido_id int,
    producto_id int,
    cantidad int,
    precio decimal,
    createdAt datetime,
    updatedAt datetime
);

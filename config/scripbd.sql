CREATE DATABASE tiendaV;


use tiendaV;


drop DATABASE tiendaV;

CREATE TABLE categorias(
idcategoria  INT AUTO_INCREMENT PRIMARY KEY,
categoria VARCHAR(50) NOT NULL UNIQUE

) ENGINE=INNODB;


INSERT INTO categorias(categoria)VALUES
('Ropa'),
('Zapatillas'),
('Electrodomesticos');


CREATE TABLE marcas(
idmarca INT AUTO_INCREMENT primary key,
idcategoria INT NOT NULL,
marcas varchar(50)NOT NULL,
CONSTRAINT fk_idcategoria FOREIGN KEY (idcategoria) REFERENCES categorias (idcategoria)
)ENGINE=INNODB;

INSERT INTO marcas (idcategoria,marcas) VALUES ('2','Adidas');


Select*from categorias;
select*from marcas;


drop table producto;

CREATE TABLE producto(
idproducto INT auto_increment primary key,
idcategoria INT NOT NULL,
nombre VARCHAR(100) NOT NULL,
precio DECIMAL(7,2) NOT NULL,
imagen VARCHAR(100) NOT NULL,
fechaRegistro timestamp NOT NULL,
 CONSTRAINT fk_idcategoria_tiendaV FOREIGN KEY (idcategoria) REFERENCES categorias (idcategoria)
)ENGINE=INNODB;



INSERT INTO producto(idcategoria,nombre,precio,imagen)VALUES('1','Camisa','150','img/camisa.jpg');


select*from producto;

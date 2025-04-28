
CREATE DATABASE tiendaV;


USE tiendaV;

drop database tiendaV;



CREATE TABLE categorias (
    idcategoria INT AUTO_INCREMENT PRIMARY KEY,
    categoria VARCHAR(50) NOT NULL UNIQUE
) ENGINE=INNODB;


INSERT INTO categorias(categoria) VALUES
('Ropa'),
('Zapatillas'),
('Electrodomesticos');


CREATE TABLE marcas (
    idmarca INT AUTO_INCREMENT PRIMARY KEY,
    idcategoria INT NOT NULL,
    marcas VARCHAR(50) NOT NULL,
    CONSTRAINT fk_idcategoria FOREIGN KEY (idcategoria) REFERENCES categorias(idcategoria)
) ENGINE=INNODB;


INSERT INTO marcas(idcategoria, marcas) VALUES
(2, 'Adidas');


CREATE TABLE producto (
    idproducto INT AUTO_INCREMENT PRIMARY KEY,
    idmarca INT NOT NULL,
    idcategoria INT NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    precio DECIMAL(7,2) NOT NULL,
    imagen VARCHAR(100) NOT NULL,
    fechaRegistro TIMESTAMP NOT NULL,
    CONSTRAINT fk_idcategoria_tiendaV FOREIGN KEY (idcategoria) REFERENCES categorias(idcategoria),
    CONSTRAINT fk_marca FOREIGN KEY (idmarca) REFERENCES marcas(idmarca)
) ENGINE=INNODB;


INSERT INTO producto(idcategoria, idmarca, nombre, precio, imagen) 
VALUES 
(2, 1, 'redbull', 150.00, 'img/camisa.jpg'),
(3, 1, 'Lavadora', 4170.00, 'img/lavadora.jpg');



SELECT * FROM categorias;


SELECT * FROM marcas;


SELECT * FROM producto;


SELECT 
    P.idproducto,
    M.marcas AS marca,
    C.categoria,
    P.nombre,
    P.precio,
    P.imagen,
    P.fechaRegistro
FROM producto P
INNER JOIN marcas M ON P.idmarca = M.idmarca
INNER JOIN categorias C ON P.idcategoria = C.idcategoria;
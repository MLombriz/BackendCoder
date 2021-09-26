CREATE SCHEMA `prueba` DEFAULT CHARACTER SET utf8 ;



CREATE TABLE `prueba`.`items` (
  `Name` VARCHAR(45) NOT NULL,
  `Category` VARCHAR(45) NOT NULL,
  `Stock` INT NULL,
  `ID` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`ID`));


INSERT INTO `prueba`.`items` (`Name`, `Category`, `Stock`) VALUES ('Fideos', 'Harina', '20');
INSERT INTO `prueba`.`items` (`Name`, `Category`, `Stock`) VALUES ('Leche', 'Lácteos', '30');
INSERT INTO `prueba`.`items` (`Name`, `Category`, `Stock`) VALUES ('Crema', 'Lácteos', '15');


SELECT * FROM prueba.items;

DELETE FROM prueba.items WHERE ID=1

UPDATE prueba.items SET ID = 45 WHERE ID = 2

SELECT * FROM prueba.items;
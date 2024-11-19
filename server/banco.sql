  -- -----------------------------------------------------
  CREATE SCHEMA IF NOT EXISTS `glowhair` DEFAULT CHARACTER SET utf8 ;
  USE `glowhair` ;

  -- -----------------------------------------------------
  -- Table `glowhair`.`tbl_usuario`
  -- -----------------------------------------------------
  CREATE TABLE IF NOT EXISTS `glowhair`.`tbl_usuario` (
    `id_usuario` INT(11) NOT NULL AUTO_INCREMENT,
    `nome_usuario` VARCHAR(45) NOT NULL,
    `email` VARCHAR(45) NOT NULL,
    `senha` VARCHAR(10) NOT NULL,
    `telefone` VARCHAR(11) NOT NULL,
    `tipo_usuario` VARCHAR(25) NOT NULL,
    `cpf` VARCHAR(11) NOT NULL,
    PRIMARY KEY (`id_usuario`))
  ENGINE = InnoDB
  DEFAULT CHARACTER SET = utf8;


  -- -----------------------------------------------------
  -- Table `glowhair`.`tbl_produto`
  -- -----------------------------------------------------
  CREATE TABLE IF NOT EXISTS `glowhair`.`tbl_produto` (
    `id_produto` INT(11) NOT NULL AUTO_INCREMENT,
    `nome_produto` VARCHAR(45) NOT NULL,
    `nome_loja` VARCHAR(45) NOT NULL,
    `descricao` LONGTEXT NOT NULL,
    `beneficios` LONGTEXT NULL DEFAULT NULL,
    `como_usar` LONGTEXT NULL DEFAULT NULL,
    `imagem` VARCHAR(500) NULL,
    `status` VARCHAR(45) NOT NULL,
    `nota` INT(1) NOT NULL,
    `problema` VARCHAR(45) NOT NULL,
    `tipo_cabelo` VARCHAR(45) NOT NULL,
    PRIMARY KEY (`id_produto`))
  ENGINE = InnoDB
  DEFAULT CHARACTER SET = utf8;


  -- -----------------------------------------------------
  -- Table `glowhair`.`tbl_avaliacao`
  -- -----------------------------------------------------
  CREATE TABLE IF NOT EXISTS `glowhair`.`tbl_avaliacao` (
    `id_avaliacao` INT(11) NOT NULL AUTO_INCREMENT,
    `qtde_avaliacao` INT(3) NOT NULL,
    `titulo` VARCHAR(100) NOT NULL,
    `comentarios` VARCHAR(100) NULL DEFAULT NULL,
    `qte_qualidade` INT(3) NOT NULL,
    `id_usu` INT(11) NOT NULL,
    `id_prod` INT(11) NOT NULL,
    PRIMARY KEY (`id_avaliacao`),
      FOREIGN KEY (`id_usu`)
      REFERENCES `glowhair`.`tbl_usuario` (`id_usuario`),
      FOREIGN KEY (`id_prod`)
      REFERENCES `glowhair`.`tbl_produto` (`id_produto`))
  ENGINE = InnoDB
  DEFAULT CHARACTER SET = utf8;

  CREATE VIEW vw_avaliacao_usuario_produto as
  SELECT * 
    FROM tbl_avaliacao AS ava
    INNER JOIN tbl_usuario as usu
      ON ava.id_usu = usu.id_usuario
    INNER JOIN tbl_produto as prod
      ON ava.id_prod = prod.id_produto;
          
          
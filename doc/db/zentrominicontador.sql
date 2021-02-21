-- phpMyAdmin SQL Dump
-- version 3.4.5
-- http://www.phpmyadmin.net
--
-- Servidor: localhost
-- Tiempo de generación: 16-05-2014 a las 15:07:53
-- Versión del servidor: 5.5.16
-- Versión de PHP: 5.3.8

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de datos: `zentrominicontador`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sf_guard_forgot_password`
--

CREATE TABLE IF NOT EXISTS `sf_guard_forgot_password` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) NOT NULL,
  `unique_key` varchar(255) DEFAULT NULL,
  `expires_at` datetime NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id_idx` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sf_guard_group`
--

CREATE TABLE IF NOT EXISTS `sf_guard_group` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` text,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Volcado de datos para la tabla `sf_guard_group`
--

INSERT INTO `sf_guard_group` (`id`, `name`, `description`, `created_at`, `updated_at`) VALUES
(1, 'admin', 'Administrador(a)', '2014-05-16 11:06:27', '2014-05-16 11:06:27'),
(2, 'advanced', 'Avanzado(a)', '2014-05-16 11:06:27', '2014-05-16 11:06:27'),
(3, 'basic', 'Usuario(a)', '2014-05-16 11:06:27', '2014-05-16 11:06:27');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sf_guard_group_permission`
--

CREATE TABLE IF NOT EXISTS `sf_guard_group_permission` (
  `group_id` bigint(20) NOT NULL DEFAULT '0',
  `permission_id` bigint(20) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`group_id`,`permission_id`),
  KEY `sf_guard_group_permission_permission_id_sf_guard_permission_id` (`permission_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `sf_guard_group_permission`
--

INSERT INTO `sf_guard_group_permission` (`group_id`, `permission_id`, `created_at`, `updated_at`) VALUES
(1, 1, '2014-05-16 11:06:27', '2014-05-16 11:06:27'),
(1, 2, '2014-05-16 11:06:27', '2014-05-16 11:06:27'),
(1, 3, '2014-05-16 11:06:27', '2014-05-16 11:06:27'),
(1, 4, '2014-05-16 11:06:27', '2014-05-16 11:06:27'),
(1, 5, '2014-05-16 11:06:27', '2014-05-16 11:06:27'),
(1, 6, '2014-05-16 11:06:27', '2014-05-16 11:06:27'),
(1, 7, '2014-05-16 11:06:27', '2014-05-16 11:06:27'),
(1, 8, '2014-05-16 11:06:27', '2014-05-16 11:06:27'),
(1, 9, '2014-05-16 11:06:27', '2014-05-16 11:06:27'),
(1, 10, '2014-05-16 11:06:27', '2014-05-16 11:06:27'),
(1, 11, '2014-05-16 11:06:27', '2014-05-16 11:06:27'),
(1, 12, '2014-05-16 11:06:27', '2014-05-16 11:06:27'),
(1, 13, '2014-05-16 11:06:27', '2014-05-16 11:06:27'),
(1, 14, '2014-05-16 11:06:27', '2014-05-16 11:06:27'),
(2, 1, '2014-05-16 11:06:27', '2014-05-16 11:06:27'),
(2, 2, '2014-05-16 11:06:27', '2014-05-16 11:06:27'),
(2, 3, '2014-05-16 11:06:27', '2014-05-16 11:06:27'),
(2, 4, '2014-05-16 11:06:27', '2014-05-16 11:06:27'),
(2, 5, '2014-05-16 11:06:27', '2014-05-16 11:06:27'),
(2, 6, '2014-05-16 11:06:27', '2014-05-16 11:06:27'),
(2, 9, '2014-05-16 11:06:27', '2014-05-16 11:06:27'),
(2, 10, '2014-05-16 11:06:27', '2014-05-16 11:06:27'),
(3, 7, '2014-05-16 11:06:27', '2014-05-16 11:06:27');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sf_guard_login_attempt`
--

CREATE TABLE IF NOT EXISTS `sf_guard_login_attempt` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `ip_address` varchar(15) DEFAULT NULL,
  `host_name` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sf_guard_permission`
--

CREATE TABLE IF NOT EXISTS `sf_guard_permission` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` text,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=42 ;

--
-- Volcado de datos para la tabla `sf_guard_permission`
--

INSERT INTO `sf_guard_permission` (`id`, `name`, `description`, `created_at`, `updated_at`) VALUES
(1, 'manageaccount', 'Administrar cuentas', '2014-05-16 11:06:27', '2014-05-16 11:06:27'),
(2, 'managecomprobant', 'Administrar comprobantes', '2014-05-16 11:06:27', '2014-05-16 11:06:27'),
(3, 'managecostcenter', 'Administrar centros de costo', '2014-05-16 11:06:27', '2014-05-16 11:06:27'),
(4, 'manageelement', 'Administrar elementos', '2014-05-16 11:06:27', '2014-05-16 11:06:27'),
(5, 'manageum', 'Administrar unidades de medida', '2014-05-16 11:06:27', '2014-05-16 11:06:27'),
(6, 'managecurrency', 'Administrar monedas', '2014-05-16 11:06:27', '2014-05-16 11:06:27'),
(7, 'manageconfiguration', 'Administrar configuracion global', '2014-05-16 11:06:27', '2014-05-16 11:06:27'),
(8, 'managemodule', 'Administrar módulos', '2014-05-16 11:06:27', '2014-05-16 11:06:27'),
(9, 'manageuser', 'Administrar usuarios', '2014-05-16 11:06:27', '2014-05-16 11:06:27'),
(10, 'managelog', 'Administrar trazas', '2014-05-16 11:06:27', '2014-05-16 11:06:27'),
(11, 'managefiles', 'Administrar archivos', '2014-05-16 11:06:27', '2014-05-16 11:06:27'),
(12, 'managecharts', 'Administrar graficos', '2014-05-16 11:06:27', '2014-05-16 11:06:27'),
(13, 'managecalendar', 'Administrar calendario', '2014-05-16 11:06:27', '2014-05-16 11:06:27'),
(14, 'managetransaction', 'Administrar balances', '2014-05-16 11:06:27', '2014-05-16 11:06:27'),
(15, 'manageaccountadd', 'Administrar cuentas (adicionar)', '2014-05-16 11:06:27', '2014-05-16 11:06:27'),
(16, 'manageaccountedit', 'Administrar cuentas (editar)', '2014-05-16 11:06:27', '2014-05-16 11:06:27'),
(17, 'manageaccountdelete', 'Administrar cuentas (eliminar)', '2014-05-16 11:06:27', '2014-05-16 11:06:27'),
(18, 'manageaccountsplit', 'Aperturar cuentas para análisis', '2014-05-16 11:06:27', '2014-05-16 11:06:27'),
(19, 'manageaccountconsolidate', 'Consolidar saldos de cuentas', '2014-05-16 11:06:27', '2014-05-16 11:06:27'),
(20, 'managecomprobantadd', 'Administrar comprobantes (adicionar)', '2014-05-16 11:06:27', '2014-05-16 11:06:27'),
(21, 'managecomprobantedit', 'Administrar comprobantes (editar)', '2014-05-16 11:06:27', '2014-05-16 11:06:27'),
(22, 'managecomprobantdelete', 'Administrar comprobantes (eliminar)', '2014-05-16 11:06:27', '2014-05-16 11:06:27'),
(23, 'managecostcenteradd', 'Administrar centros de costo (adicionar)', '2014-05-16 11:06:27', '2014-05-16 11:06:27'),
(24, 'managecostcenteredit', 'Administrar centros de costo (editar)', '2014-05-16 11:06:27', '2014-05-16 11:06:27'),
(25, 'managecostcenterdelete', 'Administrar centros de costo (eliminar)', '2014-05-16 11:06:27', '2014-05-16 11:06:27'),
(26, 'manageelementadd', 'Administrar elementos (adicionar)', '2014-05-16 11:06:27', '2014-05-16 11:06:27'),
(27, 'manageelementedit', 'Administrar elementos (editar)', '2014-05-16 11:06:27', '2014-05-16 11:06:27'),
(28, 'manageelementdelete', 'Administrar elementos (eliminar)', '2014-05-16 11:06:27', '2014-05-16 11:06:27'),
(29, 'manageumadd', 'Administrar unidades de medida (adicionar)', '2014-05-16 11:06:27', '2014-05-16 11:06:27'),
(30, 'manageumedit', 'Administrar unidades de medida (editar)', '2014-05-16 11:06:27', '2014-05-16 11:06:27'),
(31, 'manageumdelete', 'Administrar unidades de medida (eliminar)', '2014-05-16 11:06:27', '2014-05-16 11:06:27'),
(32, 'managecurrencyadd', 'Administrar monedas (adicionar)', '2014-05-16 11:06:27', '2014-05-16 11:06:27'),
(33, 'managecurrencyedit', 'Administrar monedas (editar)', '2014-05-16 11:06:27', '2014-05-16 11:06:27'),
(34, 'managecurrencydelete', 'Administrar monedas (eliminar)', '2014-05-16 11:06:27', '2014-05-16 11:06:27'),
(35, 'manageuseradd', 'Administrar usuarios (adicionar)', '2014-05-16 11:06:27', '2014-05-16 11:06:27'),
(36, 'manageuseredit', 'Administrar usuarios (editar)', '2014-05-16 11:06:27', '2014-05-16 11:06:27'),
(37, 'manageuserdelete', 'Administrar usuarios (eliminar)', '2014-05-16 11:06:27', '2014-05-16 11:06:27'),
(38, 'managemoduleadd', 'Administrar módulos (adicionar)', '2014-05-16 11:06:27', '2014-05-16 11:06:27'),
(39, 'managemoduleedit', 'Administrar módulos (editar)', '2014-05-16 11:06:27', '2014-05-16 11:06:27'),
(40, 'managemoduledelete', 'Administrar módulos (eliminar)', '2014-05-16 11:06:27', '2014-05-16 11:06:27'),
(41, 'managecostcenterconsolidate', 'Consolidar elementos de centros de costo', '2014-05-16 11:06:27', '2014-05-16 11:06:27');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sf_guard_remember_key`
--

CREATE TABLE IF NOT EXISTS `sf_guard_remember_key` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) DEFAULT NULL,
  `remember_key` varchar(32) DEFAULT NULL,
  `ip_address` varchar(50) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id_idx` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sf_guard_user`
--

CREATE TABLE IF NOT EXISTS `sf_guard_user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `email_address` varchar(255) NOT NULL,
  `username` varchar(128) NOT NULL,
  `algorithm` varchar(128) NOT NULL DEFAULT 'sha1',
  `salt` varchar(128) DEFAULT NULL,
  `password` varchar(128) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `is_super_admin` tinyint(1) DEFAULT '0',
  `last_login` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_address` (`email_address`),
  UNIQUE KEY `username` (`username`),
  KEY `is_active_idx_idx` (`is_active`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Volcado de datos para la tabla `sf_guard_user`
--

INSERT INTO `sf_guard_user` (`id`, `first_name`, `last_name`, `email_address`, `username`, `algorithm`, `salt`, `password`, `is_active`, `is_super_admin`, `last_login`, `created_at`, `updated_at`) VALUES
(1, 'Donel', 'Vazquez Zambrano', 'dvzambrano@gmail.com', 'admin', 'sha1', '580b872520caf1ef90cf7c311a24c0e6', '1b62a9eb8693eccef0c2c3d16a190b72bb74128c', 1, 1, NULL, '2014-05-16 11:06:27', '2014-05-16 11:06:27'),
(2, 'Dannys', 'Avila Gonzalez', 'advanced@domain.com', 'advanced', 'sha1', '5834e0f3e43499bcd4da6dba5e0ab2c2', '13fc1ef758105a4e381dad42b0b23cd2a440b7bc', 1, 0, NULL, '2014-05-16 11:06:27', '2014-05-16 11:06:27'),
(3, 'Maira', 'Perez Ramos', 'basic@domain.com', 'basic', 'sha1', '97fccede4fbc2b826400b44cdd0d0f5e', 'fc5e744cdb4e79aead178764713abe8ece4f5f39', 1, 0, NULL, '2014-05-16 11:06:27', '2014-05-16 11:06:27');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sf_guard_user_group`
--

CREATE TABLE IF NOT EXISTS `sf_guard_user_group` (
  `user_id` bigint(20) NOT NULL DEFAULT '0',
  `group_id` bigint(20) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`user_id`,`group_id`),
  KEY `sf_guard_user_group_group_id_sf_guard_group_id` (`group_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `sf_guard_user_group`
--

INSERT INTO `sf_guard_user_group` (`user_id`, `group_id`, `created_at`, `updated_at`) VALUES
(1, 1, '2014-05-16 11:06:27', '2014-05-16 11:06:27'),
(2, 2, '2014-05-16 11:06:27', '2014-05-16 11:06:27'),
(3, 3, '2014-05-16 11:06:27', '2014-05-16 11:06:27');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sf_guard_user_password`
--

CREATE TABLE IF NOT EXISTS `sf_guard_user_password` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) DEFAULT NULL,
  `algorithm` varchar(128) NOT NULL DEFAULT 'sha1',
  `salt` varchar(128) DEFAULT NULL,
  `password` varchar(128) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id_idx` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sf_guard_user_permission`
--

CREATE TABLE IF NOT EXISTS `sf_guard_user_permission` (
  `user_id` bigint(20) NOT NULL DEFAULT '0',
  `permission_id` bigint(20) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`user_id`,`permission_id`),
  KEY `sf_guard_user_permission_permission_id_sf_guard_permission_id` (`permission_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sgab_account`
--

CREATE TABLE IF NOT EXISTS `sgab_account` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `code` varchar(50) NOT NULL,
  `name` varchar(130) NOT NULL,
  `comment` text,
  `path` text,
  `parentid` bigint(20) DEFAULT NULL,
  `costcenterid` bigint(20) DEFAULT NULL,
  `elementid` bigint(20) DEFAULT NULL,
  `nature` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`),
  KEY `parentid_idx` (`parentid`),
  KEY `costcenterid_idx` (`costcenterid`),
  KEY `elementid_idx` (`elementid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Volcado de datos para la tabla `sgab_account`
--

INSERT INTO `sgab_account` (`id`, `code`, `name`, `comment`, `path`, `parentid`, `costcenterid`, `elementid`, `nature`) VALUES
(1, '98a860d6b95987bdfe449d0afbe1399c', 'Cuenta maestra', 'Cuenta para consolidaciones', '/NULL/1', NULL, NULL, NULL, 1),
(2, '1df6bc6c47edf60a1934c4aee8679e58', 'Cuenta de gastos', 'Cuenta donde asentar comprobantes de operaciones de gastos', '/NULL/1/2', 1, NULL, NULL, 0),
(3, '39320eb33e5706e16e170df9f2edb4d8', 'Cuenta de ingresos', 'Cuenta donde asentar comprobantes de operaciones de ingresos', '/NULL/1/3', 1, NULL, NULL, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sgab_calendar`
--

CREATE TABLE IF NOT EXISTS `sgab_calendar` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `code` varchar(50) NOT NULL,
  `name` varchar(130) NOT NULL,
  `comment` text,
  `color` bigint(20) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Volcado de datos para la tabla `sgab_calendar`
--

INSERT INTO `sgab_calendar` (`id`, `code`, `name`, `comment`, `color`) VALUES
(1, '09476c3cf5f13e5c36d0e812f7364d88', 'Trabajo', NULL, 6),
(2, 'e41ee28e036aab0388bea90110a2ec74', 'Casa', NULL, 15),
(3, '17d311bb72096d252c26b3b926786211', 'Escuela', NULL, 26);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sgab_comprobant`
--

CREATE TABLE IF NOT EXISTS `sgab_comprobant` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `code` varchar(50) NOT NULL,
  `name` varchar(130) NOT NULL,
  `comment` text,
  `creationdate` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sgab_costcenter`
--

CREATE TABLE IF NOT EXISTS `sgab_costcenter` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `code` varchar(50) NOT NULL,
  `name` varchar(130) NOT NULL,
  `comment` text,
  `parentid` bigint(20) DEFAULT NULL,
  `path` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`),
  KEY `parentid_idx` (`parentid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

--
-- Volcado de datos para la tabla `sgab_costcenter`
--

INSERT INTO `sgab_costcenter` (`id`, `code`, `name`, `comment`, `parentid`, `path`) VALUES
(1, 'acfda98fa11096b40971e82456b966ca', 'Negocio Yusimí', NULL, NULL, '/NULL/1'),
(2, '99a5c7f062c42ff681fc1276dce5d6e9', 'Cafetería I', 'Cafetería ubicada en la calle Frexes', 1, '/NULL/1/2'),
(3, '7d794a45aa1e4c74c7b26fa6acc9d33b', 'Cafetería II', 'Cafetería ubicada en el hospital', 1, '/NULL/1/3'),
(4, '20046a166bf319d1a0f25bb9f392c052', 'Camión', NULL, 1, '/NULL/1/4');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sgab_costcenterelementrelation`
--

CREATE TABLE IF NOT EXISTS `sgab_costcenterelementrelation` (
  `costcenter_id` bigint(20) NOT NULL DEFAULT '0',
  `element_id` bigint(20) NOT NULL DEFAULT '0',
  PRIMARY KEY (`costcenter_id`,`element_id`),
  KEY `sgab_costcenterelementrelation_element_id_sgab_element_id` (`element_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `sgab_costcenterelementrelation`
--

INSERT INTO `sgab_costcenterelementrelation` (`costcenter_id`, `element_id`) VALUES
(2, 2),
(3, 2),
(2, 6),
(2, 8),
(2, 10),
(3, 10),
(2, 12),
(2, 22),
(2, 23),
(2, 24),
(2, 25),
(2, 26),
(2, 27),
(2, 28),
(2, 29),
(2, 30),
(2, 31),
(2, 32),
(2, 37),
(3, 37);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sgab_currency`
--

CREATE TABLE IF NOT EXISTS `sgab_currency` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `code` varchar(50) NOT NULL,
  `name` varchar(130) NOT NULL,
  `comment` text,
  `rate` decimal(6,5) DEFAULT NULL,
  `isactive` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Volcado de datos para la tabla `sgab_currency`
--

INSERT INTO `sgab_currency` (`id`, `code`, `name`, `comment`, `rate`, `isactive`) VALUES
(1, 'CUP', 'Peso cubano', NULL, '1.00000', 1),
(2, 'CUC', 'Peso cubano libremente convertible', NULL, '0.04000', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sgab_element`
--

CREATE TABLE IF NOT EXISTS `sgab_element` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `comment` text,
  `name` varchar(130) NOT NULL,
  `code` varchar(50) NOT NULL,
  `umid` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`),
  KEY `umid_idx` (`umid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=38 ;

--
-- Volcado de datos para la tabla `sgab_element`
--

INSERT INTO `sgab_element` (`id`, `comment`, `name`, `code`, `umid`) VALUES
(1, NULL, 'Café', '8939e231102341962e63fa66b4aa0eb1', 1),
(2, NULL, 'Café elaborado', 'e886017e99ec05578f8b88719cc473cc', 2),
(3, NULL, 'Leche', 'afcdb8c8f93715066032ddb0262b689a', 11),
(4, NULL, 'Leche elaborada', '5ff567fdd2176d0e67f8d77ab01d4da8', 3),
(5, NULL, 'Chocolate en polvo', '4d8fbf1e0c0ae27e0ead132e0f645ced', 11),
(6, NULL, 'Chocolate elaborado', 'd5785fc20649d91421631a4b13def071', 3),
(7, NULL, 'Polvo para batido', '0a85b2551fa2aa907287e8defd2c848f', 11),
(8, NULL, 'Batido elaborado', 'e54d1444c94bb3af29315d0fe2932658', 3),
(9, NULL, 'Refresco', '38bd91bc61bacc6f7e19ba8d91292cd6', 3),
(10, NULL, 'Refresco de lata', '8821ee25c865bd43e6d2263c5a3ebad6', 1),
(11, NULL, 'Yogurt', '047d0070dbc6d060b84a10287571d92e', 7),
(12, NULL, 'Yogurt elaborado', 'a261362b715aebfa1ac82ff3714fb29a', 3),
(13, NULL, 'Pan en bola', 'd2599b70a50acb8b40ed81fb04fb5a84', 4),
(14, NULL, 'Pan telera', '7c894ebfdb54d7393bd98bcba812e505', 4),
(15, NULL, 'Hamburguesa', 'ca5c7ad29bd41cf5f969a8c9e5295dc1', 4),
(16, NULL, 'Jamón', 'fbc19a2b0793c505a3fb1356eb5eb735', 4),
(17, NULL, 'Queso 5', '6712e473f407cc01d840ea1b4ae330ad', 4),
(18, NULL, 'Queso 10', '801fa172d8999467029311afcec81b32', 4),
(19, NULL, 'Mantequilla', '5ec9b32e8b03f3ac2a1a6d58f6ca944a', 4),
(20, NULL, 'Salchicha', '831c4144689e18f5381ba1788f51306f', 4),
(21, NULL, 'Panqué', 'ed009fe3ad586dcaec1952d0141a9312', 4),
(22, NULL, 'Pasta de maní 2', '787f669bd9f09f8700e2dd192510b6b2', 4),
(23, NULL, 'Pasta de maní 5', 'a0b266ce8c0346435973c46bfe4ee61b', 4),
(24, NULL, 'Biscocho', 'e5df0152539b899a54cd7b022f715fdd', 4),
(25, NULL, 'Guataquita', '234a7782dad0b5b7b5b3d4e10fdeed58', 4),
(26, NULL, 'Polvorón', '748b96e276ca42aed9ed7b089730f882', 4),
(27, NULL, 'Nayara', '0db5ac4347ea72286b108bbfb026c617', 4),
(28, NULL, 'Chocomani', '25084778eea51bb8b43136aad4f11c9a', 4),
(29, NULL, 'Turron de coco', '0636afee751817d63babc177ad1e5ea2', 4),
(30, NULL, 'Marquesita', 'ca1cf4a2620cb6c541910557ad8dc241', 4),
(31, NULL, 'Rollito', '1392b7482b05d6aff42fb176cfe4fcbd', 4),
(32, NULL, 'Pastel', '61ad7390574ccfa79e75b25aa6011d1c', 4),
(33, NULL, 'Helado', '913a786123a4229a2851dc3cfe04690a', 4),
(34, NULL, 'Barquilla', 'b633a21d7b57b74e811201dd1e30cfe3', 4),
(35, NULL, 'Eclear', 'b97c42ea9e72333592a53ff46b55ef87', 4),
(36, NULL, 'Empanadilla', 'd4eded9f076ef05bcb64ab2b3748621f', 4),
(37, NULL, 'Bocadito de jamón y queso', '6eb6f35c70a6771580dd8ab6d2610a8c', 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sgab_elementelementrelation`
--

CREATE TABLE IF NOT EXISTS `sgab_elementelementrelation` (
  `from_id` bigint(20) NOT NULL DEFAULT '0',
  `to_id` bigint(20) NOT NULL DEFAULT '0',
  `rate` decimal(18,2) DEFAULT NULL,
  PRIMARY KEY (`from_id`,`to_id`),
  KEY `sgab_elementelementrelation_to_id_sgab_element_id` (`to_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `sgab_elementelementrelation`
--

INSERT INTO `sgab_elementelementrelation` (`from_id`, `to_id`, `rate`) VALUES
(37, 13, '1.00'),
(37, 16, '1.00'),
(37, 17, '1.00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sgab_entityuserrelation`
--

CREATE TABLE IF NOT EXISTS `sgab_entityuserrelation` (
  `entity_id` bigint(20) NOT NULL DEFAULT '0',
  `sf_guard_user_id` bigint(20) NOT NULL DEFAULT '0',
  PRIMARY KEY (`entity_id`,`sf_guard_user_id`),
  KEY `sgab_entityuserrelation_sf_guard_user_id_sf_guard_user_id` (`sf_guard_user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sgab_event`
--

CREATE TABLE IF NOT EXISTS `sgab_event` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `code` varchar(50) NOT NULL,
  `name` varchar(130) NOT NULL,
  `comment` text,
  `allday` tinyint(1) DEFAULT '0',
  `start` datetime NOT NULL,
  `end` datetime NOT NULL,
  `calendarid` bigint(20) DEFAULT NULL,
  `reminderid` bigint(20) DEFAULT NULL,
  `location` text,
  `link` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`),
  KEY `calendarid_idx` (`calendarid`),
  KEY `reminderid_idx` (`reminderid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=10 ;

--
-- Volcado de datos para la tabla `sgab_event`
--

INSERT INTO `sgab_event` (`id`, `code`, `name`, `comment`, `allday`, `start`, `end`, `calendarid`, `reminderid`, `location`, `link`) VALUES
(1, '0d57c220a3ef147e1cf35430e303a603', 'Vacaciones', 'Tiempo de diversion...', 0, '2014-04-25 14:00:00', '2014-05-06 15:00:00', 2, 1, NULL, NULL),
(2, '40336cf3edc079a4f64446dffa121fdb', 'Almuerzo con Dcita', 'Debo estar una hora antes en el restaurant', 0, '2014-05-16 11:30:00', '2014-05-16 13:00:00', 1, 1, NULL, NULL),
(3, '9ff0c2c742ef6eff9ebb0a8160898008', 'Pagar la electricidad', NULL, 0, '2014-05-16 15:00:00', '2014-05-16 15:00:00', 1, NULL, NULL, NULL),
(4, 'd61915029953cccd22cc4df817b398c8', 'Cumpleaños de Mayra', 'Hay q comprar un regalo', 1, '2014-05-16 00:00:00', '2014-05-16 00:00:00', 2, NULL, NULL, NULL),
(5, 'bdbcb6692ff90ceeb50a26847d306f2f', 'Hacer ejercicios', NULL, 1, '2014-05-04 00:00:00', '2014-05-25 23:59:59', 1, NULL, NULL, NULL),
(6, 'e141a4c2bd74aa2c4efd27d07541c718', 'Pelarme', NULL, 0, '2014-05-16 09:00:00', '2014-05-16 09:30:00', 2, NULL, NULL, NULL),
(7, '4cbf1a8c26a033b0331597a48c3187a1', 'Consejo de direccion', NULL, 0, '2014-05-14 13:00:00', '2014-05-14 18:00:00', 1, NULL, NULL, NULL),
(8, '43568a3b57377c8866c644f3707a12aa', 'Noche de peliculas', NULL, 0, '2014-05-18 19:00:00', '2014-05-18 23:00:00', 2, NULL, NULL, NULL),
(9, '3ff2953c341b75df009234886ae7019f', 'Forum nacional', NULL, 0, '2014-05-24 08:00:00', '2014-05-29 16:00:00', 3, NULL, 'Ciudad de la Habana', 'www.forum.cuba.cu');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sgab_metadata`
--

CREATE TABLE IF NOT EXISTS `sgab_metadata` (
  `name` varchar(50) NOT NULL DEFAULT '',
  `comment` text,
  `value` text,
  `category` text,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `sgab_metadata`
--

INSERT INTO `sgab_metadata` (`name`, `comment`, `value`, `category`) VALUES
('app_authldapencode', 'Establece si es necesario codificar en UTF-8 los resultados obtenidos desde el LDAP', '1', 'LDAP'),
('app_authldapfilterdn', 'Establece la ubicación de los usuarios en el LDAP', 'OU=Unit,DC=domain,DC=com', 'LDAP'),
('app_authldaprootdn', 'Establece la ubicación del usuario de búsqueda en el LDAP', 'CN=Users,DC=domain,DC=com', 'LDAP'),
('app_authldapsearchinguser', 'Establece el usuario usado para realizar la conexión con el LDAP', 'administrador', 'LDAP'),
('app_authldapsearchinguserpass', 'Establece la contraseña del usuario usado para realizar la conexión con el LDAP', 'C0ntrasenna', 'LDAP'),
('app_authldapserver', 'Permite definir el Nombre o Dirección IP del servidor LDAP', '192.168.3.22', 'LDAP'),
('app_authmode', 'Establece el tipo de autenticación a usar en el sistema: "local" (sin comillas) para usar la base de datos, "ldap" (sin comillas) para usar un directorio elemento y "mixed" (sin comillas) para combinar ambos métodos', 'local', 'Sistema'),
('app_businessmail', 'Permite definir la cuenta de correo que será utilizada para la realización de las transferencias de pago mediante PayPal y para el envío de las notificaciones generadas por el sistema.', 'dvz@domain.com', 'Sistema'),
('app_currencycode', 'Permite definir la moneda base con la que contabiliza el sistema.', 'CUP', 'Negocio'),
('app_defaultlanguaje', 'Define el idioma en que por defecto se cargarán las interfaces del sistema aun cuando pueden ser variadas localmente mediante el uso de la Barra superior.', 'es-Es', 'Sistema'),
('app_elementsongrid', 'Establece la cantidad de elementos a mostrar en una página de interfaz tabular correspondiente al área de trabajo. De esta forma el sistema se encarga de generar la paginación que entre otras cosas permite elevar el rendimiento de las consultas realizadas a las bases de datos.', '20', 'Tablas de datos'),
('app_fileintegrity', 'Establece la suma de chequeo de integridad de los archivos del sistema', '4688a7ee0efb04af9003ab956c592b51', 'Sistema'),
('app_lockaccountfor', 'Permite definir el tiempo en segundos por el que se bloquea a los usuarios que superan el máximo de intentos fallidos de autenticación', '300', 'Seguridad'),
('app_mailencryption', 'Establece el Tipo de Encriptado utilizado por el servidor de correo: ~, ssl, tls', '~', 'Correo'),
('app_mailhost', 'Establece el Nombre o la Dirección IP del servidor de correo', '10.0.0.1', 'Correo'),
('app_mailhostport', 'Establece el Puerto por el que escucha el servidor de correo', '25', 'Correo'),
('app_mailpassword', 'Establece el la Contraseña del usuario de correo utilizado para enviar las notificaciones', 'noresponder', 'Correo'),
('app_mailusername', 'Establece el Usuario de correo utilizado para enviar las notificaciones', 'noresponder@domain.com', 'Correo'),
('app_mainmenuposition', 'Permite definir el lugar donde renderizar el menú principal del sistema. ("top" en el menu superior y "left" como menu arboreo a la izquierda)', 'left', 'Sistema'),
('app_name', 'Permite variar el nombre del sistema mostrado el banner superior', 'Zentro&reg; Mini Contador', 'Sistema'),
('app_sendsystememails', 'Permite definir si el sistema enviará notificaciones por correo o no', '1', 'Sistema'),
('app_showgridtitle', 'Permite personalizar las vistas de las interfaces de gestión usando o no los títulos en las tablas.', '1', 'Tablas de datos'),
('app_showmessageonformloadfailed', 'Permite establecer si el sistema mostrará mensajes de notificación cuando NO se hayan cargado datos a un formulario satisfactoriamente', '1', 'Notificaciones'),
('app_showmessageonformloadsuccessful', 'Permite establecer si el sistema mostrará mensajes de notificación cuando se hayan cargado datos a un formulario satisfactoriamente', '', 'Notificaciones'),
('app_showmessageonmoduleloadsuccessful', 'Permite establecer si el sistema mostrará mensajes de notificación cuando se active un módulo satisfactoriamente', '1', 'Notificaciones'),
('app_showmessageonstoreloadfailed', 'Permite establecer si el sistema mostrará mensajes de notificación cuando NO se hayan cargado satisfactoriamente las fuentes de datos', '1', 'Notificaciones'),
('app_showmessageonstoreloadsuccessful', 'Permite establecer si el sistema mostrará mensajes de notificación cuando se hayan cargado satisfactoriamente las fuentes de datos', '', 'Notificaciones'),
('app_unsuccessfulloginattempts', 'Permite definir la cantidad de intentos de autenticación fallidos antes de bloquear el acceso al usuario', '3', 'Seguridad'),
('app_uploadimagedestination', 'Permite definir el lugar donde se desean guardar las imagenes de usuarios del sistema. ("file" como archivos y "db" en la base de datos)', 'file', 'Sistema');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sgab_module`
--

CREATE TABLE IF NOT EXISTS `sgab_module` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `code` varchar(50) NOT NULL,
  `name` varchar(130) NOT NULL,
  `nick` varchar(130) NOT NULL,
  `icon` varchar(130) DEFAULT NULL,
  `comment` text,
  `attributes` text,
  `relations` text,
  `module_id` bigint(20) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `is_multientity` tinyint(1) DEFAULT '0',
  `is_multientidable` tinyint(1) DEFAULT '0',
  `is_base` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`),
  KEY `module_id_idx` (`module_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=16 ;

--
-- Volcado de datos para la tabla `sgab_module`
--

INSERT INTO `sgab_module` (`id`, `code`, `name`, `nick`, `icon`, `comment`, `attributes`, `relations`, `module_id`, `is_active`, `is_multientity`, `is_multientidable`, `is_base`) VALUES
(1, 'fd634f3522b4d3d915011d95683c8464', 'Nomenclador de cuentas', 'Account', 'money.png', 'Gestión de cuentas, su naturaleza, aperturas y saldos', '[{"ispk":true,"name":"Código","nick":"code","type":"string","restriction":"30","nulleable":false},{"isak":true,"name":"Nombre","nick":"name","type":"string","restriction":"130","nulleable":false},{"name":"Descripción","nick":"comment","type":"string","restriction":"","nulleable":true},{"name":"Padre","nick":"parentid","type":"integer","restriction":"","nulleable":true}]', '[{"attributeid":"parentid","attribute":"Padre","typeid":"onetomany","type":"Uno a muchos","moduleid":"Account","module":"Ã?rbol paginado"}]', NULL, 1, 0, 0, 0),
(2, 'c944b62fb3b139ee372966b9c2cfbd55', 'Comprobantes de operaciones', 'Comprobant', 'page_copy.png', 'Gestión de comprobantes de operaciones', '[{"ispk":true,"name":"Código","nick":"code","type":"string","restriction":"30","nulleable":false},{"isak":true,"name":"Nombre","nick":"name","type":"string","restriction":"130","nulleable":false},{"name":"Descripción","nick":"comment","type":"string","restriction":"","nulleable":true}]', NULL, NULL, 1, 0, 0, 0),
(3, '8e802ff76d88148c2a8b99085d6c168f', 'Balances de comprobación', 'Transaction', 'map.png', 'Balances de comprobación de saldos', '[{"ispk":true,"name":"Código","nick":"code","type":"string","restriction":"30","nulleable":false},{"isak":true,"name":"Nombre","nick":"name","type":"string","restriction":"130","nulleable":false},{"name":"Descripción","nick":"comment","type":"string","restriction":"","nulleable":true},{"name":"Cantidad","nick":"amount","type":"decimal","restriction":""}]', NULL, NULL, 1, 0, 0, 0),
(4, 'd205c9bf2b01b199ebd7ee4c6552433f', 'Centros de costo', 'Costcenter', 'building.png', 'Gestión de centros de costo', '[{"ispk":true,"name":"Código","nick":"code","type":"string","restriction":"30","nulleable":false},{"isak":true,"name":"Nombre","nick":"name","type":"string","restriction":"130","nulleable":false},{"name":"Descripción","nick":"comment","type":"string","restriction":"","nulleable":true},{"name":"Padre","nick":"parentid","type":"integer","restriction":"","nulleable":true}]', '[{"attributeid":"parentid","attribute":"Padre","typeid":"onetomany","type":"Uno a muchos","moduleid":"Costcenter","module":"Ã?rbol paginado"}]', NULL, 1, 0, 0, 0),
(5, 'c14fdea8d4a13423a6ab13ccea444015', 'Elementos', 'Element', 'bricks.png', 'Gestión de elementos', '[{"ispk":true,"name":"Código","nick":"code","type":"string","restriction":"30","nulleable":false},{"isak":true,"name":"Nombre","nick":"name","type":"string","restriction":"130","nulleable":false},{"name":"Descripción","nick":"comment","type":"string","restriction":"","nulleable":true}]', NULL, NULL, 1, 0, 0, 0),
(6, '38001b8d078e73b61835c0f1d249e66c', 'Unidades de medida', 'Um', 'text_letterspacing.png', 'Gestión de unidades de medida', '[{"ispk":true,"name":"Código","nick":"code","type":"string","restriction":"30","nulleable":false},{"isak":true,"name":"Nombre","nick":"name","type":"string","restriction":"130","nulleable":false},{"name":"Descripción","nick":"comment","type":"string","restriction":"","nulleable":true}]', NULL, NULL, 1, 0, 0, 0),
(7, 'dad5bebc4467f517ec979ae98f54c87e', 'Monedas', 'Currency', 'coins.png', 'Gestión de monedas', '[{"ispk":true,"name":"Código","nick":"code","type":"string","restriction":"30","nulleable":false},{"isak":true,"name":"Nombre","nick":"name","type":"string","restriction":"130","nulleable":false},{"name":"Descripción","nick":"comment","type":"string","restriction":"","nulleable":true}]', NULL, NULL, 1, 0, 0, 0),
(8, 'e7af0863035207943f53f63d68f6f170', 'Gráficos', 'Chart', 'wtop-charts.png', 'Generador de gráficos del sistema', NULL, NULL, NULL, 0, 0, 0, 1),
(9, 'a6d080f2730d57c1da1e777002102139', 'Calendario', 'Calendar', 'wtop-calendars.png', 'Visor de eventos del sistema', '[{"name":"Nombre","nick":"name","type":"string","restriction":"","nulleable":false},{"name":"Descripción","nick":"comment","type":"string","restriction":"","nulleable":false}]', NULL, NULL, 0, 0, 0, 1),
(10, 'a7c68a28d40f282bae2ee54b5abcb65a', 'Recordatorios', 'Reminder', 'wtop-reminders.png', 'Gestión de recordatorios del sistema', '[{"name":"Nombre","nick":"name","type":"string","restriction":"","nulleable":false},{"name":"Descripción","nick":"comment","type":"string","restriction":"","nulleable":false},{"name":"Valor","nick":"value","type":"int","restriction":"","nulleable":false},{"name":"Periodo","nick":"period","type":"int","restriction":"","nulleable":false}]', NULL, NULL, 0, 0, 0, 1),
(11, '0abc28bcb832a6bbd1c673309cbad21a', 'Usuarios', 'User', 'wtop-users.png', 'Gestión de usuarios del sistema', NULL, NULL, NULL, 1, 0, 0, 1),
(12, 'f77828c55becd4d2013f22bfbf5ccf94', 'Configuración', 'Metadata', 'wtop-config.png', 'Configuraci&oacute;n general del sistema', NULL, NULL, NULL, 1, 0, 0, 1),
(13, 'bf2d27ca3e7f635e06ac60a586240083', 'Trazas', 'Log', 'wtop-logs.png', 'Auditoría de trazas del sistema', NULL, NULL, NULL, 1, 0, 0, 1),
(14, 'a95374dafe28f54b7ce7729f8378c819', 'Módulos', 'Module', 'wtop-modules.png', 'Gestión de módulos del sistema', '[{"name":"Código","nick":"code","type":"string","restriction":"","nulleable":false},{"name":"Nombre","nick":"name","type":"string","restriction":"","nulleable":false},{"name":"Alias","nick":"nick","type":"string","restriction":"","nulleable":false},{"name":"Descripción","nick":"comment","type":"string","restriction":"","nulleable":false},{"name":"Ícono","nick":"icon","type":"string","restriction":"","nulleable":true}]', NULL, NULL, 0, 0, 0, 1),
(15, '566e353f89a32c0ff6d3f1374a7d54d1', 'Explorador', 'Explorer', 'wtop-explorer.png', 'Gestión de archivos y carpetas del sistema', '[{"name":"Nombre","nick":"name","type":"string","restriction":"","nulleable":false},{"name":"Fecha de modificación","nick":"lastmod","type":"string","restriction":"","nulleable":false},{"name":"Tamaño","nick":"size","type":"string","restriction":"","nulleable":false}]', NULL, NULL, 0, 0, 0, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sgab_moduledependencyrelation`
--

CREATE TABLE IF NOT EXISTS `sgab_moduledependencyrelation` (
  `module_id` bigint(20) NOT NULL DEFAULT '0',
  `dependency_id` bigint(20) NOT NULL DEFAULT '0',
  PRIMARY KEY (`module_id`,`dependency_id`),
  KEY `sgab_moduledependencyrelation_dependency_id_sgab_module_id` (`dependency_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `sgab_moduledependencyrelation`
--

INSERT INTO `sgab_moduledependencyrelation` (`module_id`, `dependency_id`) VALUES
(1, 2),
(1, 3),
(2, 3),
(1, 4),
(2, 4),
(1, 5),
(2, 5),
(4, 5),
(1, 6),
(2, 6),
(4, 6),
(5, 6),
(2, 7),
(9, 10),
(10, 11),
(14, 11);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sgab_modulepermission`
--

CREATE TABLE IF NOT EXISTS `sgab_modulepermission` (
  `module_id` bigint(20) NOT NULL DEFAULT '0',
  `permission_id` bigint(20) NOT NULL DEFAULT '0',
  PRIMARY KEY (`module_id`,`permission_id`),
  KEY `sgab_modulepermission_permission_id_sf_guard_permission_id` (`permission_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `sgab_modulepermission`
--

INSERT INTO `sgab_modulepermission` (`module_id`, `permission_id`) VALUES
(1, 1),
(2, 2),
(4, 3),
(5, 4),
(6, 5),
(7, 6),
(12, 7),
(14, 8),
(11, 9),
(13, 10),
(15, 11),
(8, 12),
(9, 13),
(10, 13),
(3, 14),
(1, 15),
(1, 16),
(1, 17),
(1, 18),
(1, 19),
(2, 20),
(2, 21),
(2, 22),
(4, 23),
(4, 24),
(4, 25),
(5, 26),
(5, 27),
(5, 28),
(6, 29),
(6, 30),
(6, 31),
(7, 32),
(7, 33),
(7, 34),
(11, 35),
(11, 36),
(11, 37),
(14, 38),
(14, 39),
(14, 40);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sgab_person`
--

CREATE TABLE IF NOT EXISTS `sgab_person` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `code` varchar(50) DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `cellphone` varchar(50) DEFAULT NULL,
  `address` text,
  `comment` text,
  `picture` text,
  `profile` text,
  `sf_guard_user_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`),
  KEY `sf_guard_user_id_idx` (`sf_guard_user_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Volcado de datos para la tabla `sgab_person`
--

INSERT INTO `sgab_person` (`id`, `code`, `phone`, `cellphone`, `address`, `comment`, `picture`, `profile`, `sf_guard_user_id`) VALUES
(1, '81092719101', NULL, NULL, NULL, NULL, '../uploads/avatars/cutemale.png', '{"customcolor":"[{\\"calendar\\":1,\\"color\\":\\"F88015\\"},{\\"calendar\\":2,\\"color\\":\\"9D3283\\"},{\\"calendar\\":3,\\"color\\":\\"2951B9\\"}]"}', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sgab_reminder`
--

CREATE TABLE IF NOT EXISTS `sgab_reminder` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `code` varchar(50) NOT NULL,
  `name` varchar(130) NOT NULL,
  `comment` text,
  `value` bigint(20) DEFAULT NULL,
  `period` bigint(20) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=14 ;

--
-- Volcado de datos para la tabla `sgab_reminder`
--

INSERT INTO `sgab_reminder` (`id`, `code`, `name`, `comment`, `value`, `period`) VALUES
(1, '756a6b48859d658ec3677872a53fc934', 'Al inicio', 'Avisar en el momento de inicio del evento', 0, 1),
(2, '9be1b75865373d2ea6c48ce39d5041de', '5 minutos', 'Avisar cinco minutos antes del inicio del evento', 5, 1),
(3, '0eba28b497bd9a2719838c64fa2da75a', '15 minutos', 'Avisar quince minutos antes del inicio del evento', 15, 1),
(4, 'af50f6844262a64524344ed43e4e57ab', '30 minutos', 'Avisar media hora antes del inicio del evento', 30, 1),
(5, '6528b3bfd5e926a2146ff8237c759a07', '1 hora', 'Avisar una hora antes del inicio del evento', 1, 2),
(6, '28e3e9a4319d4e0ae062a0e79fba6eca', '2 horas', 'Avisar dos horas antes del inicio del evento', 2, 2),
(7, '734856e2910d50a0ff28d267659c87c0', '12 horas', 'Avisar doce horas antes del inicio del evento', 12, 2),
(8, '97174f95fec450fb8a789f8a3c6cfb4d', '1 dia', 'Avisar un dia antes del inicio del evento', 1, 3),
(9, '47945f7637940feee7369351aeac3aed', '2 dias', 'Avisar dos dias antes del inicio del evento', 2, 3),
(10, 'dab3c7d8a981b8a30f2f0ffe96584f80', '1 semana', 'Avisar una semana antes del inicio del evento', 1, 4),
(11, 'd46ee87531f388b6a745fca5bdc86c44', '2 semanas', 'Avisar dos semanas antes del inicio del evento', 2, 4),
(12, 'b6c87ba0a8df385e1f3831a40ea6951a', '1 mes', 'Avisar un mes antes del inicio del evento', 1, 5),
(13, 'bede15262f936e48f8a6a5aeddddd2ce', '1 año', 'Avisar un año antes del inicio del evento', 1, 6);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sgab_testing`
--

CREATE TABLE IF NOT EXISTS `sgab_testing` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `parentid` bigint(20) DEFAULT NULL,
  `comment` text,
  `nick` varchar(50) NOT NULL,
  `name` varchar(130) NOT NULL,
  `code` varchar(30) NOT NULL,
  `path` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`),
  KEY `parentid_idx` (`parentid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sgab_transaction`
--

CREATE TABLE IF NOT EXISTS `sgab_transaction` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `comment` text,
  `debit` decimal(18,2) DEFAULT NULL,
  `credit` decimal(18,2) DEFAULT NULL,
  `rate` decimal(18,2) DEFAULT NULL,
  `currencyid` bigint(20) DEFAULT NULL,
  `comprobantid` bigint(20) DEFAULT NULL,
  `accountid` bigint(20) DEFAULT NULL,
  `amount` decimal(18,2) DEFAULT NULL,
  `elementid` bigint(20) DEFAULT NULL,
  `umid` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `currencyid_idx` (`currencyid`),
  KEY `comprobantid_idx` (`comprobantid`),
  KEY `accountid_idx` (`accountid`),
  KEY `elementid_idx` (`elementid`),
  KEY `umid_idx` (`umid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sgab_um`
--

CREATE TABLE IF NOT EXISTS `sgab_um` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `code` varchar(50) NOT NULL,
  `name` varchar(130) NOT NULL,
  `comment` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=12 ;

--
-- Volcado de datos para la tabla `sgab_um`
--

INSERT INTO `sgab_um` (`id`, `code`, `name`, `comment`) VALUES
(1, '59c06809b87dce2a6eae76bf91b957c2', 'Lata', NULL),
(2, 'b5f831311230fa38b177d9e768a35cbf', 'Termo', NULL),
(3, '76b2ab414d5d24e552f702b2cec3ae9f', 'Vaso', NULL),
(4, '8752a00d9c3c72e1c09a2e85e6cb82dd', 'Unidad', NULL),
(5, '014bf1f9b407765af896d9776af2b681', 'Taza', NULL),
(6, 'a32aac66ba36ad0d8c6e8b213f1026a1', 'Mazo', NULL),
(7, '4916d7f4039c6b4bd6abc9dc8257871f', 'Litro', NULL),
(8, '741e357d6c788e37bffa0aaf663e112e', 'Libra', NULL),
(9, 'ebce41ad41b4870e8ee5853a55849a9f', 'Onza', NULL),
(10, '280e0cf021865fe79904f4577cb3ebcb', 'Paquete', NULL),
(11, 'deec698b804a8cfed2a4179e37b2d7f5', 'Gramo', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sgab_umumrelation`
--

CREATE TABLE IF NOT EXISTS `sgab_umumrelation` (
  `from_id` bigint(20) NOT NULL DEFAULT '0',
  `to_id` bigint(20) NOT NULL DEFAULT '0',
  `rate` decimal(18,2) DEFAULT NULL,
  PRIMARY KEY (`from_id`,`to_id`),
  KEY `sgab_umumrelation_to_id_sgab_um_id` (`to_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `sgab_umumrelation`
--

INSERT INTO `sgab_umumrelation` (`from_id`, `to_id`, `rate`) VALUES
(1, 2, '4.00'),
(2, 5, '8.00'),
(7, 3, '4.00'),
(8, 9, '16.00'),
(8, 10, '1.00');

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `sf_guard_forgot_password`
--
ALTER TABLE `sf_guard_forgot_password`
  ADD CONSTRAINT `sf_guard_forgot_password_user_id_sf_guard_user_id` FOREIGN KEY (`user_id`) REFERENCES `sf_guard_user` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `sf_guard_group_permission`
--
ALTER TABLE `sf_guard_group_permission`
  ADD CONSTRAINT `sf_guard_group_permission_group_id_sf_guard_group_id` FOREIGN KEY (`group_id`) REFERENCES `sf_guard_group` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `sf_guard_group_permission_permission_id_sf_guard_permission_id` FOREIGN KEY (`permission_id`) REFERENCES `sf_guard_permission` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `sf_guard_remember_key`
--
ALTER TABLE `sf_guard_remember_key`
  ADD CONSTRAINT `sf_guard_remember_key_user_id_sf_guard_user_id` FOREIGN KEY (`user_id`) REFERENCES `sf_guard_user` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `sf_guard_user_group`
--
ALTER TABLE `sf_guard_user_group`
  ADD CONSTRAINT `sf_guard_user_group_group_id_sf_guard_group_id` FOREIGN KEY (`group_id`) REFERENCES `sf_guard_group` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `sf_guard_user_group_user_id_sf_guard_user_id` FOREIGN KEY (`user_id`) REFERENCES `sf_guard_user` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `sf_guard_user_password`
--
ALTER TABLE `sf_guard_user_password`
  ADD CONSTRAINT `sf_guard_user_password_user_id_sf_guard_user_id` FOREIGN KEY (`user_id`) REFERENCES `sf_guard_user` (`id`);

--
-- Filtros para la tabla `sf_guard_user_permission`
--
ALTER TABLE `sf_guard_user_permission`
  ADD CONSTRAINT `sf_guard_user_permission_permission_id_sf_guard_permission_id` FOREIGN KEY (`permission_id`) REFERENCES `sf_guard_permission` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `sf_guard_user_permission_user_id_sf_guard_user_id` FOREIGN KEY (`user_id`) REFERENCES `sf_guard_user` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `sgab_account`
--
ALTER TABLE `sgab_account`
  ADD CONSTRAINT `sgab_account_costcenterid_sgab_costcenter_id` FOREIGN KEY (`costcenterid`) REFERENCES `sgab_costcenter` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `sgab_account_elementid_sgab_element_id` FOREIGN KEY (`elementid`) REFERENCES `sgab_element` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `sgab_account_parentid_sgab_account_id` FOREIGN KEY (`parentid`) REFERENCES `sgab_account` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `sgab_costcenter`
--
ALTER TABLE `sgab_costcenter`
  ADD CONSTRAINT `sgab_costcenter_parentid_sgab_costcenter_id` FOREIGN KEY (`parentid`) REFERENCES `sgab_costcenter` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `sgab_costcenterelementrelation`
--
ALTER TABLE `sgab_costcenterelementrelation`
  ADD CONSTRAINT `sgab_costcenterelementrelation_costcenter_id_sgab_costcenter_id` FOREIGN KEY (`costcenter_id`) REFERENCES `sgab_costcenter` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `sgab_costcenterelementrelation_element_id_sgab_element_id` FOREIGN KEY (`element_id`) REFERENCES `sgab_element` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `sgab_element`
--
ALTER TABLE `sgab_element`
  ADD CONSTRAINT `sgab_element_umid_sgab_um_id` FOREIGN KEY (`umid`) REFERENCES `sgab_um` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `sgab_elementelementrelation`
--
ALTER TABLE `sgab_elementelementrelation`
  ADD CONSTRAINT `sgab_elementelementrelation_from_id_sgab_element_id` FOREIGN KEY (`from_id`) REFERENCES `sgab_element` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `sgab_elementelementrelation_to_id_sgab_element_id` FOREIGN KEY (`to_id`) REFERENCES `sgab_element` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `sgab_entityuserrelation`
--
ALTER TABLE `sgab_entityuserrelation`
  ADD CONSTRAINT `sgab_entityuserrelation_sf_guard_user_id_sf_guard_user_id` FOREIGN KEY (`sf_guard_user_id`) REFERENCES `sf_guard_user` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `sgab_event`
--
ALTER TABLE `sgab_event`
  ADD CONSTRAINT `sgab_event_calendarid_sgab_calendar_id` FOREIGN KEY (`calendarid`) REFERENCES `sgab_calendar` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `sgab_event_reminderid_sgab_reminder_id` FOREIGN KEY (`reminderid`) REFERENCES `sgab_reminder` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `sgab_module`
--
ALTER TABLE `sgab_module`
  ADD CONSTRAINT `sgab_module_module_id_sgab_module_id` FOREIGN KEY (`module_id`) REFERENCES `sgab_module` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `sgab_moduledependencyrelation`
--
ALTER TABLE `sgab_moduledependencyrelation`
  ADD CONSTRAINT `sgab_moduledependencyrelation_dependency_id_sgab_module_id` FOREIGN KEY (`dependency_id`) REFERENCES `sgab_module` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `sgab_moduledependencyrelation_module_id_sgab_module_id` FOREIGN KEY (`module_id`) REFERENCES `sgab_module` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `sgab_modulepermission`
--
ALTER TABLE `sgab_modulepermission`
  ADD CONSTRAINT `sgab_modulepermission_module_id_sgab_module_id` FOREIGN KEY (`module_id`) REFERENCES `sgab_module` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `sgab_modulepermission_permission_id_sf_guard_permission_id` FOREIGN KEY (`permission_id`) REFERENCES `sf_guard_permission` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `sgab_person`
--
ALTER TABLE `sgab_person`
  ADD CONSTRAINT `sgab_person_sf_guard_user_id_sf_guard_user_id` FOREIGN KEY (`sf_guard_user_id`) REFERENCES `sf_guard_user` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `sgab_testing`
--
ALTER TABLE `sgab_testing`
  ADD CONSTRAINT `sgab_testing_parentid_sgab_testing_id` FOREIGN KEY (`parentid`) REFERENCES `sgab_testing` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `sgab_transaction`
--
ALTER TABLE `sgab_transaction`
  ADD CONSTRAINT `sgab_transaction_accountid_sgab_account_id` FOREIGN KEY (`accountid`) REFERENCES `sgab_account` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `sgab_transaction_comprobantid_sgab_comprobant_id` FOREIGN KEY (`comprobantid`) REFERENCES `sgab_comprobant` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `sgab_transaction_currencyid_sgab_currency_id` FOREIGN KEY (`currencyid`) REFERENCES `sgab_currency` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `sgab_transaction_elementid_sgab_element_id` FOREIGN KEY (`elementid`) REFERENCES `sgab_element` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `sgab_transaction_umid_sgab_um_id` FOREIGN KEY (`umid`) REFERENCES `sgab_um` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `sgab_umumrelation`
--
ALTER TABLE `sgab_umumrelation`
  ADD CONSTRAINT `sgab_umumrelation_from_id_sgab_um_id` FOREIGN KEY (`from_id`) REFERENCES `sgab_um` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `sgab_umumrelation_to_id_sgab_um_id` FOREIGN KEY (`to_id`) REFERENCES `sgab_um` (`id`) ON DELETE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

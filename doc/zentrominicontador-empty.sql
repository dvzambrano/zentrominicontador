-- phpMyAdmin SQL Dump
-- version 3.4.9
-- http://www.phpmyadmin.net
--
-- Servidor: localhost
-- Tiempo de generación: 28-12-2018 a las 03:07:07
-- Versión del servidor: 5.5.20
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
(1, 'admin', 'Administrador(a)', '2018-12-27 21:06:52', '2018-12-27 21:06:52'),
(2, 'advanced', 'Avanzado(a)', '2018-12-27 21:06:52', '2018-12-27 21:06:52'),
(3, 'basic', 'Usuario(a)', '2018-12-27 21:06:52', '2018-12-27 21:06:52');

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
(1, 1, '2018-12-27 21:06:52', '2018-12-27 21:06:52'),
(1, 2, '2018-12-27 21:06:52', '2018-12-27 21:06:52'),
(1, 3, '2018-12-27 21:06:52', '2018-12-27 21:06:52'),
(1, 4, '2018-12-27 21:06:52', '2018-12-27 21:06:52'),
(1, 5, '2018-12-27 21:06:52', '2018-12-27 21:06:52'),
(1, 6, '2018-12-27 21:06:52', '2018-12-27 21:06:52'),
(1, 7, '2018-12-27 21:06:52', '2018-12-27 21:06:52'),
(1, 8, '2018-12-27 21:06:52', '2018-12-27 21:06:52'),
(1, 9, '2018-12-27 21:06:52', '2018-12-27 21:06:52'),
(1, 10, '2018-12-27 21:06:52', '2018-12-27 21:06:52'),
(1, 11, '2018-12-27 21:06:52', '2018-12-27 21:06:52'),
(1, 12, '2018-12-27 21:06:52', '2018-12-27 21:06:52'),
(1, 13, '2018-12-27 21:06:52', '2018-12-27 21:06:52'),
(1, 14, '2018-12-27 21:06:52', '2018-12-27 21:06:52'),
(1, 15, '2018-12-27 21:06:52', '2018-12-27 21:06:52'),
(1, 16, '2018-12-27 21:06:52', '2018-12-27 21:06:52'),
(1, 17, '2018-12-27 21:06:52', '2018-12-27 21:06:52'),
(2, 1, '2018-12-27 21:06:52', '2018-12-27 21:06:52'),
(2, 2, '2018-12-27 21:06:52', '2018-12-27 21:06:52'),
(2, 3, '2018-12-27 21:06:52', '2018-12-27 21:06:52'),
(2, 4, '2018-12-27 21:06:52', '2018-12-27 21:06:52'),
(2, 5, '2018-12-27 21:06:52', '2018-12-27 21:06:52'),
(2, 6, '2018-12-27 21:06:52', '2018-12-27 21:06:52'),
(2, 10, '2018-12-27 21:06:52', '2018-12-27 21:06:52'),
(2, 12, '2018-12-27 21:06:52', '2018-12-27 21:06:52'),
(3, 8, '2018-12-27 21:06:52', '2018-12-27 21:06:52');

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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=55 ;

--
-- Volcado de datos para la tabla `sf_guard_permission`
--

INSERT INTO `sf_guard_permission` (`id`, `name`, `description`, `created_at`, `updated_at`) VALUES
(1, 'manageaccount', 'Administrar cuentas', '2018-12-27 21:06:52', '2018-12-27 21:06:52'),
(2, 'managecomprobant', 'Administrar comprobantes', '2018-12-27 21:06:52', '2018-12-27 21:06:52'),
(3, 'managecostcenter', 'Administrar negocio', '2018-12-27 21:06:52', '2018-12-27 21:06:52'),
(4, 'manageelement', 'Administrar elementos', '2018-12-27 21:06:52', '2018-12-27 21:06:52'),
(5, 'manageum', 'Administrar unidades de medida', '2018-12-27 21:06:52', '2018-12-27 21:06:52'),
(6, 'managecurrency', 'Administrar monedas', '2018-12-27 21:06:52', '2018-12-27 21:06:52'),
(7, 'managetransaction', 'Administrar balances', '2018-12-27 21:06:52', '2018-12-27 21:06:52'),
(8, 'manageconfiguration', 'Administrar configuracion global', '2018-12-27 21:06:52', '2018-12-27 21:06:52'),
(9, 'managemodule', 'Administrar módulos', '2018-12-27 21:06:52', '2018-12-27 21:06:52'),
(10, 'manageuser', 'Administrar usuarios', '2018-12-27 21:06:52', '2018-12-27 21:06:52'),
(11, 'manageperson', 'Administrar personas', '2018-12-27 21:06:52', '2018-12-27 21:06:52'),
(12, 'managelog', 'Administrar trazas', '2018-12-27 21:06:52', '2018-12-27 21:06:52'),
(13, 'managefiles', 'Administrar archivos', '2018-12-27 21:06:52', '2018-12-27 21:06:52'),
(14, 'managecharts', 'Administrar graficos', '2018-12-27 21:06:52', '2018-12-27 21:06:52'),
(15, 'managecalendar', 'Administrar calendario', '2018-12-27 21:06:52', '2018-12-27 21:06:52'),
(16, 'managecontacttype', 'Administrar tipos de contacto', '2018-12-27 21:06:52', '2018-12-27 21:06:52'),
(17, 'manageentity', 'Administrar entidades', '2018-12-27 21:06:52', '2018-12-27 21:06:52'),
(18, 'manageuseradd', 'Administrar usuarios (adicionar)', '2018-12-27 21:06:52', '2018-12-27 21:06:52'),
(19, 'manageuseredit', 'Administrar usuarios (editar)', '2018-12-27 21:06:52', '2018-12-27 21:06:52'),
(20, 'manageuserdelete', 'Administrar usuarios (eliminar)', '2018-12-27 21:06:52', '2018-12-27 21:06:52'),
(21, 'managecontacttypeadd', 'Administrar tipos de contacto (adicionar)', '2018-12-27 21:06:52', '2018-12-27 21:06:52'),
(22, 'managecontacttypeedit', 'Administrar tipos de contacto (editar)', '2018-12-27 21:06:52', '2018-12-27 21:06:52'),
(23, 'managecontacttypedelete', 'Administrar tipos de contacto (eliminar)', '2018-12-27 21:06:52', '2018-12-27 21:06:52'),
(24, 'managemoduleadd', 'Administrar módulos (adicionar)', '2018-12-27 21:06:52', '2018-12-27 21:06:52'),
(25, 'managemoduleedit', 'Administrar módulos (editar)', '2018-12-27 21:06:52', '2018-12-27 21:06:52'),
(26, 'managemoduledelete', 'Administrar módulos (eliminar)', '2018-12-27 21:06:52', '2018-12-27 21:06:52'),
(27, 'manageentityadd', 'Administrar entidades (adicionar)', '2018-12-27 21:06:52', '2018-12-27 21:06:52'),
(28, 'manageentityedit', 'Administrar entidades (editar)', '2018-12-27 21:06:52', '2018-12-27 21:06:52'),
(29, 'manageentitydelete', 'Administrar entidades (eliminar)', '2018-12-27 21:06:52', '2018-12-27 21:06:52'),
(30, 'manageselfentity', 'Administrar propia entidad', '2018-12-27 21:06:52', '2018-12-27 21:06:52'),
(31, 'managepersonadd', 'Administrar personas (adicionar)', '2018-12-27 21:06:53', '2018-12-27 21:06:53'),
(32, 'managepersonedit', 'Administrar personas (editar)', '2018-12-27 21:06:53', '2018-12-27 21:06:53'),
(33, 'managepersondelete', 'Administrar personas (eliminar)', '2018-12-27 21:06:53', '2018-12-27 21:06:53'),
(34, 'manageaccountadd', 'Administrar cuentas (adicionar)', '2018-12-27 21:06:53', '2018-12-27 21:06:53'),
(35, 'manageaccountedit', 'Administrar cuentas (editar)', '2018-12-27 21:06:53', '2018-12-27 21:06:53'),
(36, 'manageaccountdelete', 'Administrar cuentas (eliminar)', '2018-12-27 21:06:53', '2018-12-27 21:06:53'),
(37, 'manageaccountsplit', 'Aperturar cuentas para análisis', '2018-12-27 21:06:53', '2018-12-27 21:06:53'),
(38, 'manageaccountconsolidate', 'Consolidar saldos de cuentas', '2018-12-27 21:06:53', '2018-12-27 21:06:53'),
(39, 'managecomprobantadd', 'Administrar comprobantes (adicionar)', '2018-12-27 21:06:53', '2018-12-27 21:06:53'),
(40, 'managecomprobantedit', 'Administrar comprobantes (editar)', '2018-12-27 21:06:53', '2018-12-27 21:06:53'),
(41, 'managecomprobantdelete', 'Administrar comprobantes (eliminar)', '2018-12-27 21:06:53', '2018-12-27 21:06:53'),
(42, 'managecostcenteradd', 'Administrar negocio (adicionar)', '2018-12-27 21:06:53', '2018-12-27 21:06:53'),
(43, 'managecostcenteredit', 'Administrar negocio (editar)', '2018-12-27 21:06:53', '2018-12-27 21:06:53'),
(44, 'managecostcenterdelete', 'Administrar negocio (eliminar)', '2018-12-27 21:06:53', '2018-12-27 21:06:53'),
(45, 'manageelementadd', 'Administrar elementos (adicionar)', '2018-12-27 21:06:53', '2018-12-27 21:06:53'),
(46, 'manageelementedit', 'Administrar elementos (editar)', '2018-12-27 21:06:53', '2018-12-27 21:06:53'),
(47, 'manageelementdelete', 'Administrar elementos (eliminar)', '2018-12-27 21:06:53', '2018-12-27 21:06:53'),
(48, 'manageumadd', 'Administrar unidades de medida (adicionar)', '2018-12-27 21:06:53', '2018-12-27 21:06:53'),
(49, 'manageumedit', 'Administrar unidades de medida (editar)', '2018-12-27 21:06:53', '2018-12-27 21:06:53'),
(50, 'manageumdelete', 'Administrar unidades de medida (eliminar)', '2018-12-27 21:06:53', '2018-12-27 21:06:53'),
(51, 'managecurrencyadd', 'Administrar monedas (adicionar)', '2018-12-27 21:06:53', '2018-12-27 21:06:53'),
(52, 'managecurrencyedit', 'Administrar monedas (editar)', '2018-12-27 21:06:53', '2018-12-27 21:06:53'),
(53, 'managecurrencydelete', 'Administrar monedas (eliminar)', '2018-12-27 21:06:53', '2018-12-27 21:06:53'),
(54, 'managecostcenterconsolidate', 'Consolidar elementos de negocio', '2018-12-27 21:06:53', '2018-12-27 21:06:53');

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
  `email_address` varchar(255) DEFAULT NULL,
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
  UNIQUE KEY `username` (`username`),
  KEY `is_active_idx_idx` (`is_active`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Volcado de datos para la tabla `sf_guard_user`
--

INSERT INTO `sf_guard_user` (`id`, `first_name`, `last_name`, `email_address`, `username`, `algorithm`, `salt`, `password`, `is_active`, `is_super_admin`, `last_login`, `created_at`, `updated_at`) VALUES
(1, 'Daniel', 'Velazquez Zamora', 'admin@domain.com', 'admin', 'sha1', 'f3fb4a7d30a84221c6f08ff70f294d67', '2cab322e90d60b93c07af766ab3202848c299079', 1, 1, NULL, '2018-12-27 21:06:53', '2018-12-27 21:06:53'),
(2, 'Rafael', 'Avila Gonzalez', 'advanced@domain.com', 'advanced', 'sha1', 'e4dc723cd246ea3f5e6711eb8ba16dbf', 'a495a242258685715a6b8e3bcbbd5cf68bfdd50b', 1, 0, NULL, '2018-12-27 21:06:53', '2018-12-27 21:06:53'),
(3, 'Maira', 'Perez Ramos', 'basic@domain.com', 'basic', 'sha1', 'e630580de4fa89a2cc8a2207ffe03c05', '57849040cc078891dd4d3104f1245aa1e67f284d', 1, 0, NULL, '2018-12-27 21:06:53', '2018-12-27 21:06:53');

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
(1, 1, '2018-12-27 21:06:53', '2018-12-27 21:06:53'),
(2, 2, '2018-12-27 21:06:53', '2018-12-27 21:06:53'),
(3, 3, '2018-12-27 21:06:53', '2018-12-27 21:06:53');

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
-- Estructura de tabla para la tabla `sgab_testing`
--

CREATE TABLE IF NOT EXISTS `sgab_testing` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `parentid` bigint(20) DEFAULT NULL,
  `comment` text,
  `nick` varchar(50) NOT NULL,
  `name` varchar(130) NOT NULL,
  `code` varchar(50) NOT NULL,
  `path` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`),
  KEY `parentid_idx` (`parentid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `zab_calendar`
--

CREATE TABLE IF NOT EXISTS `zab_calendar` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `code` varchar(50) NOT NULL,
  `name` varchar(130) NOT NULL,
  `comment` text,
  `color` bigint(20) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Volcado de datos para la tabla `zab_calendar`
--

INSERT INTO `zab_calendar` (`id`, `code`, `name`, `comment`, `color`) VALUES
(1, '09476c3cf5f13e5c36d0e812f7364d88', 'Trabajo', NULL, 6),
(2, 'e41ee28e036aab0388bea90110a2ec74', 'Casa', NULL, 15),
(3, '17d311bb72096d252c26b3b926786211', 'Escuela', NULL, 26);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `zab_contacttype`
--

CREATE TABLE IF NOT EXISTS `zab_contacttype` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `code` varchar(50) NOT NULL,
  `name` varchar(130) NOT NULL,
  `comment` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

--
-- Volcado de datos para la tabla `zab_contacttype`
--

INSERT INTO `zab_contacttype` (`id`, `code`, `name`, `comment`) VALUES
(1, 'e97dd0fbd28d24199b154c8b80fea290', 'Teléfono Fijo', '\\+(?:[0-9] ?){6, 14}[0-9]'),
(2, '101c09e46111e0b8e972d6d908ba6d1e', 'Teléfono Móvil', NULL),
(3, '8e467397ce3ea1d84b02719bd3abc595', 'Fax', NULL),
(4, '0cbe06459c1a8c93ed1162ee5d312c72', 'Correo electrónico', '([\\w\\-\\''\\-]+)(\\.[\\w-\\''\\-]+)*@([\\w\\-]+\\.){1,5}([A-Za-z]){2,4}');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `zab_entity`
--

CREATE TABLE IF NOT EXISTS `zab_entity` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `code` varchar(50) NOT NULL,
  `name` varchar(200) NOT NULL,
  `comment` text,
  `logo` text,
  `images` text,
  `path` text,
  `parentid` bigint(20) DEFAULT NULL,
  `profile` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`),
  KEY `parentid_idx` (`parentid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Volcado de datos para la tabla `zab_entity`
--

INSERT INTO `zab_entity` (`id`, `code`, `name`, `comment`, `logo`, `images`, `path`, `parentid`, `profile`) VALUES
(1, '07b65800f19b2db218d9fd721e325722', 'Reynerio Cruz Hechavarria', NULL, NULL, NULL, NULL, NULL, NULL),
(2, '3173281b6def9cbc4757bc8edd0e1abb', 'UBPC Martires del Moncada', NULL, NULL, NULL, NULL, NULL, NULL),
(3, '13dbfec064686782381db7c4dcee614f', 'Restaurante 1920', NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `zab_entityuserrelation`
--

CREATE TABLE IF NOT EXISTS `zab_entityuserrelation` (
  `entity_id` bigint(20) NOT NULL DEFAULT '0',
  `sf_guard_user_id` bigint(20) NOT NULL DEFAULT '0',
  PRIMARY KEY (`entity_id`,`sf_guard_user_id`),
  KEY `zab_entityuserrelation_sf_guard_user_id_sf_guard_user_id` (`sf_guard_user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `zab_entityuserrelation`
--

INSERT INTO `zab_entityuserrelation` (`entity_id`, `sf_guard_user_id`) VALUES
(1, 1),
(2, 1),
(3, 1),
(1, 2),
(2, 2),
(2, 3),
(3, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `zab_event`
--

CREATE TABLE IF NOT EXISTS `zab_event` (
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
-- Volcado de datos para la tabla `zab_event`
--

INSERT INTO `zab_event` (`id`, `code`, `name`, `comment`, `allday`, `start`, `end`, `calendarid`, `reminderid`, `location`, `link`) VALUES
(1, '0d57c220a3ef147e1cf35430e303a603', 'Vacaciones', 'Tiempo de diversion...', 0, '2018-12-06 14:00:00', '2018-12-17 15:00:00', 2, 1, NULL, NULL),
(2, '40336cf3edc079a4f64446dffa121fdb', 'Almuerzo con Dcita', 'Debo estar una hora antes en el restaurant', 0, '2018-12-27 11:30:00', '2018-12-27 13:00:00', 1, 1, NULL, NULL),
(3, '9ff0c2c742ef6eff9ebb0a8160898008', 'Pagar la electricidad', NULL, 0, '2018-12-27 15:00:00', '2018-12-27 15:00:00', 1, NULL, NULL, NULL),
(4, 'd61915029953cccd22cc4df817b398c8', 'Cumpleaños de Mayra', 'Hay q comprar un regalo', 1, '2018-12-27 00:00:00', '2018-12-27 00:00:00', 2, NULL, NULL, NULL),
(5, 'bdbcb6692ff90ceeb50a26847d306f2f', 'Hacer ejercicios', NULL, 1, '2018-12-15 00:00:00', '2019-01-05 23:59:59', 1, NULL, NULL, NULL),
(6, 'e141a4c2bd74aa2c4efd27d07541c718', 'Pelarme', NULL, 0, '2018-12-27 09:00:00', '2018-12-27 09:30:00', 2, NULL, NULL, NULL),
(7, '4cbf1a8c26a033b0331597a48c3187a1', 'Consejo de direccion', NULL, 0, '2018-12-25 13:00:00', '2018-12-25 18:00:00', 1, NULL, NULL, NULL),
(8, '43568a3b57377c8866c644f3707a12aa', 'Noche de peliculas', NULL, 0, '2018-12-29 19:00:00', '2018-12-29 23:00:00', 2, NULL, NULL, NULL),
(9, '3ff2953c341b75df009234886ae7019f', 'Forum nacional', NULL, 0, '2019-01-04 08:00:00', '2019-01-09 16:00:00', 3, NULL, 'Ciudad de la Habana', 'www.forum.cuba.cu');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `zab_file`
--

CREATE TABLE IF NOT EXISTS `zab_file` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `code` varchar(50) NOT NULL,
  `name` varchar(130) NOT NULL,
  `url` text,
  `content` longtext,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `zab_metadata`
--

CREATE TABLE IF NOT EXISTS `zab_metadata` (
  `name` varchar(50) NOT NULL DEFAULT '',
  `comment` text,
  `value` text,
  `category` text,
  `is_visible` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `zab_metadata`
--

INSERT INTO `zab_metadata` (`name`, `comment`, `value`, `category`, `is_visible`) VALUES
('app_authldapfilterdn', 'Establece la ubicación de los usuarios en el LDAP', 'OU=Unit,DC=domain,DC=com', 'LDAP', 1),
('app_authldaprootdn', 'Establece la ubicación del usuario de búsqueda en el LDAP', 'CN=Users,DC=domain,DC=com', 'LDAP', 1),
('app_authldapsearchinguser', 'Establece el usuario usado para realizar la conexión con el LDAP', 'administrador', 'LDAP', 1),
('app_authldapsearchinguserpass', 'Establece la contraseña del usuario usado para realizar la conexión con el LDAP', 'C0ntrasenna', 'LDAP', 1),
('app_authldapserver', 'Permite definir el Nombre o Dirección IP del servidor LDAP', '192.168.3.22', 'LDAP', 1),
('app_authmode', 'Establece el tipo de autenticación a usar en el sistema: "local" (sin comillas) para usar la base de datos, "ldap" (sin comillas) para usar un directorio activo y "mixed" (sin comillas) para combinar ambos métodos', 'local', 'Seguridad', 1),
('app_businessmail', 'Permite definir la cuenta de correo que será utilizada para la realización de las transferencias de pago mediante PayPal y para el envío de las notificaciones generadas por el sistema.', 'zentro@nauta.cu', 'Sistema', 1),
('app_characteramounttofind', 'Permite definir a partir de cuántos caracteres se realizan búsquedas', '1', 'Sistema', 1),
('app_closureconfig', 'Configuracion de moviemiento de saldos entre cuentas al realizar cierre contable', '[{"fromaccount":{"id":"61","code":"40","name":"GRUPO DE CUENTAS NOMINALES","comment":"","path":"/NULL/61","parentid":null,"costcenterid":null,"elementid":null,"nature":false,"manualcode":true,"icon":"","entityid":"1","customicon":null,"leaf":"0","qtip":"GRUPO DE CUENTAS NOMINALES","text":"GRUPO DE CUENTAS NOMINALES","virtual":null,"deleteable":"1","loader":false,"qtipTitle":"40","iconCls":"icon-money"},"toaccount":{"id":"78","code":"50.999","name":"Resultado","comment":"Esta cuenta refleja al final del periodo contable, el resultado obtenido por el TCP en esta actividad, bien sea utilidad o perdida, producto del cierre de los saldos de las cuentas nominales","path":"/NULL/77/78","parentid":"77","costcenterid":null,"elementid":null,"nature":false,"manualcode":true,"icon":"","entityid":"1","Account":{"id":"77","code":"ME1->50","name":"CUENTA DE CIERRE","comment":"","path":"/NULL/77","parentid":null,"costcenterid":null,"elementid":null,"nature":false,"manualcode":true,"icon":null,"entityid":"1"},"customicon":null,"leaf":"1","qtip":"Resultado","text":"Resultado","virtual":null,"deleteable":"1","loader":false,"qtipTitle":"50.999","iconCls":"icon-money_open"}},{"fromaccount":{"id":"78","code":"50.999","name":"Resultado","comment":"Esta cuenta refleja al final del periodo contable, el resultado obtenido por el TCP en esta actividad, bien sea utilidad o perdida, producto del cierre de los saldos de las cuentas nominales","path":"/NULL/77/78","parentid":"77","costcenterid":null,"elementid":null,"nature":false,"manualcode":true,"icon":"","entityid":"1","Account":{"id":"77","code":"ME1->50","name":"CUENTA DE CIERRE","comment":"","path":"/NULL/77","parentid":null,"costcenterid":null,"elementid":null,"nature":false,"manualcode":true,"icon":null,"entityid":"1"},"customicon":null,"leaf":"1","qtip":"Resultado","text":"Resultado","virtual":null,"deleteable":"0","loader":false,"qtipTitle":"50.999","iconCls":"icon-money_open"},"toaccount":{"id":"59","code":"30.610","name":"Utilidad Retenida","comment":"Utilidades obtenidas enel periodo contable para su distribucion","path":"/NULL/52/59","parentid":"52","costcenterid":null,"elementid":null,"nature":false,"manualcode":true,"icon":"","entityid":"1","Account":{"id":"52","code":"ME1->30","name":"GRUPO DE PATRIMONIO","comment":"","path":"/NULL/52","parentid":null,"costcenterid":null,"elementid":null,"nature":false,"manualcode":true,"icon":null,"entityid":"1"},"customicon":null,"leaf":"1","qtip":"Utilidad Retenida","text":"Utilidad Retenida","virtual":null,"deleteable":"0","loader":false,"qtipTitle":"30.610","iconCls":"icon-money_open"},"condition":"Saldo positivo","conditionvalue":"balanceplus"},{"fromaccount":{"id":"78","code":"50.999","name":"Resultado","comment":"Esta cuenta refleja al final del periodo contable, el resultado obtenido por el TCP en esta actividad, bien sea utilidad o perdida, producto del cierre de los saldos de las cuentas nominales","path":"/NULL/77/78","parentid":"77","costcenterid":null,"elementid":null,"nature":false,"manualcode":true,"icon":"","entityid":"1","Account":{"id":"77","code":"ME1->50","name":"CUENTA DE CIERRE","comment":"","path":"/NULL/77","parentid":null,"costcenterid":null,"elementid":null,"nature":false,"manualcode":true,"icon":null,"entityid":"1"},"customicon":null,"leaf":"1","qtip":"Resultado","text":"Resultado","virtual":null,"deleteable":"0","loader":false,"qtipTitle":"50.999","iconCls":"icon-money_open"},"toaccount":{"id":"60","code":"30.620","name":"Perdida","comment":"Resultado negativo obtenido en cada periodo contable","path":"/NULL/52/60","parentid":"52","costcenterid":null,"elementid":null,"nature":false,"manualcode":true,"icon":"","entityid":"1","Account":{"id":"52","code":"ME1->30","name":"GRUPO DE PATRIMONIO","comment":"","path":"/NULL/52","parentid":null,"costcenterid":null,"elementid":null,"nature":false,"manualcode":true,"icon":null,"entityid":"1"},"customicon":null,"leaf":"0","qtip":"Perdida","text":"Perdida","virtual":null,"deleteable":"1","loader":false,"qtipTitle":"30.620","iconCls":"icon-money"},"condition":"Saldo negativo","conditionvalue":"balanceminus"}]', 'Negocio', 0),
('app_currencycode', 'Permite definir la moneda base con la que contabiliza el sistema.', 'CUP', 'Negocio', 1),
('app_defaultlanguaje', 'Define el idioma en que por defecto se cargarán las interfaces del sistema aun cuando pueden ser variadas localmente mediante el uso de la Barra superior.', 'es-Es', 'Sistema', 1),
('app_elementsongrid', 'Establece la cantidad de elementos a mostrar en una página de interfaz tabular correspondiente al área de trabajo. De esta forma el sistema se encarga de generar la paginación que entre otras cosas permite elevar el rendimiento de las consultas realizadas a las bases de datos.', '20', 'Tablas de datos', 1),
('app_fileintegrity', 'Establece la suma de chequeo de integridad de los archivos del sistema', '0e43b1fd3049c477b34aad4b68fb1467', 'Archivos', 0),
('app_filemaxsize', 'Establece el tamaño (en bytes) máximo de los archivos subidos del sistema', '5242880', 'Archivos', 1),
('app_filereadcontent', 'Permite definir la forma de leer los contenidos de un archivo. ("text" solo texto y "all" todo el contenido)', 'text', 'Archivos', 0),
('app_indexablefiles', 'Permite definir los tipos de archivos subidos al servidor que seran indexados para búsquedas. Deben ser especificados separados por coma.', 'doc,docx,xls,xlsx,pdf', 'Archivos', 0),
('app_ismultientidable', 'Permite definir si el sistema debe comportarse como multientidad', '1', 'Sistema', 1),
('app_lockaccountfor', 'Permite definir el tiempo en segundos por el que se bloquea a los usuarios que superan el máximo de intentos fallidos de autenticación', '300', 'Seguridad', 1),
('app_mailencryption', 'Establece el Tipo de Encriptado utilizado por el servidor de correo: ~, ssl, tls', '~', 'Correo', 1),
('app_mailhost', 'Establece el Nombre o la Dirección IP del servidor de correo', '10.0.0.1', 'Correo', 1),
('app_mailhostport', 'Establece el Puerto por el que escucha el servidor de correo', '25', 'Correo', 1),
('app_mailpassword', 'Establece el la Contraseña del usuario de correo utilizado para enviar las notificaciones', 'C0ntrasenna', 'Correo', 1),
('app_mailstrategy', 'Establece el la estrategia de envío de correos notificaciones: "queue" (sin comillas) para encolarlos y enviarlos mediante tarea programada del sistema y "realtime" (sin comillas) para entrega en tiempo real', 'queue', 'Correo', 1),
('app_mailusername', 'Establece el Usuario de correo utilizado para enviar las notificaciones', 'administrador@domain.com', 'Correo', 1),
('app_name', 'Permite variar el nombre del sistema mostrado el banner superior', 'Zentro&reg; Mini Contador', 'Sistema', 0),
('app_sendsystememails', 'Permite definir si el sistema enviará notificaciones por correo o no', '1', 'Sistema', 1),
('app_showgridtitle', 'Permite personalizar las vistas de las interfaces de gestión usando o no los títulos en las tablas.', '1', 'Tablas de datos', 1),
('app_showmessageonformloadfailed', 'Permite establecer si el sistema mostrará mensajes de notificación cuando NO se hayan cargado datos a un formulario satisfactoriamente', '1', 'Notificaciones', 1),
('app_showmessageonformloadposition', 'Permite establecer cómo el sistema mostrará mensajes de notificación (top: notificacion superior, window: en una ventana de información).', 'top', 'Notificaciones', 1),
('app_showmessageonformloadsuccessful', 'Permite establecer si el sistema mostrará mensajes de notificación cuando se hayan cargado datos a un formulario satisfactoriamente', '', 'Notificaciones', 1),
('app_showmessageonmoduleloadsuccessful', 'Permite establecer si el sistema mostrará mensajes de notificación cuando se active un módulo satisfactoriamente', '1', 'Notificaciones', 1),
('app_showmessageonstoreloadfailed', 'Permite establecer si el sistema mostrará mensajes de notificación cuando NO se hayan cargado satisfactoriamente las fuentes de datos', '1', 'Notificaciones', 1),
('app_showmessageonstoreloadsuccessful', 'Permite establecer si el sistema mostrará mensajes de notificación cuando se hayan cargado satisfactoriamente las fuentes de datos', '', 'Notificaciones', 1),
('app_unsuccessfulloginattempts', 'Permite definir la cantidad de intentos de autenticación fallidos antes de bloquear el acceso al usuario', '3', 'Seguridad', 1),
('app_uploadimagedestination', 'Permite definir el lugar donde se desean guardar las imagenes de usuarios del sistema. ("file" como archivos y "db" en la base de datos)', 'file', 'Archivos', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `zab_module`
--

CREATE TABLE IF NOT EXISTS `zab_module` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `code` varchar(50) NOT NULL,
  `name` varchar(130) NOT NULL,
  `nick` varchar(130) NOT NULL,
  `icon` varchar(130) DEFAULT NULL,
  `comment` text,
  `attributes` text,
  `relations` text,
  `is_active` tinyint(1) DEFAULT '1',
  `is_multientity` tinyint(1) DEFAULT '0',
  `is_multientidable` tinyint(1) DEFAULT '0',
  `is_base` tinyint(1) DEFAULT '0',
  `parentid` bigint(20) DEFAULT NULL,
  `path` text,
  `increase` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`),
  KEY `parentid_idx` (`parentid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=22 ;

--
-- Volcado de datos para la tabla `zab_module`
--

INSERT INTO `zab_module` (`id`, `code`, `name`, `nick`, `icon`, `comment`, `attributes`, `relations`, `is_active`, `is_multientity`, `is_multientidable`, `is_base`, `parentid`, `path`, `increase`) VALUES
(1, 'e7af0863035207943f53f63d68f6f170', 'Gráficos', 'Chart', 'wtop-charts.png', 'Generador de gráficos del sistema', NULL, NULL, 0, 0, 0, 1, NULL, NULL, '9000000000'),
(2, 'a6d080f2730d57c1da1e777002102139', 'Calendario', 'Calendar', 'wtop-calendars.png', 'Visor de eventos del sistema', '[{"name":"Nombre","nick":"name","type":"string","restriction":"","nulleable":false},{"name":"Descripción","nick":"comment","type":"string","restriction":"","nulleable":false}]', NULL, 0, 0, 0, 1, NULL, NULL, '9000000000'),
(3, 'a7c68a28d40f282bae2ee54b5abcb65a', 'Recordatorios', 'Reminder', 'wtop-reminders.png', 'Gestión de recordatorios del sistema', '[{"name":"Nombre","nick":"name","type":"string","restriction":"","nulleable":false},{"name":"Descripción","nick":"comment","type":"string","restriction":"","nulleable":false},{"name":"Valor","nick":"value","type":"int","restriction":"","nulleable":false},{"name":"Periodo","nick":"period","type":"int","restriction":"","nulleable":false}]', NULL, 0, 0, 0, 1, NULL, NULL, '9000000000'),
(4, '0abc28bcb832a6bbd1c673309cbad21a', 'Usuarios', 'User', 'wtop-users.png', 'Gestión de usuarios del sistema', NULL, NULL, 1, 0, 0, 1, NULL, NULL, '9000000000'),
(5, '1b57cc8f13c60c87a1c96d8f6d538c20', 'Tipos de contacto', 'Contacttype', 'ekiga.png', 'Gestión de tipos de contacto', '[{"ispk":true,"name":"Código","nick":"code","type":"string","restriction":"50","nulleable":false},{"isak":true,"name":"Nombre","nick":"name","type":"string","restriction":"130","nulleable":false},{"name":"Descripción","nick":"comment","type":"string","restriction":"","nulleable":true}]', NULL, 0, 0, 0, 0, NULL, NULL, '0000000070'),
(6, 'f77828c55becd4d2013f22bfbf5ccf94', 'Configuración', 'Metadata', 'wtop-config.png', 'Configuraci&oacute;n general del sistema', NULL, NULL, 1, 0, 0, 1, NULL, NULL, '9000000000'),
(7, 'bf2d27ca3e7f635e06ac60a586240083', 'Trazas', 'Log', 'wtop-logs.png', 'Auditoría de trazas del sistema', NULL, NULL, 1, 0, 0, 1, NULL, NULL, '9000000000'),
(8, 'a95374dafe28f54b7ce7729f8378c819', 'Módulos', 'Module', 'wtop-modules.png', 'Gestión de módulos del sistema', '[{"name":"Código","nick":"code","type":"string","restriction":"","nulleable":false},{"name":"Nombre","nick":"name","type":"string","restriction":"","nulleable":false},{"name":"Alias","nick":"nick","type":"string","restriction":"","nulleable":false},{"name":"Descripción","nick":"comment","type":"string","restriction":"","nulleable":false},{"name":"Ícono","nick":"icon","type":"string","restriction":"","nulleable":true}]', NULL, 0, 0, 0, 1, NULL, NULL, '9000000000'),
(9, '88a72558f6d824e814086ec6abd3854c', 'Editor de contenido', 'Contenteditor', 'page_paintbrush.png', 'Editor de contenido', '[{"ispk":true,"name":"Código","nick":"code","type":"string","restriction":"50","nulleable":false},{"isak":true,"name":"Nombre","nick":"name","type":"string","restriction":"130","nulleable":false},{"name":"Descripción","nick":"comment","type":"string","restriction":"","nulleable":true}]', NULL, 0, 0, 0, 1, NULL, NULL, '9000000000'),
(10, '566e353f89a32c0ff6d3f1374a7d54d1', 'Explorador', 'Explorer', 'wtop-explorer.png', 'Gestión de archivos y carpetas del sistema', '[{"name":"Nombre","nick":"name","type":"string","restriction":"","nulleable":false},{"name":"Fecha de modificación","nick":"lastmod","type":"string","restriction":"","nulleable":false},{"name":"Tamaño","nick":"size","type":"string","restriction":"","nulleable":false}]', NULL, 0, 0, 0, 1, NULL, NULL, '0000000160'),
(11, '80b5b2da7cd15147b2806b3538203255', 'Editor de notas', 'Note', 'page_paintbrush.png', 'Editor de notas', '[{"ispk":true,"name":"Código","nick":"code","type":"string","restriction":"50","nulleable":false},{"isak":true,"name":"Nombre","nick":"name","type":"string","restriction":"130","nulleable":false},{"name":"Descripción","nick":"comment","type":"string","restriction":"","nulleable":true}]', NULL, 0, 0, 0, 1, NULL, NULL, '9000000000'),
(12, '8f7e9c530f21c4eeec00789f82bb8938', 'Clientes', 'Entity', 'shutter.png', 'Gestión de clientes', '[{"ispk":true,"name":"Código","nick":"code","type":"string","restriction":"50","nulleable":false},{"isak":true,"name":"Nombre","nick":"name","type":"string","restriction":"130","nulleable":false},{"name":"Descripción","nick":"comment","type":"string","restriction":"","nulleable":true},{"name":"Padre","nick":"parentid","type":"integer","restriction":"","nulleable":true}]', '[{"attributeid":"parentid","attribute":"Padre","typeid":"onetomany","type":"Uno a muchos","moduleid":"Entity","module":"Entidades"}]', 1, 1, 0, 1, NULL, NULL, '0000000010'),
(13, 'b568e034a58149ab3e8233273bb6714f', 'Entidad', 'Entitymanager', 'shutter.png', 'Gestión de la entidad', '[{"ispk":true,"name":"Código","nick":"code","type":"string","restriction":"50","nulleable":false},{"isak":true,"name":"Nombre","nick":"name","type":"string","restriction":"130","nulleable":false},{"name":"Descripción","nick":"comment","type":"string","restriction":"","nulleable":true},{"name":"Padre","nick":"parentid","type":"integer","restriction":"","nulleable":true}]', '[{"attributeid":"parentid","attribute":"Padre","typeid":"onetomany","type":"Uno a muchos","moduleid":"Entity","module":"Entidades"}]', 0, 0, 1, 1, NULL, NULL, '00000000001'),
(14, 'a1bc2d6ebcc1280df1d2d35cb69eb038', 'Personas', 'Person', 'wtop-users.png', 'Gestión de personas de la entidad', NULL, NULL, 0, 0, 0, 1, NULL, NULL, '0000000070'),
(15, 'fd634f3522b4d3d915011d95683c8464', 'Nomenclador de cuentas', 'Account', 'money.png', 'Gestión de cuentas, su naturaleza, aperturas y saldos', '[{"ispk":true,"name":"Código","nick":"code","type":"string","restriction":"30","nulleable":false},{"isak":true,"name":"Nombre","nick":"name","type":"string","restriction":"130","nulleable":false},{"name":"Descripción","nick":"comment","type":"string","restriction":"","nulleable":true},{"name":"Padre","nick":"parentid","type":"integer","restriction":"","nulleable":true}]', '[{"attributeid":"parentid","attribute":"Padre","typeid":"onetomany","type":"Uno a muchos","moduleid":"Account","module":"Ã?rbol paginado"}]', 1, 0, 1, 0, NULL, NULL, '0000000050'),
(16, 'c944b62fb3b139ee372966b9c2cfbd55', 'Comprobantes de operaciones', 'Comprobant', 'page_copy.png', 'Gestión de comprobantes de operaciones', '[{"ispk":true,"name":"Código","nick":"code","type":"string","restriction":"30","nulleable":false},{"isak":true,"name":"Nombre","nick":"name","type":"string","restriction":"130","nulleable":false},{"name":"Descripción","nick":"comment","type":"string","restriction":"","nulleable":true}]', NULL, 1, 0, 1, 0, NULL, NULL, NULL),
(17, '8e802ff76d88148c2a8b99085d6c168f', 'Balances de comprobación', 'Transaction', 'map.png', 'Balances de comprobación de saldos', '[{"ispk":true,"name":"Código","nick":"code","type":"string","restriction":"30","nulleable":false},{"isak":true,"name":"Nombre","nick":"name","type":"string","restriction":"130","nulleable":false},{"name":"Descripción","nick":"comment","type":"string","restriction":"","nulleable":true},{"name":"Cantidad","nick":"amount","type":"decimal","restriction":""}]', NULL, 0, 0, 1, 0, NULL, NULL, NULL),
(18, '970d5939ba2f2fa60e0de3532111ddbd', 'Negocios', 'Costcenter', 'building.png', 'Gestión de negocios', '[{"ispk":true,"name":"Código","nick":"code","type":"string","restriction":"30","nulleable":false},{"isak":true,"name":"Nombre","nick":"name","type":"string","restriction":"130","nulleable":false},{"name":"Descripción","nick":"comment","type":"string","restriction":"","nulleable":true},{"name":"Padre","nick":"parentid","type":"integer","restriction":"","nulleable":true}]', '[{"attributeid":"parentid","attribute":"Padre","typeid":"onetomany","type":"Uno a muchos","moduleid":"Costcenter","module":"Ã?rbol paginado"}]', 1, 0, 1, 0, NULL, NULL, '0000000060'),
(19, '6aa4601e49a56d928205c271b55fd463', 'Elementos', 'Element', 'bricks.png', 'Gestión de elementos', '[{"ispk":true,"name":"Código","nick":"code","type":"string","restriction":"30","nulleable":false},{"isak":true,"name":"Nombre","nick":"name","type":"string","restriction":"130","nulleable":false},{"name":"Descripción","nick":"comment","type":"string","restriction":"","nulleable":true}]', NULL, 1, 0, 1, 0, NULL, NULL, '0000000060'),
(20, '38001b8d078e73b61835c0f1d249e66c', 'Unidades de medida', 'Um', 'text_letterspacing.png', 'Gestión de unidades de medida', '[{"ispk":true,"name":"Código","nick":"code","type":"string","restriction":"30","nulleable":false},{"isak":true,"name":"Nombre","nick":"name","type":"string","restriction":"130","nulleable":false},{"name":"Descripción","nick":"comment","type":"string","restriction":"","nulleable":true}]', NULL, 1, 0, 0, 0, NULL, NULL, '0000000080'),
(21, 'dad5bebc4467f517ec979ae98f54c87e', 'Monedas', 'Currency', 'coins.png', 'Gestión de monedas', '[{"ispk":true,"name":"Código","nick":"code","type":"string","restriction":"30","nulleable":false},{"isak":true,"name":"Nombre","nick":"name","type":"string","restriction":"130","nulleable":false},{"name":"Descripción","nick":"comment","type":"string","restriction":"","nulleable":true}]', NULL, 1, 0, 0, 0, NULL, NULL, '0000000090');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `zab_moduledependencyrelation`
--

CREATE TABLE IF NOT EXISTS `zab_moduledependencyrelation` (
  `module_id` bigint(20) NOT NULL DEFAULT '0',
  `dependency_id` bigint(20) NOT NULL DEFAULT '0',
  PRIMARY KEY (`module_id`,`dependency_id`),
  KEY `zab_moduledependencyrelation_dependency_id_zab_module_id` (`dependency_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `zab_moduledependencyrelation`
--

INSERT INTO `zab_moduledependencyrelation` (`module_id`, `dependency_id`) VALUES
(15, 2),
(16, 2),
(2, 3),
(3, 4),
(8, 4),
(14, 4),
(4, 5),
(12, 5),
(13, 5),
(11, 9),
(9, 10),
(12, 10),
(15, 10),
(13, 11),
(13, 12),
(15, 16),
(15, 17),
(16, 17),
(15, 18),
(16, 18),
(15, 19),
(16, 19),
(18, 19),
(15, 20),
(16, 20),
(18, 20),
(19, 20),
(16, 21);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `zab_modulepermission`
--

CREATE TABLE IF NOT EXISTS `zab_modulepermission` (
  `module_id` bigint(20) NOT NULL DEFAULT '0',
  `permission_id` bigint(20) NOT NULL DEFAULT '0',
  PRIMARY KEY (`module_id`,`permission_id`),
  KEY `zab_modulepermission_permission_id_sf_guard_permission_id` (`permission_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `zab_modulepermission`
--

INSERT INTO `zab_modulepermission` (`module_id`, `permission_id`) VALUES
(15, 1),
(16, 2),
(18, 3),
(19, 4),
(20, 5),
(21, 6),
(17, 7),
(6, 8),
(8, 9),
(9, 9),
(11, 9),
(4, 10),
(14, 11),
(7, 12),
(10, 13),
(1, 14),
(2, 15),
(3, 15),
(5, 16),
(12, 17),
(13, 17),
(4, 18),
(4, 19),
(4, 20),
(5, 21),
(5, 22),
(5, 23),
(8, 24),
(9, 24),
(11, 24),
(8, 25),
(9, 25),
(11, 25),
(8, 26),
(9, 26),
(11, 26),
(12, 27),
(12, 28),
(12, 29),
(13, 30),
(14, 31),
(14, 32),
(14, 33),
(15, 34),
(15, 35),
(15, 36),
(15, 37),
(15, 38),
(16, 39),
(16, 40),
(16, 41),
(18, 42),
(18, 43),
(18, 44),
(19, 45),
(19, 46),
(19, 47),
(20, 48),
(20, 49),
(20, 50),
(21, 51),
(21, 52),
(21, 53);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `zab_note`
--

CREATE TABLE IF NOT EXISTS `zab_note` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `comment` longtext,
  `amount` decimal(18,2) DEFAULT NULL,
  `json` longtext,
  `person_id` bigint(20) DEFAULT NULL,
  `parentid` bigint(20) DEFAULT NULL,
  `entityid` text,
  `entity` text,
  `increase` text,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `person_id_idx` (`person_id`),
  KEY `parentid_idx` (`parentid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `zab_person`
--

CREATE TABLE IF NOT EXISTS `zab_person` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `code` varchar(50) DEFAULT NULL,
  `comment` text,
  `picture` text,
  `profile` text,
  `sf_guard_user_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`),
  KEY `sf_guard_user_id_idx` (`sf_guard_user_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Volcado de datos para la tabla `zab_person`
--

INSERT INTO `zab_person` (`id`, `code`, `comment`, `picture`, `profile`, `sf_guard_user_id`) VALUES
(1, '81092719101', NULL, NULL, NULL, 1),
(2, '69100514261', NULL, NULL, NULL, 2),
(3, '73062011688', NULL, NULL, NULL, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `zab_reminder`
--

CREATE TABLE IF NOT EXISTS `zab_reminder` (
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
-- Volcado de datos para la tabla `zab_reminder`
--

INSERT INTO `zab_reminder` (`id`, `code`, `name`, `comment`, `value`, `period`) VALUES
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
-- Estructura de tabla para la tabla `zmc_account`
--

CREATE TABLE IF NOT EXISTS `zmc_account` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `code` varchar(50) NOT NULL,
  `name` varchar(130) NOT NULL,
  `comment` text,
  `path` text,
  `parentid` bigint(20) DEFAULT NULL,
  `costcenterid` bigint(20) DEFAULT NULL,
  `elementid` bigint(20) DEFAULT NULL,
  `nature` tinyint(1) DEFAULT '1',
  `manualcode` tinyint(1) DEFAULT '0',
  `icon` text,
  `entityid` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`),
  KEY `parentid_idx` (`parentid`),
  KEY `costcenterid_idx` (`costcenterid`),
  KEY `elementid_idx` (`elementid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `zmc_closeup`
--

CREATE TABLE IF NOT EXISTS `zmc_closeup` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `code` varchar(50) NOT NULL,
  `name` varchar(130) NOT NULL,
  `comment` text,
  `creationdate` datetime DEFAULT NULL,
  `entityid` bigint(20) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `zmc_comprobant`
--

CREATE TABLE IF NOT EXISTS `zmc_comprobant` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `code` varchar(50) NOT NULL,
  `name` varchar(130) NOT NULL,
  `comment` text,
  `creationdate` datetime DEFAULT NULL,
  `is_modificable` tinyint(1) DEFAULT '1',
  `entityid` bigint(20) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `zmc_costcenter`
--

CREATE TABLE IF NOT EXISTS `zmc_costcenter` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `code` varchar(50) NOT NULL,
  `name` varchar(130) NOT NULL,
  `comment` text,
  `parentid` bigint(20) DEFAULT NULL,
  `path` text,
  `icon` text,
  `entityid` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`),
  KEY `parentid_idx` (`parentid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

--
-- Volcado de datos para la tabla `zmc_costcenter`
--

INSERT INTO `zmc_costcenter` (`id`, `code`, `name`, `comment`, `parentid`, `path`, `icon`, `entityid`) VALUES
(1, '2e810b6fd4ae19329e7bac8962ec6039', 'Cobransa', NULL, NULL, '/NULL/1', NULL, 1),
(2, 'd6d44eaf5673be1a6c7f43759a9d91eb', 'ALMACÉN', NULL, 1, '/NULL/1/2', NULL, 1),
(3, 'f7d8a6fa8a23f4437ee0d03aea2cdb4b', 'Cafetería1', 'Cafetería de Cobransa', 1, '/NULL/1/3', NULL, 1),
(4, '0732e96e1f1173a33f22695b07d957cb', 'Mecanografia', NULL, 1, '/NULL/1/4', NULL, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `zmc_costcenterelementrelation`
--

CREATE TABLE IF NOT EXISTS `zmc_costcenterelementrelation` (
  `costcenter_id` bigint(20) NOT NULL DEFAULT '0',
  `element_id` bigint(20) NOT NULL DEFAULT '0',
  PRIMARY KEY (`costcenter_id`,`element_id`),
  KEY `zmc_costcenterelementrelation_element_id_zmc_element_id` (`element_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `zmc_costcenterelementrelation`
--

INSERT INTO `zmc_costcenterelementrelation` (`costcenter_id`, `element_id`) VALUES
(2, 2),
(3, 2),
(2, 6),
(3, 6),
(2, 8),
(3, 8),
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
(2, 38),
(2, 40);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `zmc_currency`
--

CREATE TABLE IF NOT EXISTS `zmc_currency` (
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
-- Volcado de datos para la tabla `zmc_currency`
--

INSERT INTO `zmc_currency` (`id`, `code`, `name`, `comment`, `rate`, `isactive`) VALUES
(1, 'CUP', 'Peso cubano', NULL, 1.00000, 1),
(2, 'CUC', 'Peso cubano libremente convertible', NULL, 0.04000, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `zmc_element`
--

CREATE TABLE IF NOT EXISTS `zmc_element` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `comment` text,
  `name` varchar(130) NOT NULL,
  `code` varchar(50) NOT NULL,
  `umid` bigint(20) DEFAULT NULL,
  `entityid` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`),
  KEY `umid_idx` (`umid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=41 ;

--
-- Volcado de datos para la tabla `zmc_element`
--

INSERT INTO `zmc_element` (`id`, `comment`, `name`, `code`, `umid`, `entityid`) VALUES
(1, NULL, 'Café', '8939e231102341962e63fa66b4aa0eb1', 1, 1),
(2, NULL, 'Café elaborado', 'e886017e99ec05578f8b88719cc473cc', 2, 1),
(3, NULL, 'Leche', 'afcdb8c8f93715066032ddb0262b689a', 11, 1),
(4, NULL, 'Leche elaborada', '5ff567fdd2176d0e67f8d77ab01d4da8', 3, 1),
(5, NULL, 'Chocolate en polvo', '4d8fbf1e0c0ae27e0ead132e0f645ced', 11, 1),
(6, NULL, 'Chocolate elaborado', 'd5785fc20649d91421631a4b13def071', 3, 1),
(7, NULL, 'Polvo para batido', '0a85b2551fa2aa907287e8defd2c848f', 11, 1),
(8, NULL, 'Batido elaborado', 'e54d1444c94bb3af29315d0fe2932658', 3, 1),
(9, NULL, 'Refresco', '38bd91bc61bacc6f7e19ba8d91292cd6', 3, 1),
(10, NULL, 'Refresco de lata', '8821ee25c865bd43e6d2263c5a3ebad6', 1, 1),
(11, NULL, 'Yogurt', '047d0070dbc6d060b84a10287571d92e', 7, 1),
(12, NULL, 'Yogurt elaborado', 'a261362b715aebfa1ac82ff3714fb29a', 3, 1),
(13, NULL, 'Pan en bola', 'd2599b70a50acb8b40ed81fb04fb5a84', 4, 1),
(14, NULL, 'Pan telera', '7c894ebfdb54d7393bd98bcba812e505', 4, 1),
(15, NULL, 'Hamburguesa', 'ca5c7ad29bd41cf5f969a8c9e5295dc1', 4, 1),
(16, NULL, 'Jamón', 'fbc19a2b0793c505a3fb1356eb5eb735', 4, 1),
(17, NULL, 'Queso 5', '6712e473f407cc01d840ea1b4ae330ad', 4, 1),
(18, NULL, 'Queso 10', '801fa172d8999467029311afcec81b32', 4, 1),
(19, NULL, 'Mantequilla', '5ec9b32e8b03f3ac2a1a6d58f6ca944a', 4, 1),
(20, NULL, 'Salchicha', '831c4144689e18f5381ba1788f51306f', 4, 1),
(21, NULL, 'Panqué', 'ed009fe3ad586dcaec1952d0141a9312', 4, 1),
(22, NULL, 'Pasta de maní 2', '787f669bd9f09f8700e2dd192510b6b2', 4, 1),
(23, NULL, 'Pasta de maní 5', 'a0b266ce8c0346435973c46bfe4ee61b', 4, 1),
(24, NULL, 'Biscocho', 'e5df0152539b899a54cd7b022f715fdd', 4, 1),
(25, NULL, 'Guataquita', '234a7782dad0b5b7b5b3d4e10fdeed58', 4, 1),
(26, NULL, 'Polvorón', '748b96e276ca42aed9ed7b089730f882', 4, 1),
(27, NULL, 'Nayara', '0db5ac4347ea72286b108bbfb026c617', 4, 1),
(28, NULL, 'Chocomani', '25084778eea51bb8b43136aad4f11c9a', 4, 1),
(29, NULL, 'Turron de coco', '0636afee751817d63babc177ad1e5ea2', 4, 1),
(30, NULL, 'Marquesita', 'ca1cf4a2620cb6c541910557ad8dc241', 4, 1),
(31, NULL, 'Rollito', '1392b7482b05d6aff42fb176cfe4fcbd', 4, 1),
(32, NULL, 'Pastel', '61ad7390574ccfa79e75b25aa6011d1c', 4, 1),
(33, NULL, 'Helado', '913a786123a4229a2851dc3cfe04690a', 4, 1),
(34, NULL, 'Barquilla', 'b633a21d7b57b74e811201dd1e30cfe3', 4, 1),
(35, NULL, 'Eclear', 'b97c42ea9e72333592a53ff46b55ef87', 4, 1),
(36, NULL, 'Empanadilla', 'd4eded9f076ef05bcb64ab2b3748621f', 4, 1),
(37, NULL, 'Salario', '8d79b1993c28d7565fb3552285bf0449', 12, 1),
(38, NULL, 'Electricidad', 'e9e22f8c911be4c98198de540d291fae', 13, 1),
(39, NULL, 'Aceite', '5f22a1946496f92594a58c5801d1cce2', 7, 1),
(40, NULL, 'Bocadito de jamón y queso', '6eb6f35c70a6771580dd8ab6d2610a8c', 4, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `zmc_elementelementrelation`
--

CREATE TABLE IF NOT EXISTS `zmc_elementelementrelation` (
  `from_id` bigint(20) NOT NULL DEFAULT '0',
  `to_id` bigint(20) NOT NULL DEFAULT '0',
  `rate` decimal(18,2) DEFAULT NULL,
  PRIMARY KEY (`from_id`,`to_id`),
  KEY `zmc_elementelementrelation_to_id_zmc_element_id` (`to_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `zmc_elementelementrelation`
--

INSERT INTO `zmc_elementelementrelation` (`from_id`, `to_id`, `rate`) VALUES
(40, 13, 1.00),
(40, 16, 1.00),
(40, 17, 1.00);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `zmc_transaction`
--

CREATE TABLE IF NOT EXISTS `zmc_transaction` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `comment` text,
  `debit` decimal(18,2) DEFAULT NULL,
  `credit` decimal(18,2) DEFAULT NULL,
  `rate` decimal(18,2) DEFAULT NULL,
  `currencyid` bigint(20) DEFAULT NULL,
  `comprobantid` bigint(20) DEFAULT NULL,
  `accountid` bigint(20) DEFAULT NULL,
  `amount` decimal(18,2) DEFAULT NULL,
  `umid` bigint(20) DEFAULT NULL,
  `creditave` decimal(18,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `currencyid_idx` (`currencyid`),
  KEY `comprobantid_idx` (`comprobantid`),
  KEY `accountid_idx` (`accountid`),
  KEY `umid_idx` (`umid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `zmc_um`
--

CREATE TABLE IF NOT EXISTS `zmc_um` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `code` varchar(50) NOT NULL,
  `name` varchar(130) NOT NULL,
  `comment` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=14 ;

--
-- Volcado de datos para la tabla `zmc_um`
--

INSERT INTO `zmc_um` (`id`, `code`, `name`, `comment`) VALUES
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
(11, 'deec698b804a8cfed2a4179e37b2d7f5', 'Gramo', NULL),
(12, 'cd3f7bb12da886f63d043639e885c7dc', 'Persona', NULL),
(13, '1b620bdcaad29de4d8874a83b65fdd9f', 'Kilowatts', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `zmc_umumrelation`
--

CREATE TABLE IF NOT EXISTS `zmc_umumrelation` (
  `from_id` bigint(20) NOT NULL DEFAULT '0',
  `to_id` bigint(20) NOT NULL DEFAULT '0',
  `rate` decimal(18,2) DEFAULT NULL,
  PRIMARY KEY (`from_id`,`to_id`),
  KEY `zmc_umumrelation_to_id_zmc_um_id` (`to_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `zmc_umumrelation`
--

INSERT INTO `zmc_umumrelation` (`from_id`, `to_id`, `rate`) VALUES
(1, 2, 4.00),
(2, 5, 8.00);

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
-- Filtros para la tabla `sgab_testing`
--
ALTER TABLE `sgab_testing`
  ADD CONSTRAINT `sgab_testing_parentid_sgab_testing_id` FOREIGN KEY (`parentid`) REFERENCES `sgab_testing` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `zab_entity`
--
ALTER TABLE `zab_entity`
  ADD CONSTRAINT `zab_entity_parentid_zab_entity_id` FOREIGN KEY (`parentid`) REFERENCES `zab_entity` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `zab_entityuserrelation`
--
ALTER TABLE `zab_entityuserrelation`
  ADD CONSTRAINT `zab_entityuserrelation_entity_id_zab_entity_id` FOREIGN KEY (`entity_id`) REFERENCES `zab_entity` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `zab_entityuserrelation_sf_guard_user_id_sf_guard_user_id` FOREIGN KEY (`sf_guard_user_id`) REFERENCES `sf_guard_user` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `zab_event`
--
ALTER TABLE `zab_event`
  ADD CONSTRAINT `zab_event_calendarid_zab_calendar_id` FOREIGN KEY (`calendarid`) REFERENCES `zab_calendar` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `zab_event_reminderid_zab_reminder_id` FOREIGN KEY (`reminderid`) REFERENCES `zab_reminder` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `zab_module`
--
ALTER TABLE `zab_module`
  ADD CONSTRAINT `zab_module_parentid_zab_module_id` FOREIGN KEY (`parentid`) REFERENCES `zab_module` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `zab_moduledependencyrelation`
--
ALTER TABLE `zab_moduledependencyrelation`
  ADD CONSTRAINT `zab_moduledependencyrelation_dependency_id_zab_module_id` FOREIGN KEY (`dependency_id`) REFERENCES `zab_module` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `zab_moduledependencyrelation_module_id_zab_module_id` FOREIGN KEY (`module_id`) REFERENCES `zab_module` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `zab_modulepermission`
--
ALTER TABLE `zab_modulepermission`
  ADD CONSTRAINT `zab_modulepermission_module_id_zab_module_id` FOREIGN KEY (`module_id`) REFERENCES `zab_module` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `zab_modulepermission_permission_id_sf_guard_permission_id` FOREIGN KEY (`permission_id`) REFERENCES `sf_guard_permission` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `zab_note`
--
ALTER TABLE `zab_note`
  ADD CONSTRAINT `zab_note_parentid_zab_note_id` FOREIGN KEY (`parentid`) REFERENCES `zab_note` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `zab_note_person_id_zab_person_id` FOREIGN KEY (`person_id`) REFERENCES `zab_person` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `zab_person`
--
ALTER TABLE `zab_person`
  ADD CONSTRAINT `zab_person_sf_guard_user_id_sf_guard_user_id` FOREIGN KEY (`sf_guard_user_id`) REFERENCES `sf_guard_user` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `zmc_account`
--
ALTER TABLE `zmc_account`
  ADD CONSTRAINT `zmc_account_costcenterid_zmc_costcenter_id` FOREIGN KEY (`costcenterid`) REFERENCES `zmc_costcenter` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `zmc_account_elementid_zmc_element_id` FOREIGN KEY (`elementid`) REFERENCES `zmc_element` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `zmc_account_parentid_zmc_account_id` FOREIGN KEY (`parentid`) REFERENCES `zmc_account` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `zmc_costcenter`
--
ALTER TABLE `zmc_costcenter`
  ADD CONSTRAINT `zmc_costcenter_parentid_zmc_costcenter_id` FOREIGN KEY (`parentid`) REFERENCES `zmc_costcenter` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `zmc_costcenterelementrelation`
--
ALTER TABLE `zmc_costcenterelementrelation`
  ADD CONSTRAINT `zmc_costcenterelementrelation_costcenter_id_zmc_costcenter_id` FOREIGN KEY (`costcenter_id`) REFERENCES `zmc_costcenter` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `zmc_costcenterelementrelation_element_id_zmc_element_id` FOREIGN KEY (`element_id`) REFERENCES `zmc_element` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `zmc_element`
--
ALTER TABLE `zmc_element`
  ADD CONSTRAINT `zmc_element_umid_zmc_um_id` FOREIGN KEY (`umid`) REFERENCES `zmc_um` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `zmc_elementelementrelation`
--
ALTER TABLE `zmc_elementelementrelation`
  ADD CONSTRAINT `zmc_elementelementrelation_from_id_zmc_element_id` FOREIGN KEY (`from_id`) REFERENCES `zmc_element` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `zmc_elementelementrelation_to_id_zmc_element_id` FOREIGN KEY (`to_id`) REFERENCES `zmc_element` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `zmc_transaction`
--
ALTER TABLE `zmc_transaction`
  ADD CONSTRAINT `zmc_transaction_accountid_zmc_account_id` FOREIGN KEY (`accountid`) REFERENCES `zmc_account` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `zmc_transaction_comprobantid_zmc_comprobant_id` FOREIGN KEY (`comprobantid`) REFERENCES `zmc_comprobant` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `zmc_transaction_currencyid_zmc_currency_id` FOREIGN KEY (`currencyid`) REFERENCES `zmc_currency` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `zmc_transaction_umid_zmc_um_id` FOREIGN KEY (`umid`) REFERENCES `zmc_um` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `zmc_umumrelation`
--
ALTER TABLE `zmc_umumrelation`
  ADD CONSTRAINT `zmc_umumrelation_from_id_zmc_um_id` FOREIGN KEY (`from_id`) REFERENCES `zmc_um` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `zmc_umumrelation_to_id_zmc_um_id` FOREIGN KEY (`to_id`) REFERENCES `zmc_um` (`id`) ON DELETE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

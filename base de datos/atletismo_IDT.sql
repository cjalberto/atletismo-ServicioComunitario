-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 29-03-2018 a las 18:42:28
-- Versión del servidor: 10.1.31-MariaDB
-- Versión de PHP: 7.2.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `atletismo_IDT`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `atleta`
--

CREATE TABLE `atleta` (
  `id` int(11) NOT NULL,
  `primer_nombre` varchar(30) NOT NULL,
  `segundo_nombre` varchar(30) NOT NULL,
  `primer_apellido` varchar(30) NOT NULL,
  `segundo_apellido` varchar(30) NOT NULL,
  `cedula` int(11) NOT NULL,
  `fecha_nacimiento` date NOT NULL,
  `id_club` int(11) NOT NULL,
  `id_categoria` int(11) NOT NULL,
  `sexo` varchar(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `atleta`
--

INSERT INTO `atleta` (`id`, `primer_nombre`, `segundo_nombre`, `primer_apellido`, `segundo_apellido`, `cedula`, `fecha_nacimiento`, `id_club`, `id_categoria`, `sexo`) VALUES
(1, 'rbnfgn', 'fsfg', 'gsga', 'gdsg', 21312, '2018-03-14', 1, 1, 'M'),
(2, 'geg', 'qwetgfsdg', 'gbdsgfd', 'gdsag', 3245, '2018-03-21', 2, 2, 'F'),
(3, 'faweas', 'sfad', 'ghhdgh', 'dfasg', 35432, '2018-03-01', 3, 3, 'F'),
(4, 'gerh', '5yuhjfn', 'nfncvzdfb', 'asgasg', 6362, '2018-03-13', 4, 4, 'M'),
(5, 'hdsh', '', 'gdsfg', '', 5345, '2018-03-01', 1, 2, 'F');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE `categoria` (
  `id` int(11) NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `descripcion` text NOT NULL,
  `sexo` varchar(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `categoria`
--

INSERT INTO `categoria` (`id`, `nombre`, `descripcion`, `sexo`) VALUES
(1, 'reqwer', 'sdafgsa', 'F'),
(2, 'fwqfqw', 'fwqf', 'F'),
(3, 'fwf', 'bvcvbbvd', 'M'),
(4, 'hghjyj', 'liul', 'M'),
(5, 'liutlr', 'erqwrtgw', 'M');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `club`
--

CREATE TABLE `club` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `descripcion` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `club`
--

INSERT INTO `club` (`id`, `nombre`, `descripcion`) VALUES
(1, 'sfa', 'fsfasf'),
(2, 'fsdaf', 'qerwq'),
(3, 'fw', 'rwqr'),
(4, 'trtg', 'rwq');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `competencia`
--

CREATE TABLE `competencia` (
  `id` int(11) NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `fecha` date NOT NULL,
  `hora` time NOT NULL,
  `lugar` varchar(255) NOT NULL,
  `finalizado` tinyint(1) NOT NULL DEFAULT '0',
  `id_categoria` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `competencia`
--

INSERT INTO `competencia` (`id`, `nombre`, `fecha`, `hora`, `lugar`, `finalizado`, `id_categoria`) VALUES
(1, 'fsgg', '2018-03-15', '03:10:00', 'twtgsgas', 1, 1),
(2, '344365', '2018-03-16', '12:15:00', 'fwgfewg', 1, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `competencia_atleta`
--

CREATE TABLE `competencia_atleta` (
  `id` int(11) NOT NULL,
  `id_atleta` int(11) NOT NULL,
  `id_competencia` int(11) NOT NULL,
  `tiempo` double NOT NULL,
  `numero_atleta` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `competencia_atleta`
--

INSERT INTO `competencia_atleta` (`id`, `id_atleta`, `id_competencia`, `tiempo`, `numero_atleta`) VALUES
(1, 1, 1, 300, 20),
(2, 1, 2, 140, 40),
(3, 2, 1, 204, 54),
(4, 2, 2, 247, 82),
(5, 3, 1, 52742, 2872),
(6, 3, 2, 2572, 277),
(7, 4, 1, 2727, 222),
(8, 4, 2, 257, 788),
(9, 5, 1, 2275.35, 288888),
(10, 5, 2, 9898.1, 522);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `atleta`
--
ALTER TABLE `atleta`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `cedula_unique` (`cedula`),
  ADD KEY `foreing_id_club` (`id_club`),
  ADD KEY `foreing_id_categoria` (`id_categoria`);

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_nombre` (`nombre`);

--
-- Indices de la tabla `club`
--
ALTER TABLE `club`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uique_nombre` (`nombre`);

--
-- Indices de la tabla `competencia`
--
ALTER TABLE `competencia`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_categoria` (`id_categoria`);

--
-- Indices de la tabla `competencia_atleta`
--
ALTER TABLE `competencia_atleta`
  ADD PRIMARY KEY (`id`),
  ADD KEY `foreing_id_atleta` (`id_atleta`),
  ADD KEY `foreing_id_competencia` (`id_competencia`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `atleta`
--
ALTER TABLE `atleta`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `categoria`
--
ALTER TABLE `categoria`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `club`
--
ALTER TABLE `club`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `competencia`
--
ALTER TABLE `competencia`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `competencia_atleta`
--
ALTER TABLE `competencia_atleta`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `atleta`
--
ALTER TABLE `atleta`
  ADD CONSTRAINT `foreing_id_categoria` FOREIGN KEY (`id_categoria`) REFERENCES `categoria` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `foreing_id_club` FOREIGN KEY (`id_club`) REFERENCES `club` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `competencia`
--
ALTER TABLE `competencia`
  ADD CONSTRAINT `competencia_ibfk_1` FOREIGN KEY (`id_categoria`) REFERENCES `categoria` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `competencia_atleta`
--
ALTER TABLE `competencia_atleta`
  ADD CONSTRAINT `foreing_id_atleta` FOREIGN KEY (`id_atleta`) REFERENCES `atleta` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `foreing_id_competencia` FOREIGN KEY (`id_competencia`) REFERENCES `competencia` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 02-04-2018 a las 00:12:42
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
  `sexo` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `atleta`
--

INSERT INTO `atleta` (`id`, `primer_nombre`, `segundo_nombre`, `primer_apellido`, `segundo_apellido`, `cedula`, `fecha_nacimiento`, `id_club`, `sexo`) VALUES
(1, 'afsho', 'ohafoihfda', 'ohfaoishf', 'oihfaoihfle', 156541, '1996-03-14', 1, 'Femenino'),
(2, 'asfonjhoi', 'ohfaoishf', 'ohlfsahflh', 'hlashfoia', 4684, '1980-11-21', 2, 'Femenino'),
(3, 'fwqhpi', 'nlksahnviosnnwoh23r', 'ncoano', 'afas', 733465, '1975-12-02', 3, 'Masculino'),
(4, 'ofdshoi', 'pfpahsfgp', 'phfasihfp', 'phfpiasn', 54123, '1985-10-20', 4, 'Masculino'),
(5, 'asojpi', 'cashjnp', 'opvnpio', 'mcijqaip', 123465, '1977-03-01', 1, 'Femenino');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE `categoria` (
  `id` int(11) NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `descripcion` text NOT NULL,
  `sexo` varchar(10) NOT NULL,
  `edad_min` int(11) NOT NULL,
  `edad_max` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `categoria`
--

INSERT INTO `categoria` (`id`, `nombre`, `descripcion`, `sexo`, `edad_min`, `edad_max`) VALUES
(1, 'afs', 'sadf', 'Femenino', 25, 30),
(2, 'afs', 'fsda', 'Masculino', 25, 30),
(3, 'aaa', 'aaa', 'Femenino', 31, 36),
(4, 'aaa', 'aaa', 'Masculino', 31, 36),
(5, 'bbb', 'bbb', 'Femenino', 37, 42),
(6, 'bbb', 'bbb', 'Masculino', 37, 42);

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
(1, 'wqerwq', 'safas'),
(2, 'jtyjr', 'jtrrt'),
(3, 'asfohjo', 'ihaspi'),
(4, 'gvxik', 'nasllfg'),
(5, 'rwqer', 'rewqrqw');

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
  `finalizado` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `competencia`
--

INSERT INTO `competencia` (`id`, `nombre`, `fecha`, `hora`, `lugar`, `finalizado`) VALUES
(1, 'dfas', '2018-05-03', '01:01:00', 'rrwqe', 0),
(2, 'dfas', '2018-05-03', '01:01:00', 'rrwqe', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `competencia_atleta`
--

CREATE TABLE `competencia_atleta` (
  `id` int(11) NOT NULL,
  `id_atleta` int(11) NOT NULL,
  `id_competencia` int(11) NOT NULL,
  `tiempo` double NOT NULL,
  `numero_atleta` int(11) NOT NULL,
  `id_categoria` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `atleta`
--
ALTER TABLE `atleta`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `cedula_unique` (`cedula`),
  ADD KEY `foreing_id_club` (`id_club`);

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`id`);

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
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `competencia_atleta`
--
ALTER TABLE `competencia_atleta`
  ADD PRIMARY KEY (`id`),
  ADD KEY `foreing_id_atleta` (`id_atleta`),
  ADD KEY `foreing_id_competencia` (`id_competencia`),
  ADD KEY `foreing_id_categoria` (`id_categoria`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `club`
--
ALTER TABLE `club`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `competencia`
--
ALTER TABLE `competencia`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `competencia_atleta`
--
ALTER TABLE `competencia_atleta`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `atleta`
--
ALTER TABLE `atleta`
  ADD CONSTRAINT `foreing_id_club` FOREIGN KEY (`id_club`) REFERENCES `club` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `competencia_atleta`
--
ALTER TABLE `competencia_atleta`
  ADD CONSTRAINT `foreing_id_atleta` FOREIGN KEY (`id_atleta`) REFERENCES `atleta` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `foreing_id_categoria` FOREIGN KEY (`id_categoria`) REFERENCES `categoria` (`id`),
  ADD CONSTRAINT `foreing_id_competencia` FOREIGN KEY (`id_competencia`) REFERENCES `competencia` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

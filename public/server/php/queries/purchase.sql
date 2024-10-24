-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 17-02-2024 a las 16:39:42
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `beestock`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `purchase`
--

CREATE TABLE `purchase` (
  `id` int(11) NOT NULL,
  `code` varchar(20) NOT NULL,
  `provider_id` int(11) NOT NULL,
  `provider_email` varchar(100) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `check_mail` varchar(5) NOT NULL,
  `payment` varchar(100) NOT NULL,
  `paid` varchar(10) NOT NULL DEFAULT '''no''',
  `purchase_date` date NOT NULL,
  `due_date` date NOT NULL,
  `bill_date` date NOT NULL,
  `creation_date` date NOT NULL,
  `delivered_date` date NOT NULL,
  `shipping` varchar(100) NOT NULL,
  `investment` varchar(100) NOT NULL,
  `revenue` float NOT NULL,
  `status` varchar(100) NOT NULL,
  `earning` decimal(10,2) NOT NULL,
  `min_amount` decimal(10,2) NOT NULL,
  `general_total_price` float(10,2) NOT NULL,
  `general_total_selling_price` float(10,2) NOT NULL,
  `bill_to_address` varchar(300) NOT NULL,
  `bill_to_apt` varchar(20) NOT NULL,
  `bill_to_city` varchar(100) NOT NULL,
  `bill_to_state` varchar(100) NOT NULL,
  `bill_to_zip` varchar(10) NOT NULL,
  `ship_to_address` varchar(200) NOT NULL,
  `ship_to_apt` varchar(20) NOT NULL,
  `ship_to_city` varchar(100) NOT NULL,
  `ship_to_state` varchar(100) NOT NULL,
  `ship_to_zip` varchar(10) NOT NULL,
  `fill_bill_date` varchar(5) NOT NULL,
  `notes` varchar(1000) NOT NULL,
  `reference_number` varchar(50) NOT NULL,
  `avatar_provider` varchar(1000) NOT NULL,
  `deleted` varchar(100) NOT NULL DEFAULT 'no',
  `date_registered` datetime NOT NULL DEFAULT current_timestamp(),
  `date_edited` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `purchase`
--

INSERT INTO `purchase` (`id`, `code`, `provider_id`, `provider_email`, `price`, `check_mail`, `payment`, `paid`, `purchase_date`, `due_date`, `bill_date`, `creation_date`, `delivered_date`, `shipping`, `investment`, `revenue`, `status`, `earning`, `min_amount`, `general_total_price`, `general_total_selling_price`, `bill_to_address`, `bill_to_apt`, `bill_to_city`, `bill_to_state`, `bill_to_zip`, `ship_to_address`, `ship_to_apt`, `ship_to_city`, `ship_to_state`, `ship_to_zip`, `fill_bill_date`, `notes`, `reference_number`, `avatar_provider`, `deleted`, `date_registered`, `date_edited`) VALUES
(1, 'PO001', 6, 'p6@mail.com', 0.00, 'true', '', '\'no\'', '2024-02-10', '2024-02-26', '2024-02-16', '2024-02-10', '0000-00-00', '', '', 0, '', 0.00, 0.00, 130.00, 25.00, '', '', '', '', '', '', '', '', '', '', 'true', '', '', 'server/storage/beestock/entities/provider/6/avatar/lowlowlowCompression/avatar.jpg', '0', '2024-02-10 13:32:50', '2024-02-17 11:36:26'),
(2, 'PO002', 6, 'p6@mail.com', 0.00, '0', '', '\'no\'', '2024-02-10', '0000-00-00', '0000-00-00', '2024-02-10', '0000-00-00', '', '', 0, '', 0.00, 0.00, 0.00, 0.00, '', '', '', '', '', '', '', '', '', '', '', '', '', 'server/storage/beestock/entities/provider/6/avatar/lowlowlowCompression/avatar.jpg', '1', '2024-02-10 13:39:37', '2024-02-12 11:14:16'),
(3, 'PO003', 6, 'p6@mail.com', 0.00, '0', '', '\'no\'', '2024-02-12', '0000-00-00', '0000-00-00', '2024-02-12', '0000-00-00', '', '', 0, '', 0.00, 0.00, 117.00, 0.00, '', '', '', '', '', '', '', '', '', '', '', '', '', 'server/storage/beestock/entities/provider/6/avatar/lowlowlowCompression/avatar.jpg', '0', '2024-02-12 11:14:28', '2024-02-15 20:31:29');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `purchase`
--
ALTER TABLE `purchase`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `purchase`
--
ALTER TABLE `purchase`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

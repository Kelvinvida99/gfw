-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 27, 2021 at 01:50 AM
-- Server version: 10.4.20-MariaDB
-- PHP Version: 7.4.22

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gosivecontrol`
--

-- --------------------------------------------------------

--
-- Table structure for table `companies_users`
--

CREATE TABLE `companies_users` (
  `id` int(11) NOT NULL,
  `username` varchar(40) NOT NULL,
  `password` varchar(200) NOT NULL,
  `user_id` int(11) NOT NULL,
  `data_base` varchar(80) NOT NULL,
  `dbUsername` varchar(20) NOT NULL,
  `dbPassword` varchar(50) NOT NULL,
  `active` varchar(5) NOT NULL,
  `date_registered` timestamp NOT NULL DEFAULT current_timestamp(),
  `created_by` varchar(50) NOT NULL,
  `deleted` varchar(50) NOT NULL DEFAULT 'no'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `companies_users`
--

INSERT INTO `companies_users` (`id`, `username`, `password`, `user_id`, `data_base`, `dbUsername`, `dbPassword`, `active`, `date_registered`, `created_by`, `deleted`) VALUES
(1, 'gosive', 'AA5DCB841FEB1380234B001B9328C442', 36, 'gokudb', 'gokuUser', 'G0ku@P0w3r', 'true', '2021-05-28 20:08:08', '', 'no'),
(2, 'tropifresh', 'pG548dk3btKqLDYC19k8BPR8', 0, 'jmiguel1_tropifresh', '', '', '', '2017-03-16 02:57:07', '', 'no'),
(4, 'yeison', 'AA5DCB841FEB1380234B001B9328C442', 60, 'gokudb', 'gokuUser', 'G0ku@P0w3r', 'true', '2021-05-28 20:08:08', '', 'no'),
(5, 'miguel', 'AA5DCB841FEB1380234B001B9328C442', 61, 'gokudb', 'gokuUser', 'G0ku@P0w3r', 'true', '2021-05-28 20:08:08', '', 'no');

-- --------------------------------------------------------

--
-- Table structure for table `users_failed_logs`
--

CREATE TABLE `users_failed_logs` (
  `id` int(11) NOT NULL,
  `username` varchar(20) NOT NULL,
  `created_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `ip` varchar(100) NOT NULL,
  `time` bigint(20) NOT NULL,
  `result` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users_failed_logs`
--

INSERT INTO `users_failed_logs` (`id`, `username`, `created_date`, `ip`, `time`, `result`) VALUES
(1143, 'gosive2', '2021-05-28 20:42:50', '127.0.0.1', 1622234570, 'failed'),
(1144, 'gosive2', '2021-05-28 20:42:56', '127.0.0.1', 1622234576, 'failed'),
(1145, 'gosive2', '2021-05-28 20:42:58', '127.0.0.1', 1622234578, 'failed'),
(1146, 'gosive2', '2021-05-28 20:42:59', '127.0.0.1', 1622234579, 'failed'),
(1147, 'gosive2', '2021-05-28 20:42:59', '127.0.0.1', 1622234579, 'failed'),
(1148, 'gosive2', '2021-05-28 20:43:00', '127.0.0.1', 1622234580, 'failed'),
(1149, 'gosive2', '2021-05-28 20:43:12', '127.0.0.1', 1622234592, 'failed'),
(1150, '', '2021-05-28 20:43:21', '127.0.0.1', 1622234601, 'failed'),
(1151, '', '2021-05-28 20:43:26', '127.0.0.1', 1622234606, 'failed'),
(1152, '', '2021-05-28 20:43:27', '127.0.0.1', 1622234607, 'failed'),
(1153, '', '2021-05-28 20:47:50', '127.0.0.1', 1622234870, 'failed'),
(1154, '', '2021-05-28 20:48:49', '127.0.0.1', 1622234929, 'failed'),
(1155, 'gosive2', '2021-05-28 20:55:05', '127.0.0.1', 1622235305, 'failed'),
(1156, 'gosive2', '2021-05-28 22:32:43', '127.0.0.1', 1622241163, 'failed'),
(1157, 'gosive2', '2021-05-28 22:32:49', '127.0.0.1', 1622241169, 'failed'),
(1158, 'gosive2', '2021-05-28 22:32:50', '127.0.0.1', 1622241170, 'failed'),
(1159, 'gosive2', '2021-05-28 22:32:59', '127.0.0.1', 1622241179, 'failed'),
(1160, 'vegeta', '2021-09-20 12:06:08', '::1', 1632139568, 'authFailed'),
(1161, 'vegeta', '2021-09-20 12:06:15', '::1', 1632139575, 'authFailed'),
(1162, 'gosivex', '2021-09-21 12:11:13', '::1', 1632226273, 'authFailed'),
(1163, 'yeison', '2021-09-21 23:51:43', '::1', 1632268303, 'authFailed'),
(1164, 'gosive', '2021-09-24 10:51:39', '127.0.0.1', 1632480699, 'authFailed'),
(1165, 'miguelo', '2021-09-24 11:47:02', '127.0.0.1', 1632484022, 'authFailed');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `companies_users`
--
ALTER TABLE `companies_users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `user_id` (`user_id`);

--
-- Indexes for table `users_failed_logs`
--
ALTER TABLE `users_failed_logs`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `companies_users`
--
ALTER TABLE `companies_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `users_failed_logs`
--
ALTER TABLE `users_failed_logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1166;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

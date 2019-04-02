-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Apr 02, 2019 at 11:16 PM
-- Server version: 5.7.25-0ubuntu0.18.04.2
-- PHP Version: 7.2.15-0ubuntu0.18.04.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `finance_control`
--

-- --------------------------------------------------------

--
-- Table structure for table `amount_tab`
--

CREATE TABLE `amount_tab` (
  `amountid` int(11) NOT NULL,
  `userid` int(11) NOT NULL,
  `spendingid` int(11) NOT NULL,
  `amount` int(11) NOT NULL,
  `status` tinyint(4) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `amount_tab`
--

INSERT INTO `amount_tab` (`amountid`, `userid`, `spendingid`, `amount`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 1000, 1, '2019-03-26 16:18:46', '2019-03-27 21:36:21'),
(2, 1, 1, 9999, 1, '2019-03-28 13:49:49', '2019-03-28 13:49:49');

-- --------------------------------------------------------

--
-- Table structure for table `spending_tab`
--

CREATE TABLE `spending_tab` (
  `spendingid` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` longtext NOT NULL,
  `status` tinyint(4) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `spending_tab`
--

INSERT INTO `spending_tab` (`spendingid`, `name`, `description`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Makan Sehari', 'Uang yang dikeluarkan untuk makan sehari - hari', 1, '2019-03-29 20:17:57', '2019-03-29 20:38:30');

-- --------------------------------------------------------

--
-- Table structure for table `users_tab`
--

CREATE TABLE `users_tab` (
  `userid` int(11) NOT NULL,
  `email` varchar(50) NOT NULL,
  `fullname` varchar(255) NOT NULL,
  `password` text NOT NULL,
  `salt` text NOT NULL,
  `status` tinyint(4) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users_tab`
--

INSERT INTO `users_tab` (`userid`, `email`, `fullname`, `password`, `salt`, `status`, `created_at`, `updated_at`) VALUES
(1, 'tampnbgt@gmail.com', 'Tampan Sekali', '123456', '123456', 1, '2019-03-30 00:00:00', '2019-03-30 00:00:00'),
(2, 'arham.abiyan@gmail.com', 'Arham Awal Abiyan', '783b3e53d33fed8a559dc98e181994b107a9aa81f664e288f406ad7c75eeab4eb46b5a14d64a382158a21d029e22f83997b76efdfa76cc0ce60fe6a6ae7ada0b', '89ebbb25ebf04a9759', 1, '2019-04-02 16:30:41', '2019-04-02 16:30:41');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `amount_tab`
--
ALTER TABLE `amount_tab`
  ADD PRIMARY KEY (`amountid`),
  ADD UNIQUE KEY `amountid` (`amountid`);

--
-- Indexes for table `spending_tab`
--
ALTER TABLE `spending_tab`
  ADD PRIMARY KEY (`spendingid`);

--
-- Indexes for table `users_tab`
--
ALTER TABLE `users_tab`
  ADD PRIMARY KEY (`userid`),
  ADD UNIQUE KEY `userid` (`userid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `amount_tab`
--
ALTER TABLE `amount_tab`
  MODIFY `amountid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `spending_tab`
--
ALTER TABLE `spending_tab`
  MODIFY `spendingid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `users_tab`
--
ALTER TABLE `users_tab`
  MODIFY `userid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

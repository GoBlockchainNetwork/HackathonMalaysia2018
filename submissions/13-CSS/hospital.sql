-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Dec 16, 2018 at 07:05 AM
-- Server version: 5.7.23
-- PHP Version: 5.6.38

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hospital`
--

-- --------------------------------------------------------

--
-- Table structure for table `patient`
--

DROP TABLE IF EXISTS `patient`;
CREATE TABLE IF NOT EXISTS `patient` (
  `icNumber` varchar(14) NOT NULL,
  `name` varchar(244) NOT NULL,
  `correspondingAddress` varchar(244) NOT NULL,
  `phone` varchar(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `public_address` varchar(244) NOT NULL,
  PRIMARY KEY (`icNumber`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `patient`
--

INSERT INTO `patient` (`icNumber`, `name`, `correspondingAddress`, `phone`, `email`, `public_address`) VALUES
('2312', 'AKAU', '1232', '213', '123', '123');

-- --------------------------------------------------------

--
-- Table structure for table `transaction_record`
--

DROP TABLE IF EXISTS `transaction_record`;
CREATE TABLE IF NOT EXISTS `transaction_record` (
  `id` int(244) NOT NULL AUTO_INCREMENT,
  `member_public_address` varchar(255) NOT NULL,
  `bill_number` varchar(244) NOT NULL,
  `date` varchar(244) NOT NULL,
  `status` varchar(244) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `transaction_record`
--

INSERT INTO `transaction_record` (`id`, `member_public_address`, `bill_number`, `date`, `status`) VALUES
(1, '123', '222', '12/12/2012', 'Pending');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

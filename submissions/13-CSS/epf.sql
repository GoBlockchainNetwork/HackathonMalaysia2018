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
-- Database: `epf`
--

-- --------------------------------------------------------

--
-- Table structure for table `hospital`
--

DROP TABLE IF EXISTS `hospital`;
CREATE TABLE IF NOT EXISTS `hospital` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `public_address` varchar(244) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `hospital`
--

INSERT INTO `hospital` (`id`, `public_address`) VALUES
(1, '1234');

-- --------------------------------------------------------

--
-- Table structure for table `member`
--

DROP TABLE IF EXISTS `member`;
CREATE TABLE IF NOT EXISTS `member` (
  `ic_number` varchar(244) NOT NULL,
  `public_address` varchar(100) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `address` varchar(1000) NOT NULL,
  PRIMARY KEY (`ic_number`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `member`
--

INSERT INTO `member` (`ic_number`, `public_address`, `name`, `email`, `phone`, `address`) VALUES
('920312-02-1582', '4567', 'Samuel', 'sameul@gmail.com', '012-3456789', 'NO12, Jalan 1 , Taman 2, 43000 Ampang'),
('987652-02-1582', '8901', 'chin chee hoong', 'cheehoong@gmail.com', '098-7654321', 'NO1999, Jalan 1 , Taman 2, 43000 Ampang'),
('222222-02-1582', '2222', 'siew kar soon', 'karsoon@gmail.com', '098-2222222', 'NO222, Jalan 22 , Taman 2, 2222 Ampang');

-- --------------------------------------------------------

--
-- Table structure for table `transaction`
--

DROP TABLE IF EXISTS `transaction`;
CREATE TABLE IF NOT EXISTS `transaction` (
  `id` int(244) NOT NULL AUTO_INCREMENT,
  `date` varchar(10) NOT NULL,
  `hospital_public_address` varchar(244) NOT NULL,
  `member_public_address` varchar(244) NOT NULL,
  `bill_number` varchar(11) NOT NULL,
  `status` varchar(244) NOT NULL DEFAULT 'Pending',
  PRIMARY KEY (`id`),
  UNIQUE KEY `member_public_address` (`member_public_address`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `transaction`
--

INSERT INTO `transaction` (`id`, `date`, `hospital_public_address`, `member_public_address`, `bill_number`, `status`) VALUES
(2, '15/12/2018', '1234', '4567', '7890', 'approved'),
(3, '16/12/2018', '1234', '8901', '1234', 'rejected'),
(4, '14/12/2018', '1234', '2222', '2341', 'Pending');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

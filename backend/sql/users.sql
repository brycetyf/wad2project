-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Oct 19, 2020 at 10:43 AM
-- Server version: 5.7.23
-- PHP Version: 7.2.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `wad2project`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `username` varchar(100) NOT NULL,
  `name` varchar(255) NOT NULL,
  `url` varchar(300) NOT NULL,
  `age` int(4) NOT NULL,
  `description` varchar(999) NOT NULL,
  `ghostRating` int(4) NOT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`username`, `name`, `url`, `age`, `description`, `ghostRating`) VALUES
('bill123', 'Bill Gates', 'https://www.thegrandreport.com/wp-content/uploads/2016/02/image-558.jpeg', 61, 'Founder of MS', 0),
('elon123', 'Elon Musk', 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.biography.com%2Fbusiness-figure%2Felon-musk&psig=AOvVaw0A19CiLxVSb-9UbUaXxvwr&ust=1603536356224000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCLjM1snEyuwCFQAAAAAdAAAAABAD', 40, 'Founder of Paypal', 0),
('steve123', 'Steve Jobs', 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.biography.com%2Fbusiness-figure%2Fsteve-jobs&psig=AOvVaw2UhhpWOi0imdWdmVeRlcIm&ust=1603536335876000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCOC7kcDEyuwCFQAAAAAdAAAAABAD', 56, 'Apple Founder', 1);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

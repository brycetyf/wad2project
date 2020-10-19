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
('elon123', 'Elon Musk', 'https://i0.wp.com/www.usmagazine.com/wp-content/uploads/2020/07/Mark-Zuckerberg-Spooks-the-Internet-With-Too-Much-Sunscreen-on-His-Face-in-Hawaii-01.jpg?crop=557px%2C82px%2C896px%2C471px&resize=1200%2C630&ssl=1&quality=86&strip=all', 40, 'Founder of Paypal', 0),
('steve123', 'Steve Jobs', 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.macrumors.com%2F2011%2F10%2F05%2Fsteve-jobs-has-passed-away%2F&psig=AOvVaw2jflLDtSDkvbjBsBj-ZKxu&ust=1603182437908000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCOD12o-ewOwCFQAAAAAdAAAAABAI', 56, 'Apple Founder', 1);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

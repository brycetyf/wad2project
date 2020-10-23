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
  `unique_id` varchar(1000) NOT NULL,
  `username` varchar(100) NOT NULL,
  `name` varchar(255) NOT NULL,
  `url` varchar(300) NOT NULL,
  `age` int(4) NOT NULL,
  `description` varchar(999) NOT NULL,
  `ghostRating` int(4) NOT NULL,
  `gender` varchar(100) NOT NULL,
  PRIMARY KEY (`unique_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`unique_id`,`username`, `name`, `url`, `age`, `description`, `ghostRating`,`gender`) VALUES
('1','Aisah', 'Aisah', 'https://images.unsplash.com/photo-1527047614336-194da60dacd9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60', 23, 'cold jokes only', 0,'F'),
('2','Tommy', 'Tommy Tan', 'https://images.unsplash.com/photo-1514883916490-bfcd1bc4129b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60', 26, 'i like carousells', 0,'M'),
('3','Jon', 'Jon Lee', 'https://images.unsplash.com/photo-1527047024390-ee2da5a0943b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60', 24, 'here for a good time, not a long time', 1,'M'),
('4','Natalie','Natalie Siow','https://images.unsplash.com/photo-1500055457707-845bf2958845?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',22,'i like sweet things',0,'F'),
('5','Joyce','Joyce Tan','https://images.unsplash.com/photo-1567250671670-05e36d8ca38e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',25,'travelling is bae',1,'F'),
('6','Lee Min','Ang Lee Min','https://images.unsplash.com/photo-1527431378753-bd2f0dedc06e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',23,'antique things i love',0,'F'),
('7','Sean','Sean Seow','https://images.unsplash.com/photo-1582255334378-4e9bc9505664?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',22,'b&w times',2,'M'),
('8','Tammy','Tammy Ong','https://images.unsplash.com/photo-1514883718278-c239aeaf86df?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',24,'dont look back in anger',2,'F')
;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Nov 03, 2020 at 03:15 PM
-- Server version: 5.7.26
-- PHP Version: 7.3.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+08:00";

--
-- Database: `wad2project`
--
CREATE DATABASE IF NOT EXISTS `wad2project` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `wad2project`;

-- --------------------------------------------------------

--
-- Table structure for table `matched_users`
--

DROP TABLE IF EXISTS `matched_users`;
CREATE TABLE `matched_users` (
  `unique_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `message` varchar(200),
  `lastonline` varchar(200) NOT NULL,
  `url` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `matched_users`
--

INSERT INTO `matched_users` (`unique_id`, `name`, `message`, `lastonline`, `url`) VALUES
(4, 'Natalie', 'Hey Bryan!', '1 minute ago', 'https://images.unsplash.com/photo-1500055457707-845bf2958845?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'),
(5, 'Joyce', 'Hola. Tell me a cold joke.', '24 minutes ago', 'https://images.unsplash.com/photo-1567250671670-05e36d8ca38e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60');

--
-- Table structure for table `user_bookings`
--
DROP TABLE IF EXISTS `user_bookings`;
CREATE TABLE `user_bookings` (
  `res_id` int(200) NOT NULL,
  `res_name` varchar(300) NOT NULL,
  `lon` varchar(255) NOT NULL,
  `lat` varchar(200) NOT NULL,
  `res_url` varchar(300) NOT NULL,
  `contact` varchar(12) NOT NULL,
  `booking_date` varchar(200) NOT NULL,
  `booking_time` varchar(200) NOT NULL,
  `booking_partner` varchar(300) NOT NULL,
  `booking_partner_url` varchar(300) NOT NULL,
  `review_left` bit(1)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_bookings`
--

-- INSERT INTO `user_bookings` (`res_name`, `lon`, `lat`, `res_url`, `contact`,`booking_date`,`booking_partner`) VALUES
-- (5, 'Joyce', 'Hola. Tell me a cold joke.', '24 minutes ago', 'https://images.unsplash.com/photo-1567250671670-05e36d8ca38e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60');


-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
CREATE TABLE `messages` (
  `msgid` int(255) NOT NULL,
  `match_name` varchar(255) NOT NULL,
  `sent_by_user` bit(1) NOT NULL,
  `match_date` date NOT NULL,
  `message` varchar(999) NOT NULL,
  `url` varchar(300) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`msgid`, `match_name`, `sent_by_user`, `match_date`, `message`, `url`) VALUES
(1, 'Natalie', b'0', '2020-10-10', 'Hey Bryan!', 'https://images.unsplash.com/photo-1500055457707-845bf2958845?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'),
(2, 'Joyce', b'0', '2020-10-10', 'Hola. Tell me a cold joke', 'https://images.unsplash.com/photo-1567250671670-05e36d8ca38e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `unique_id` varchar(1000) NOT NULL,
  `username` varchar(100) NOT NULL,
  `name` varchar(255) NOT NULL,
  `url` varchar(300) NOT NULL,
  `age` int(4) NOT NULL,
  `description` varchar(999) NOT NULL,
  `gender` varchar(100) NOT NULL,
  `user_indicated_interest` bit(1) NOT NULL,
  `reviewInstances` int(255),
  `userRating` INT(101),
  `ghostRating` INT(255) NOT NULL,
  `userTags` varchar(8000)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`unique_id`, `username`, `name`, `url`, `age`, `description`, `gender`, `user_indicated_interest`,`reviewInstances`,`userRating`,`ghostRating`,`userTags`) VALUES
('1', 'Aisah', 'Aisah', 'https://images.unsplash.com/photo-1527047614336-194da60dacd9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60', 23, 'cold jokes only',  'F', b'0',NULL,100,100,NULL),
('2', 'Prapoth', 'Prapoth Panchuea', 'https://images.unsplash.com/photo-1586785772786-a59de185e06a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80', 26, 'i like carousells', 'F', b'0',NULL,100,100,NULL),
('3', 'Sammy', 'Sammy Lee', 'https://images.unsplash.com/photo-1475823678248-624fc6f85785?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80', 24, 'here for a good time, not a long time',  'F', b'0',NULL,100,100,NULL),
('4', 'Natalie', 'Natalie Siow', 'https://images.unsplash.com/photo-1500055457707-845bf2958845?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60', 22, 'i like sweet things',  'F', b'1',NULL,100,100,NULL),
('5', 'Joyce', 'Joyce Tan', 'https://images.unsplash.com/photo-1567250671670-05e36d8ca38e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60', 25, 'travelling is bae',  'F', b'1',NULL,100,100,NULL),
('6', 'Lee Min', 'Ang Lee Min', 'https://images.unsplash.com/photo-1527431378753-bd2f0dedc06e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60', 23, 'antique things i love',  'F', b'0',NULL,100,100,NULL),
('7', 'Seanna', 'Seanna Seow', 'https://images.unsplash.com/photo-1498551172505-8ee7ad69f235?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80', 22, 'b&w times',  'M', b'0',NULL,100,100,NULL),
('8', 'Tammy', 'Tammy Ong', 'https://images.unsplash.com/photo-1514883718278-c239aeaf86df?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60', 24, 'dont look back in anger',  'F', b'0',NULL,100,100,NULL);


--
-- Table structure for table `reviewComments`
--

DROP TABLE IF EXISTS `reviewComments`;
CREATE TABLE `reviewComments` (
  `comment_id` INT(255) NOT NULL,
  `username` varchar(100) NOT NULL,
  `comments` varchar(8000) NOT NULL,
  `review_left_by` varchar(100) NOT NULL,
  `approved` BIT(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `reviewComments`
--

INSERT INTO `reviewComments` (`comment_id`,`username`,`comments`,`review_left_by`,`approved`) VALUES
(1,'bryce','Such a charming man. Best date ever.','Joyce',b'0'),
(2,'bryce','Bryce was a gentlemen. He helped me to hold my handbag','Natalie',b'0');


--
-- Indexes for dumped tables
--

--
-- Indexes for table `matched_users`
--
ALTER TABLE `matched_users`
  ADD PRIMARY KEY (`unique_id`);

--
-- Indexes for table `user_bookings`
--
ALTER TABLE `user_bookings`
  ADD PRIMARY KEY (`res_id`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`msgid`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`unique_id`);


--
-- Indexes for table `users`
--
ALTER TABLE `reviewComments`
  ADD PRIMARY KEY (`comment_id`);


--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `msgid` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

ALTER TABLE `user_bookings`
  MODIFY `res_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

ALTER TABLE `reviewComments`
  MODIFY `comment_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

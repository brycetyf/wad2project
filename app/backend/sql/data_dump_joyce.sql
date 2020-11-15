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
('1', 'John', 'John Doe', 'https://images.unsplash.com/photo-1587651696669-86b588f28cb4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1250&q=80', 26, 'wanna travel to Japan?', 'M', b'0',NULL,100,100,NULL),
('2', 'Bryce', 'Bryce Tan', 'https://i.ibb.co/ZxvT834/bryce.jpg', 23, 'Just send it',  'M', b'1',NULL,100,100,NULL),
('3', 'Joseph', 'Joseph Ong', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80', 28, 'Always smiling',  'M', b'0',NULL,100,100,NULL),
('4', 'Sung', 'Sung Wang', 'https://images.unsplash.com/photo-1487309078313-fad80c3ec1e5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80', 25, 'Coffe?',  'M', b'0',NULL,100,100,NULL),
('5', 'Johnny', 'Johnny Low', 'https://images.unsplash.com/photo-1526449066878-320ea3ca7a95?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1651&q=80', 25, 'Looking for something higher',  'M', b'0',NULL,100,100,NULL),
('6', 'Tommy', 'Tommy Tan', 'https://images.unsplash.com/photo-1565893305627-9bb238e593ba?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1498&q=80', 23, 'photography is my passion',  'M', b'0',NULL,100,100,NULL);


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
(1,'bryce','Such a charming man. Best date ever.','Joyce',b'0');
-- (2,'bryce','Bryce was a gentlemen. He helped me to hold my handbag','Natalie',b'0');


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

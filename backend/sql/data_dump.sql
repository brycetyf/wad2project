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
  `message` varchar(200) NOT NULL,
  `lastonline` varchar(200) NOT NULL,
  `url` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `matched_users`
--

INSERT INTO `matched_users` (`unique_id`, `name`, `message`, `lastonline`, `url`) VALUES
(4, 'Natalie', 'Hey Bryan!', '1 minute ago', 'https://images.unsplash.com/photo-1500055457707-845bf2958845?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'),
(5, 'Joyce', 'Hola. Tell me a cold joke.', '24 minutes ago', 'https://images.unsplash.com/photo-1567250671670-05e36d8ca38e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60');

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
  `ghostRating` int(4) NOT NULL,
  `gender` varchar(100) NOT NULL,
  `user_indicated_interest` bit(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`unique_id`, `username`, `name`, `url`, `age`, `description`, `ghostRating`, `gender`, `user_indicated_interest`) VALUES
('1', 'Aisah', 'Aisah', 'https://images.unsplash.com/photo-1527047614336-194da60dacd9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60', 23, 'cold jokes only', 0, 'F', b'0'),
('2', 'Prapoth', 'Prapoth Panchuea', 'https://images.unsplash.com/photo-1586785772786-a59de185e06a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80', 26, 'i like carousells', 0, 'M', b'0'),
('3', 'Sammy', 'Sammy Lee', 'https://images.unsplash.com/photo-1475823678248-624fc6f85785?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80', 24, 'here for a good time, not a long time', 1, 'M', b'0'),
('4', 'Natalie', 'Natalie Siow', 'https://images.unsplash.com/photo-1500055457707-845bf2958845?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60', 22, 'i like sweet things', 0, 'F', b'1'),
('5', 'Joyce', 'Joyce Tan', 'https://images.unsplash.com/photo-1567250671670-05e36d8ca38e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60', 25, 'travelling is bae', 1, 'F', b'1'),
('6', 'Lee Min', 'Ang Lee Min', 'https://images.unsplash.com/photo-1527431378753-bd2f0dedc06e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60', 23, 'antique things i love', 0, 'F', b'0'),
('7', 'Seanna', 'Seanna Seow', 'https://images.unsplash.com/photo-1498551172505-8ee7ad69f235?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80', 22, 'b&w times', 2, 'M', b'0'),
('8', 'Tammy', 'Tammy Ong', 'https://images.unsplash.com/photo-1514883718278-c239aeaf86df?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60', 24, 'dont look back in anger', 2, 'F', b'0');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `matched_users`
--
ALTER TABLE `matched_users`
  ADD PRIMARY KEY (`unique_id`);

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
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `msgid` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

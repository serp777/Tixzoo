-- phpMyAdmin SQL Dump
-- version 4.4.7
-- http://www.phpmyadmin.net
--
-- Host: localhost:3306
-- Generation Time: Jul 26, 2015 at 05:36 PM
-- Server version: 5.6.25
-- PHP Version: 5.5.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `tixzoo`
--

-- --------------------------------------------------------

--
-- Table structure for table `accountinfo`
--

CREATE TABLE IF NOT EXISTS `accountinfo` (
  `accountID` int(11) NOT NULL,
  `emailAddress` varchar(50) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `username` varchar(20) DEFAULT NULL,
  `password` varchar(20) DEFAULT NULL,
  `creation_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `facebook_ID` int(11) DEFAULT NULL,
  `first_name` varchar(40) DEFAULT NULL,
  `last_name` varchar(40) DEFAULT NULL,
  `rating` decimal(1,1) DEFAULT NULL,
  `credit` int(10) NOT NULL DEFAULT '0'
) ENGINE=InnoDB AUTO_INCREMENT=1016 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `accountinfo`
--

INSERT INTO `accountinfo` (`accountID`, `emailAddress`, `phone`, `username`, `password`, `creation_time`, `facebook_ID`, `first_name`, `last_name`, `rating`, `credit`) VALUES
(1001, 'example@example.com', NULL, 'test', 'password', '2015-07-20 01:20:57', 0, '', '', '0.0', 1000),
(1000, '1000@gmail.com', '1000', 'root', 'computer123', '2015-07-20 00:28:09', 1000, 'Nick', 'Liu', '0.9', 0),
(1006, NULL, NULL, 'test2', 'haha', '2015-07-21 01:39:12', NULL, '', '', '0.0', 0),
(1008, 'example@example.com', NULL, 'test22', 'hahaha', '2015-07-21 01:40:46', NULL, NULL, NULL, NULL, 1000),
(1009, 'example@example.com', NULL, 'yoo', 'password', '2015-07-21 05:37:02', NULL, NULL, NULL, NULL, 1000),
(1010, 'ok@sss', NULL, 'nick', 'password', '2015-07-24 01:48:27', NULL, NULL, NULL, NULL, 1000),
(1011, 'ssssssss', NULL, 'enoch', 'okokok', '2015-07-24 03:19:54', NULL, NULL, NULL, NULL, 1000),
(1012, 'aaa', NULL, 'num3', 'k', '2015-07-24 03:21:58', NULL, NULL, NULL, NULL, 1000),
(1013, 'example@example.com', NULL, 'nick123', 'pass', '2015-07-25 01:47:54', NULL, NULL, NULL, NULL, 1000),
(1014, 'aaa', NULL, 'hellohellook', 'aaa', '2015-07-25 05:21:27', NULL, NULL, NULL, NULL, 1000),
(1015, 'nick', NULL, 'new user 123', 'wait', '2015-07-27 00:34:02', NULL, NULL, NULL, NULL, 1000);

-- --------------------------------------------------------

--
-- Table structure for table `friends`
--

CREATE TABLE IF NOT EXISTS `friends` (
  `user` int(11) NOT NULL,
  `friend` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tickets`
--

CREATE TABLE IF NOT EXISTS `tickets` (
  `ticketID` int(11) NOT NULL,
  `name` varchar(40) DEFAULT NULL,
  `sellerID` int(11) DEFAULT NULL,
  `location` varchar(400) DEFAULT NULL,
  `date` varchar(40) DEFAULT NULL,
  `price` decimal(8,2) DEFAULT NULL,
  `type` varchar(5) NOT NULL DEFAULT 'GA',
  `description` varchar(4000) DEFAULT NULL,
  `submit_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tickets`
--

INSERT INTO `tickets` (`ticketID`, `name`, `sellerID`, `location`, `date`, `price`, `type`, `description`, `submit_time`) VALUES
(1, 'Lakers vs Celtics', 1001, 'Staples Center', '2015-08-28', '8.20', 'GA', NULL, '2015-07-24 04:29:59'),
(2, 'Maroon 5 LA', 1001, 'Hollywood Bowl', '2015-08-13', '130.00', 'GA', 'Maroon 5 in LA!!!!!', '2015-07-26 04:20:12'),
(3, 'hahaha', 1001, 'LA', NULL, NULL, 'GA', NULL, '2015-07-26 06:53:49'),
(4, 'maroon 5 ', 1001, 'LA', NULL, '80.00', 'GA', 'Maroon 5!', '2015-07-26 07:02:21'),
(5, NULL, NULL, NULL, '2015-08-25', NULL, 'GA', NULL, '2015-07-26 07:12:43'),
(6, 'haha', 1001, 'la', 'ok', '10.00', 'GA', NULL, '2015-07-26 07:27:51'),
(7, 'haha', 1001, 'la', 'ok', '10.00', 'GA', NULL, '2015-07-26 07:29:59'),
(8, 'haha', 1001, 'la', '1298966400', '10.00', 'GA', NULL, '2015-07-26 07:32:06'),
(9, 'haha', 1001, 'la', '1298966400', '10.00', 'GA', NULL, '2015-07-26 07:32:42'),
(10, 'haha', 1001, 'la', '1298966400', '10.00', 'GA', 'can u hear me', '2015-07-26 07:34:22'),
(11, 'haha', 1001, 'la', '1298966400', '10.00', 'VIP', 'can u hear me', '2015-07-26 07:35:45'),
(12, 'haha', 1001, 'la', '1298966400', '10.00', 'VIP', 'can u hear me', '2015-07-26 07:36:44'),
(13, 'airbnb', 1001, 'la', '1432537200', '10.00', 'SUPER', 'hoooo', '2015-07-26 07:38:26'),
(14, 'airbnb', 1001, 'mylocation', '1432537200', '20.00', 'SUPER', 'hoooo', '2015-07-26 07:39:34'),
(15, 'airbnb', 1001, 'mylocation', '1432537200', '20.00', 'SUPER', 'hoooo', '2015-07-26 07:39:51'),
(16, 'asdfasdf', 1001, 'mylocation', '1432969200', '30.00', 'AAA', 'ssssss', '2015-07-26 07:40:21'),
(17, 'asdfasdf', 1001, 'ok', '1432969200', '30.00', 'AAA', 'ssssss', '2015-07-26 07:41:16'),
(18, 'asdfasdf', 1001, 'ok', '1432969200', '30.00', 'AAA', 'ssssss', '2015-07-26 07:44:07'),
(19, 'root', 1001, 'ok', '1432969200', '30.00', 'AAA', 'ssssss', '2015-07-26 07:44:59'),
(20, 'root', 1001, 'ok', '1432969200', '30.00', 'AAA', 'ssssss', '2015-07-26 07:47:23'),
(21, 'new root', 1000, '', '', '0.00', '', '', '2015-07-26 07:49:46'),
(22, 'max', 0, 'LA', '1425542400', '20.00', 'GA', '', '2015-07-27 00:30:43');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accountinfo`
--
ALTER TABLE `accountinfo`
  ADD UNIQUE KEY `facebook_ID` (`facebook_ID`),
  ADD UNIQUE KEY `userID` (`username`),
  ADD KEY `accountID` (`accountID`);

--
-- Indexes for table `tickets`
--
ALTER TABLE `tickets`
  ADD KEY `tixID` (`ticketID`),
  ADD KEY `tixID_2` (`ticketID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `accountinfo`
--
ALTER TABLE `accountinfo`
  MODIFY `accountID` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=1016;
--
-- AUTO_INCREMENT for table `tickets`
--
ALTER TABLE `tickets`
  MODIFY `ticketID` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=23;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

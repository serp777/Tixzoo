-- phpMyAdmin SQL Dump
-- version 4.4.7
-- http://www.phpmyadmin.net
--
-- Host: localhost:3306
-- Generation Time: Jul 25, 2015 at 06:28 PM
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
) ENGINE=InnoDB AUTO_INCREMENT=1015 DEFAULT CHARSET=utf8;

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
(1014, 'aaa', NULL, 'hellohellook', 'aaa', '2015-07-25 05:21:27', NULL, NULL, NULL, NULL, 1000);

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
  `sellerID` int(11) NOT NULL,
  `location` varchar(400) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `price` decimal(8,2) NOT NULL,
  `type` varchar(5) NOT NULL DEFAULT 'GA',
  `description` varchar(4000) DEFAULT NULL,
  `submit_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tickets`
--

INSERT INTO `tickets` (`ticketID`, `name`, `sellerID`, `location`, `date`, `price`, `type`, `description`, `submit_time`) VALUES
(1, 'Lakers vs Celtics', 1001, 'Staples Center', '2015-08-28', '8.20', 'GA', NULL, '2015-07-24 04:29:59');

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
  MODIFY `accountID` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=1015;
--
-- AUTO_INCREMENT for table `tickets`
--
ALTER TABLE `tickets`
  MODIFY `ticketID` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

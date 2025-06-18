-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 18, 2025 at 11:14 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tuniform`
--

-- --------------------------------------------------------
-- Table structure for table `orders`
-- --------------------------------------------------------

DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table `orders`

INSERT INTO `orders` (`id`, `user_id`, `email`, `createdAt`) VALUES
(1, 1, 'alice@example.com', '2025-06-18 00:39:02'),
(2, 1, 'alice@example.com', '2025-06-18 00:39:25'),
(3, 1, 'alice@example.com', '2025-06-18 00:40:20'),
(4, 2, 'bob@example.com', '2025-06-18 01:17:07'),
(5, 1, 'alice@example.com', '2025-06-18 04:45:37'),
(6, 1, 'alice@example.com', '2025-06-18 04:45:39'),
(7, 1, 'alice@example.com', '2025-06-18 04:46:02'),
(8, 1, 'alice@example.com', '2025-06-18 04:46:27'),
(9, 1, 'alice@example.com', '2025-06-18 04:46:38'),
(10, 1, 'alice@example.com', '2025-06-18 04:46:52'),
(11, 1, 'alice@example.com', '2025-06-18 04:47:04'),
(12, 1, 'alice@example.com', '2025-06-18 04:47:55'),
(13, 1, 'alice@example.com', '2025-06-18 04:50:42'),
(14, 1, 'alice@example.com', '2025-06-18 04:51:06'),
(15, 3, 'carla@example.com', '2025-06-18 04:54:39'),
(16, 1, 'alice@example.com', '2025-06-18 04:54:50'),
(17, 4, 'david@example.com', '2025-06-18 05:21:22'),
(18, 4, 'david@example.com', '2025-06-18 05:21:47'),
(19, 5, 'emma@example.com', '2025-06-18 05:56:59');

-- --------------------------------------------------------
-- Table structure for table `users`
-- --------------------------------------------------------

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table `users`

INSERT INTO `users` (`id`, `name`, `email`, `createdAt`) VALUES
(1, 'Alice Dupont', 'alice@example.com', '2025-06-18 00:39:02'),
(2, 'Bob Marley', 'bob@example.com', '2025-06-18 01:17:07'),
(3, 'Carla Nasser', 'carla@example.com', '2025-06-18 04:54:39'),
(4, 'David Kim', 'david@example.com', '2025-06-18 05:21:22'),
(5, 'Emma Thomas', 'emma@example.com', '2025-06-18 05:56:59');

-- --------------------------------------------------------
-- Indexes for dumped tables
-- --------------------------------------------------------

-- Indexes for table `orders`
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

-- Indexes for table `users`
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

-- --------------------------------------------------------
-- AUTO_INCREMENT for dumped tables
-- --------------------------------------------------------

-- AUTO_INCREMENT for table `orders`
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

-- AUTO_INCREMENT for table `users`
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

-- --------------------------------------------------------
-- Constraints for dumped tables
-- --------------------------------------------------------

-- Constraints for table `orders`
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

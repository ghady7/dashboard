-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 03, 2024 at 09:23 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `inventory`
--

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `product_id` int(11) DEFAULT NULL,
  `qty_ordered` int(11) DEFAULT NULL,
  `qty_received` int(11) DEFAULT NULL,
  `supplier_id` int(11) DEFAULT NULL,
  `status` varchar(255) DEFAULT 'Pending',
  `ordered_by` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `product_id`, `qty_ordered`, `qty_received`, `supplier_id`, `status`, `ordered_by`, `created_at`) VALUES
(11, 1, 20, NULL, 1, 'Completed', 1, '2024-05-06 19:47:39'),
(12, 12, 30, NULL, 2, 'Completed', 1, '2024-05-06 20:08:53'),
(13, 1, 20, NULL, 1, 'Completed', 1, '2024-05-06 20:13:47'),
(17, 11, 10, NULL, 1, 'Completed', 1, '2024-05-07 10:13:39'),
(18, 11, 10, NULL, 1, 'Completed', 1, '2024-05-07 10:15:10'),
(19, 23, 5, NULL, 2, 'Completed', 1, '2024-05-07 10:52:45'),
(20, 28, 8, NULL, 1, 'Completed', 1, '2024-05-07 10:58:34'),
(21, 30, 8, NULL, 1, 'Completed', 1, '2024-05-07 10:58:46'),
(22, 1, 12, NULL, 1, 'Completed', 1, '2024-10-13 17:47:42'),
(23, 43, 7, NULL, 1, 'Completed', 1, '2024-10-24 12:42:49'),
(24, 1, 4, NULL, 1, 'Completed', 1, '2024-10-24 16:34:36');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `category` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `price`, `description`, `quantity`, `category`) VALUES
(1, 'Smartphone', 699.00, '6.5-inch OLED display, Qualcomm Snapdragon 888 processor, 128GB storage', 237, 'Electronics'),
(2, 'Laptop', 999.99, '15.6-inch Full HD display, Intel Core i7 processor, 16GB RAM, 512GB SSD', 80, 'Electronics'),
(3, 'Smartwatch', 249.99, '1.3-inch AMOLED display, heart rate monitor, GPS, waterproof', 120, 'Electronics'),
(4, 'Wireless Earbuds', 129.99, 'True wireless earbuds with active noise cancellation', 150, 'Electronics'),
(5, 'Bluetooth Speaker', 79.99, 'Portable Bluetooth speaker with 10 hours of battery life', 200, 'Electronics'),
(6, 'Fitness Tracker', 89.99, 'Activity and sleep tracking, heart rate monitor, water-resistant', 100, 'Electronics'),
(7, 'Digital Camera', 499.99, '20.1-megapixel DSLR camera with 4K video recording', 50, 'Electronics'),
(8, 'LED TV', 799.00, '55-inch 4K Ultra HD Smart LED TV, HDR, built-in streaming apps', 60, 'Electronics'),
(9, 'Gaming Console', 399.99, 'Next-gen gaming console, 4K gaming support, high-speed SSD', 70, 'Electronics'),
(10, 'Tablet', 299.99, '10.1-inch touchscreen tablet, octa-core processor, 64GB storage', 100, 'Electronics'),
(11, 'Action Camera', 199.99, '4K action camera with waterproof case and Wi-Fi connectivity', 110, 'Electronics'),
(12, 'Drone', 299.99, 'Quadcopter drone with HD camera, GPS, and intelligent flight modes', 100, 'Electronics'),
(13, 'Fitness Band', 49.99, 'Slim fitness band with heart rate monitor, activity tracking, and OLED display', 120, 'Electronics'),
(14, 'External Hard Drive', 79.99, '1TB USB 3.0 external hard drive for backup and storage', 100, 'Electronics'),
(15, 'Wireless Mouse', 29.99, 'Ergonomic wireless mouse with customizable buttons and precision tracking', 150, 'Electronics'),
(16, 'Mechanical Keyboard', 99.99, 'RGB backlit mechanical keyboard with tactile switches', 80, 'Electronics'),
(17, 'Wi-Fi Router', 79.99, 'Dual-band Wi-Fi router with parental controls and guest network', 70, 'Electronics'),
(18, 'Noise-Canceling Headphones', 149.99, 'Over-ear noise-canceling headphones with Bluetooth and NFC', 100, 'Electronics'),
(19, 'Portable Power Bank', 39.99, '10000mAh portable charger with dual USB ports', 150, 'Accessories'),
(20, 'Wireless Charger', 29.99, 'Fast wireless charging pad for smartphones and other Qi-compatible devices', 200, 'Accessories'),
(21, 'Kitchen Knife Set', 49.99, 'Set of high-quality stainless steel kitchen knives with wooden block', 50, 'Kitchen'),
(22, 'Cookware Set', 149.99, 'Non-stick cookware set with frying pans and saucepans', 60, 'Kitchen'),
(23, 'Coffee Maker', 79.99, 'Programmable drip coffee maker with built-in grinder', 40, 'Kitchen'),
(24, 'Blender', 59.99, 'High-speed blender for making smoothies, soups, and sauces', 70, 'Kitchen'),
(25, 'Toaster Oven', 69.99, 'Compact toaster oven for baking, broiling, and toasting', 80, 'Kitchen'),
(26, 'Food Processor', 89.99, 'Multi-function food processor with slicing, chopping, and shredding attachments', 50, 'Kitchen'),
(27, 'Cutting Board', 19.99, 'Durable bamboo cutting board with juice groove', 100, 'Kitchen'),
(28, 'Dining Set', 199.99, 'Elegant dinnerware set for 4 people, microwave and dishwasher safe', 30, 'Kitchen'),
(29, 'Electric Kettle', 39.99, 'Stainless steel electric kettle with fast boil technology', 60, 'Kitchen'),
(30, 'Microwave Oven', 149.99, 'Countertop microwave oven with 1.1 cubic feet capacity', 40, 'Kitchen'),
(31, 'Cast Iron Skillet', 29.99, 'Pre-seasoned cast iron skillet for frying, baking, and grilling', 80, 'Kitchen'),
(32, 'Bed Sheet Set', 59.99, 'Luxurious bed sheet set with deep pockets, wrinkle-resistant', 100, 'Bedroom'),
(33, 'Towel Set', 39.99, 'Soft and absorbent towel set for bath and beach, 100% cotton', 120, 'Bathroom'),
(34, 'Comforter Set', 79.99, 'Hypoallergenic comforter set with pillow shams, reversible design', 60, 'Bedroom'),
(35, 'Throw Blanket', 29.99, 'Cozy throw blanket for couch, bed, or outdoor use', 90, 'Living Room'),
(36, 'Pillow Set', 49.99, 'Premium microfiber pillow set with medium-firm support', 80, 'Bedroom'),
(37, 'Laundry Basket', 19.99, 'Collapsible laundry basket with handles for easy carrying', 150, 'Bathroom'),
(38, 'Wall Clock', 24.99, 'Modern wall clock with silent quartz movement, large numbers', 100, 'Living Room'),
(39, 'Vase', 14.99, 'Decorative ceramic vase for flowers and greenery', 200, 'Living Room'),
(40, 'Throw Pillow', 19.99, 'Decorative throw pillow with plush filling, removable cover', 120, 'Living Room'),
(41, 'Area Rug', 79.99, 'Soft and durable area rug with non-slip backing', 70, 'Living Room'),
(43, 'test', 66.00, 'test test', 0, 'Electronics');

-- --------------------------------------------------------

--
-- Table structure for table `suppliers`
--

CREATE TABLE `suppliers` (
  `id` int(11) NOT NULL,
  `supplier_name` varchar(100) DEFAULT NULL,
  `supplier_location` varchar(255) DEFAULT NULL,
  `contact_details` varchar(100) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `suppliers`
--

INSERT INTO `suppliers` (`id`, `supplier_name`, `supplier_location`, `contact_details`, `created_by`, `created_at`) VALUES
(1, 'Hanny', 'USA', 'hanny.usa@ims.com', 1, '2024-05-06 09:49:51'),
(2, 'Steve', 'France', 'Steve.usa@ims.com', 1, '2024-05-06 09:51:27');

-- --------------------------------------------------------

--
-- Table structure for table `supplier_products`
--

CREATE TABLE `supplier_products` (
  `supplier_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `supplier_products`
--

INSERT INTO `supplier_products` (`supplier_id`, `product_id`) VALUES
(1, 2),
(1, 3),
(1, 4),
(1, 6),
(1, 7),
(1, 9),
(1, 17),
(1, 29),
(2, 32),
(2, 37),
(2, 38),
(2, 39),
(2, 40),
(2, 41);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `first_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` text DEFAULT 'user',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `password`, `role`, `created_at`, `updated_at`) VALUES
(1, 'Ghady', 'Tayeh', 'ghadtayeh@ims.com', 'c462ca8e57bea8a9ceef1dcbd342ec26', 'admin', '2024-05-06 09:35:25', '2024-10-12 09:50:19'),
(6, 'test', 'test', 'test@ims.com', 'cc03e747a6afbbcbf8be7668acfebee5', 'user', '2024-10-24 12:35:27', '2024-10-24 12:35:27');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `supplier_id` (`supplier_id`),
  ADD KEY `ordered_by` (`ordered_by`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `suppliers`
--
ALTER TABLE `suppliers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `created_by` (`created_by`);

--
-- Indexes for table `supplier_products`
--
ALTER TABLE `supplier_products`
  ADD PRIMARY KEY (`supplier_id`,`product_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT for table `suppliers`
--
ALTER TABLE `suppliers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers` (`id`),
  ADD CONSTRAINT `orders_ibfk_3` FOREIGN KEY (`ordered_by`) REFERENCES `users` (`id`);

--
-- Constraints for table `suppliers`
--
ALTER TABLE `suppliers`
  ADD CONSTRAINT `suppliers_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`);

--
-- Constraints for table `supplier_products`
--
ALTER TABLE `supplier_products`
  ADD CONSTRAINT `supplier_products_ibfk_1` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers` (`id`),
  ADD CONSTRAINT `supplier_products_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

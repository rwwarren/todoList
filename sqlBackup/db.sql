-- MySQL dump 10.13  Distrib 5.6.22, for osx10.10 (x86_64)
--
-- Host: localhost    Database: TasksDB
-- ------------------------------------------------------
-- Server version	5.6.22

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `TodoList`
--

DROP TABLE IF EXISTS `TodoList`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `TodoList` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user` varchar(20) NOT NULL,
  `status` varchar(15) NOT NULL DEFAULT 'Incomplete',
  `description` text,
  `due_date` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TodoList`
--

LOCK TABLES `TodoList` WRITE;
/*!40000 ALTER TABLE `TodoList` DISABLE KEYS */;
INSERT INTO `TodoList` VALUES (1,'asdf','Incomplete','This is a really long task. It has a lot of information about what the person should do because that makes it useful. I would like it do be done ASAP.','2015-04-13'),(2,'asdf','Complete','Reallyasdfasdf Lost','2015-04-21'),(3,'asdf','Incomplete','Testing','2015-04-01'),(4,'asdf1','Complete','Testing','2015-04-01'),(5,'asdf1','Complete','Testing','2015-04-02'),(6,'asdf1','Complete','Testing','2015-03-28'),(7,'asdf','Incomplete','Testing this thing sure sucks','2015-04-01'),(59,'asdf','Complete','this one','2015-04-22'),(60,'asdf','Incomplete','tests','2015-04-01'),(61,'asdf','Complete','tests22','2015-04-23'),(62,'asdf','Incomplete','Create!','2015-04-21'),(63,'asdf','Incomplete','Create!','2015-04-21'),(64,'asdf','Incomplete','Created','2015-04-20'),(65,'asdf','Incomplete','asdf','2015-04-15'),(66,'ryan','Incomplete','Testing','2015-04-22');
/*!40000 ALTER TABLE `TodoList` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2015-04-15  0:41:31

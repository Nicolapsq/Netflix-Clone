-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: localhost    Database: netflix-clone_db
-- ------------------------------------------------------
-- Server version	8.0.42

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `episodes`
--

DROP TABLE IF EXISTS `episodes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `episodes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `movie_id` int NOT NULL,
  `season` int NOT NULL,
  `episode_number` int NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` text,
  `duration` int DEFAULT NULL,
  `video_url` varchar(255) DEFAULT NULL,
  `thumbnail` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `movie_id` (`movie_id`),
  CONSTRAINT `episodes_ibfk_1` FOREIGN KEY (`movie_id`) REFERENCES `movies` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `episodes`
--

LOCK TABLES `episodes` WRITE;
/*!40000 ALTER TABLE `episodes` DISABLE KEYS */;
INSERT INTO `episodes` VALUES (1,6,1,1,'Pilot','Walter White scopre di avere un cancro e decide di produrre metanfetamine.',58,NULL,NULL),(2,6,1,2,'Cat in the Bag','Walter e Jesse devono sbarazzarsi di un cadavere.',48,NULL,NULL),(3,6,1,3,'And the Bags in the River','Walter affronta una scelta morale devastante.',48,NULL,NULL),(4,6,1,4,'Cancer Man','Walter rivela la sua malattia alla famiglia.',48,NULL,NULL),(5,6,1,5,'Gray Matter','Walter rifiuta laiuto dei vecchi amici.',48,NULL,NULL),(6,6,1,6,'Crazy Handful of Nothin','Walter adotta un nuovo alter ego: Heisenberg.',48,NULL,NULL),(7,6,1,7,'A No-Rough-Stuff-Type Deal','Walter e Jesse cercano un nuovo fornitore.',47,NULL,NULL),(8,7,1,1,'The Vanishing of Will Byers','Un ragazzo scompare misteriosamente a Hawkins.',49,NULL,NULL),(9,7,1,2,'The Weirdo on Maple Street','I ragazzi trovano una strana ragazza di nome Eleven.',55,NULL,NULL),(10,7,1,3,'Holly Jolly Christmas','Joyce comunica con Will attraverso le luci.',51,NULL,NULL),(11,7,1,4,'The Body','Il corpo di Will viene ritrovato ma qualcosa non torna.',55,NULL,NULL),(12,7,1,5,'The Flea and the Acrobat','Il gruppo scopre il Sottosopra.',50,NULL,NULL),(13,7,1,6,'The Monster','Eleven rivela la verita sulla sua origine.',46,NULL,NULL),(14,7,1,7,'The Bathtub','Eleven entra nel Sottosopra per trovare Will.',41,NULL,NULL),(15,7,1,8,'The Upside Down','La battaglia finale contro il Demogorgone.',55,NULL,NULL),(16,9,1,1,'Episodio 1','Il Professore pianifica la rapina alla Zecca di Stato.',44,NULL,NULL),(17,9,1,2,'Episodio 2','I rapinatori prendono il controllo della Zecca.',44,NULL,NULL),(18,9,1,3,'Episodio 3','Le trattative con la polizia iniziano.',44,NULL,NULL),(19,9,1,4,'Episodio 4','La tensione sale dentro e fuori dalla Zecca.',44,NULL,NULL),(20,9,1,5,'Episodio 5','Un traditore si nasconde nel gruppo.',44,NULL,NULL),(21,6,1,1,'Pilot','Walter White scopre di avere un cancro e decide di produrre metanfetamine.',58,NULL,NULL),(22,6,1,2,'Cat in the Bag','Walter e Jesse devono sbarazzarsi di un cadavere.',48,NULL,NULL),(23,6,1,3,'And the Bags in the River','Walter affronta una scelta morale devastante.',48,NULL,NULL),(24,6,1,4,'Cancer Man','Walter rivela la sua malattia alla famiglia.',48,NULL,NULL),(25,6,1,5,'Gray Matter','Walter rifiuta laiuto dei vecchi amici.',48,NULL,NULL),(26,6,1,6,'Crazy Handful of Nothin','Walter adotta un nuovo alter ego: Heisenberg.',48,NULL,NULL),(27,6,1,7,'A No-Rough-Stuff-Type Deal','Walter e Jesse cercano un nuovo fornitore.',47,NULL,NULL),(28,7,1,1,'The Vanishing of Will Byers','Un ragazzo scompare misteriosamente a Hawkins.',49,NULL,NULL),(29,7,1,2,'The Weirdo on Maple Street','I ragazzi trovano una strana ragazza di nome Eleven.',55,NULL,NULL),(30,7,1,3,'Holly Jolly Christmas','Joyce comunica con Will attraverso le luci.',51,NULL,NULL),(31,7,1,4,'The Body','Il corpo di Will viene ritrovato ma qualcosa non torna.',55,NULL,NULL),(32,7,1,5,'The Flea and the Acrobat','Il gruppo scopre il Sottosopra.',50,NULL,NULL),(33,7,1,6,'The Monster','Eleven rivela la verita sulla sua origine.',46,NULL,NULL),(34,7,1,7,'The Bathtub','Eleven entra nel Sottosopra per trovare Will.',41,NULL,NULL),(35,7,1,8,'The Upside Down','La battaglia finale contro il Demogorgone.',55,NULL,NULL),(36,9,1,1,'Episodio 1','Il Professore pianifica la rapina alla Zecca di Stato.',44,NULL,NULL),(37,9,1,2,'Episodio 2','I rapinatori prendono il controllo della Zecca.',44,NULL,NULL),(38,9,1,3,'Episodio 3','Le trattative con la polizia iniziano.',44,NULL,NULL),(39,9,1,4,'Episodio 4','La tensione sale dentro e fuori dalla Zecca.',44,NULL,NULL),(40,9,1,5,'Episodio 5','Un traditore si nasconde nel gruppo.',44,NULL,NULL);
/*!40000 ALTER TABLE `episodes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `genres`
--

DROP TABLE IF EXISTS `genres`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `genres` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `genres`
--

LOCK TABLES `genres` WRITE;
/*!40000 ALTER TABLE `genres` DISABLE KEYS */;
INSERT INTO `genres` VALUES (1,'Azione'),(2,'Commedia'),(3,'Drama'),(4,'Horror'),(5,'Fantascienza'),(6,'Thriller'),(7,'Animazione'),(8,'Documentario'),(9,'Azione'),(10,'Commedia'),(11,'Drama'),(12,'Horror'),(13,'Fantascienza'),(14,'Thriller'),(15,'Animazione'),(16,'Documentario'),(17,'Azione'),(18,'Commedia'),(19,'Drama'),(20,'Horror'),(21,'Fantascienza'),(22,'Thriller'),(23,'Animazione'),(24,'Documentario');
/*!40000 ALTER TABLE `genres` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `movie_genres`
--

DROP TABLE IF EXISTS `movie_genres`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `movie_genres` (
  `movie_id` int NOT NULL,
  `genre_id` int NOT NULL,
  PRIMARY KEY (`movie_id`,`genre_id`),
  KEY `genre_id` (`genre_id`),
  CONSTRAINT `movie_genres_ibfk_1` FOREIGN KEY (`movie_id`) REFERENCES `movies` (`id`) ON DELETE CASCADE,
  CONSTRAINT `movie_genres_ibfk_2` FOREIGN KEY (`genre_id`) REFERENCES `genres` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `movie_genres`
--

LOCK TABLES `movie_genres` WRITE;
/*!40000 ALTER TABLE `movie_genres` DISABLE KEYS */;
INSERT INTO `movie_genres` VALUES (2,1),(4,1),(5,1),(8,1),(1,3),(2,3),(3,3),(6,3),(7,3),(9,3),(10,3),(11,3),(12,3),(7,4),(1,5),(3,5),(4,5),(5,5),(7,5),(8,5),(10,5),(1,6),(2,6),(6,6),(9,6),(10,6),(12,6),(11,7);
/*!40000 ALTER TABLE `movie_genres` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `movies`
--

DROP TABLE IF EXISTS `movies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `movies` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text,
  `release_year` year DEFAULT NULL,
  `duration` int DEFAULT NULL,
  `type` enum('movie','series') NOT NULL,
  `rating` enum('G','PG','PG-13','R','NC-17') DEFAULT 'PG',
  `thumbnail` varchar(255) DEFAULT NULL,
  `banner` varchar(255) DEFAULT NULL,
  `video_url` varchar(255) DEFAULT NULL,
  `is_featured` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `movies`
--

LOCK TABLES `movies` WRITE;
/*!40000 ALTER TABLE `movies` DISABLE KEYS */;
INSERT INTO `movies` VALUES (1,'Inception','Un ladro che ruba segreti dai sogni altrui viene incaricato di impiantare unidea nella mente di un uomo.',2010,148,'movie','PG-13',NULL,NULL,NULL,1,'2026-03-07 18:31:59'),(2,'The Dark Knight','Batman affronta il Joker, un criminale caotico che vuole gettare Gotham nel caos.',2008,152,'movie','PG-13',NULL,NULL,NULL,1,'2026-03-07 18:31:59'),(3,'Interstellar','Un gruppo di astronauti viaggia attraverso un wormhole alla ricerca di un nuovo pianeta abitabile.',2014,169,'movie','PG-13',NULL,NULL,NULL,0,'2026-03-07 18:31:59'),(4,'The Matrix','Un hacker scopre che la realtà è una simulazione controllata dalle macchine.',1999,136,'movie','R',NULL,NULL,NULL,0,'2026-03-07 18:31:59'),(5,'Avengers Endgame','I supereroi Marvel affrontano Thanos in una battaglia finale per salvare lumanità.',2019,181,'movie','PG-13',NULL,NULL,NULL,1,'2026-03-07 18:31:59'),(6,'Breaking Bad','Un professore di chimica malato di cancro diventa un produttore di metanfetamine.',2008,47,'series','R',NULL,NULL,NULL,1,'2026-03-07 18:31:59'),(7,'Stranger Things','Un gruppo di ragazzi affronta forze soprannaturali in una piccola città americana.',2016,51,'series','PG-13',NULL,NULL,NULL,1,'2026-03-07 18:31:59'),(8,'The Witcher','Un cacciatore di mostri combatte in un mondo fantasy pieno di pericoli.',2019,60,'series','R',NULL,NULL,NULL,0,'2026-03-07 18:31:59'),(9,'Money Heist','Un gruppo di ladri esegue una rapina elaborata alla Zecca di Stato spagnola.',2017,45,'series','R',NULL,NULL,NULL,1,'2026-03-07 18:31:59'),(10,'Dark','Le vite di quattro famiglie si intrecciano in un mistero che attraversa il tempo.',2017,52,'series','R',NULL,NULL,NULL,0,'2026-03-07 18:31:59'),(11,'The Lion King','Il cucciolo di leone Simba cresce per diventare il re della savana.',1994,88,'movie','G',NULL,NULL,NULL,0,'2026-03-07 18:31:59'),(12,'Pulp Fiction','Storie intrecciate di criminali, filosofia e violenza nella Los Angeles criminale.',1994,154,'movie','R',NULL,NULL,NULL,0,'2026-03-07 18:31:59'),(13,'Inception','Un ladro che ruba segreti dai sogni altrui viene incaricato di impiantare unidea nella mente di un uomo.',2010,148,'movie','PG-13',NULL,NULL,NULL,1,'2026-03-07 18:32:18'),(14,'The Dark Knight','Batman affronta il Joker, un criminale caotico che vuole gettare Gotham nel caos.',2008,152,'movie','PG-13',NULL,NULL,NULL,1,'2026-03-07 18:32:18'),(15,'Interstellar','Un gruppo di astronauti viaggia attraverso un wormhole alla ricerca di un nuovo pianeta abitabile.',2014,169,'movie','PG-13',NULL,NULL,NULL,0,'2026-03-07 18:32:18'),(16,'The Matrix','Un hacker scopre che la realtà è una simulazione controllata dalle macchine.',1999,136,'movie','R',NULL,NULL,NULL,0,'2026-03-07 18:32:18'),(17,'Avengers Endgame','I supereroi Marvel affrontano Thanos in una battaglia finale per salvare lumanità.',2019,181,'movie','PG-13',NULL,NULL,NULL,1,'2026-03-07 18:32:18'),(18,'Breaking Bad','Un professore di chimica malato di cancro diventa un produttore di metanfetamine.',2008,47,'series','R',NULL,NULL,NULL,1,'2026-03-07 18:32:18'),(19,'Stranger Things','Un gruppo di ragazzi affronta forze soprannaturali in una piccola città americana.',2016,51,'series','PG-13',NULL,NULL,NULL,1,'2026-03-07 18:32:18'),(20,'The Witcher','Un cacciatore di mostri combatte in un mondo fantasy pieno di pericoli.',2019,60,'series','R',NULL,NULL,NULL,0,'2026-03-07 18:32:18'),(21,'Money Heist','Un gruppo di ladri esegue una rapina elaborata alla Zecca di Stato spagnola.',2017,45,'series','R',NULL,NULL,NULL,1,'2026-03-07 18:32:18'),(22,'Dark','Le vite di quattro famiglie si intrecciano in un mistero che attraversa il tempo.',2017,52,'series','R',NULL,NULL,NULL,0,'2026-03-07 18:32:18'),(23,'The Lion King','Il cucciolo di leone Simba cresce per diventare il re della savana.',1994,88,'movie','G',NULL,NULL,NULL,0,'2026-03-07 18:32:18'),(24,'Pulp Fiction','Storie intrecciate di criminali, filosofia e violenza nella Los Angeles criminale.',1994,154,'movie','R',NULL,NULL,NULL,0,'2026-03-07 18:32:18'),(25,'Inception','Un ladro che ruba segreti dai sogni altrui viene incaricato di impiantare unidea nella mente di un uomo.',2010,148,'movie','PG-13',NULL,NULL,NULL,1,'2026-03-07 18:33:08'),(26,'The Dark Knight','Batman affronta il Joker, un criminale caotico che vuole gettare Gotham nel caos.',2008,152,'movie','PG-13',NULL,NULL,NULL,1,'2026-03-07 18:33:08'),(27,'Interstellar','Un gruppo di astronauti viaggia attraverso un wormhole alla ricerca di un nuovo pianeta abitabile.',2014,169,'movie','PG-13',NULL,NULL,NULL,0,'2026-03-07 18:33:08'),(28,'The Matrix','Un hacker scopre che la realtà è una simulazione controllata dalle macchine.',1999,136,'movie','R',NULL,NULL,NULL,0,'2026-03-07 18:33:08'),(29,'Avengers Endgame','I supereroi Marvel affrontano Thanos in una battaglia finale per salvare lumanità.',2019,181,'movie','PG-13',NULL,NULL,NULL,1,'2026-03-07 18:33:08'),(30,'Breaking Bad','Un professore di chimica malato di cancro diventa un produttore di metanfetamine.',2008,47,'series','R',NULL,NULL,NULL,1,'2026-03-07 18:33:08'),(31,'Stranger Things','Un gruppo di ragazzi affronta forze soprannaturali in una piccola città americana.',2016,51,'series','PG-13',NULL,NULL,NULL,1,'2026-03-07 18:33:08'),(32,'The Witcher','Un cacciatore di mostri combatte in un mondo fantasy pieno di pericoli.',2019,60,'series','R',NULL,NULL,NULL,0,'2026-03-07 18:33:08'),(33,'Money Heist','Un gruppo di ladri esegue una rapina elaborata alla Zecca di Stato spagnola.',2017,45,'series','R',NULL,NULL,NULL,1,'2026-03-07 18:33:08'),(34,'Dark','Le vite di quattro famiglie si intrecciano in un mistero che attraversa il tempo.',2017,52,'series','R',NULL,NULL,NULL,0,'2026-03-07 18:33:08'),(35,'The Lion King','Il cucciolo di leone Simba cresce per diventare il re della savana.',1994,88,'movie','G',NULL,NULL,NULL,0,'2026-03-07 18:33:08'),(36,'Pulp Fiction','Storie intrecciate di criminali, filosofia e violenza nella Los Angeles criminale.',1994,154,'movie','R',NULL,NULL,NULL,0,'2026-03-07 18:33:08'),(37,'Inception','Un ladro che ruba segreti dai sogni altrui viene incaricato di impiantare unidea nella mente di un uomo.',2010,148,'movie','PG-13',NULL,NULL,NULL,1,'2026-03-07 18:33:10'),(38,'The Dark Knight','Batman affronta il Joker, un criminale caotico che vuole gettare Gotham nel caos.',2008,152,'movie','PG-13',NULL,NULL,NULL,1,'2026-03-07 18:33:10'),(39,'Interstellar','Un gruppo di astronauti viaggia attraverso un wormhole alla ricerca di un nuovo pianeta abitabile.',2014,169,'movie','PG-13',NULL,NULL,NULL,0,'2026-03-07 18:33:10'),(40,'The Matrix','Un hacker scopre che la realtà è una simulazione controllata dalle macchine.',1999,136,'movie','R',NULL,NULL,NULL,0,'2026-03-07 18:33:10'),(41,'Avengers Endgame','I supereroi Marvel affrontano Thanos in una battaglia finale per salvare lumanità.',2019,181,'movie','PG-13',NULL,NULL,NULL,1,'2026-03-07 18:33:10'),(42,'Breaking Bad','Un professore di chimica malato di cancro diventa un produttore di metanfetamine.',2008,47,'series','R',NULL,NULL,NULL,1,'2026-03-07 18:33:10'),(43,'Stranger Things','Un gruppo di ragazzi affronta forze soprannaturali in una piccola città americana.',2016,51,'series','PG-13',NULL,NULL,NULL,1,'2026-03-07 18:33:10'),(44,'The Witcher','Un cacciatore di mostri combatte in un mondo fantasy pieno di pericoli.',2019,60,'series','R',NULL,NULL,NULL,0,'2026-03-07 18:33:10'),(45,'Money Heist','Un gruppo di ladri esegue una rapina elaborata alla Zecca di Stato spagnola.',2017,45,'series','R',NULL,NULL,NULL,1,'2026-03-07 18:33:10'),(46,'Dark','Le vite di quattro famiglie si intrecciano in un mistero che attraversa il tempo.',2017,52,'series','R',NULL,NULL,NULL,0,'2026-03-07 18:33:10'),(47,'The Lion King','Il cucciolo di leone Simba cresce per diventare il re della savana.',1994,88,'movie','G',NULL,NULL,NULL,0,'2026-03-07 18:33:10'),(48,'Pulp Fiction','Storie intrecciate di criminali, filosofia e violenza nella Los Angeles criminale.',1994,154,'movie','R',NULL,NULL,NULL,0,'2026-03-07 18:33:10');
/*!40000 ALTER TABLE `movies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profiles`
--

DROP TABLE IF EXISTS `profiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `profiles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `is_kids` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `profiles_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profiles`
--

LOCK TABLES `profiles` WRITE;
/*!40000 ALTER TABLE `profiles` DISABLE KEYS */;
INSERT INTO `profiles` VALUES (1,1,'Nicola',NULL,0,'2026-03-07 18:44:29'),(2,1,'Maria',NULL,0,'2026-03-07 18:44:29'),(3,1,'Kids',NULL,1,'2026-03-07 18:44:29');
/*!40000 ALTER TABLE `profiles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `plan` enum('basic','standard','premium') DEFAULT 'basic',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'test@netflix.com','1234','premium','2026-03-07 18:40:04');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `watch_history`
--

DROP TABLE IF EXISTS `watch_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `watch_history` (
  `id` int NOT NULL AUTO_INCREMENT,
  `profile_id` int NOT NULL,
  `movie_id` int NOT NULL,
  `episode_id` int DEFAULT NULL,
  `progress` int DEFAULT '0' COMMENT 'secondi visti',
  `watched_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `profile_id` (`profile_id`),
  KEY `movie_id` (`movie_id`),
  KEY `episode_id` (`episode_id`),
  CONSTRAINT `watch_history_ibfk_1` FOREIGN KEY (`profile_id`) REFERENCES `profiles` (`id`) ON DELETE CASCADE,
  CONSTRAINT `watch_history_ibfk_2` FOREIGN KEY (`movie_id`) REFERENCES `movies` (`id`) ON DELETE CASCADE,
  CONSTRAINT `watch_history_ibfk_3` FOREIGN KEY (`episode_id`) REFERENCES `episodes` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `watch_history`
--

LOCK TABLES `watch_history` WRITE;
/*!40000 ALTER TABLE `watch_history` DISABLE KEYS */;
/*!40000 ALTER TABLE `watch_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `watchlist`
--

DROP TABLE IF EXISTS `watchlist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `watchlist` (
  `id` int NOT NULL AUTO_INCREMENT,
  `profile_id` int NOT NULL,
  `movie_id` int NOT NULL,
  `added_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `profile_id` (`profile_id`),
  KEY `movie_id` (`movie_id`),
  CONSTRAINT `watchlist_ibfk_1` FOREIGN KEY (`profile_id`) REFERENCES `profiles` (`id`) ON DELETE CASCADE,
  CONSTRAINT `watchlist_ibfk_2` FOREIGN KEY (`movie_id`) REFERENCES `movies` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `watchlist`
--

LOCK TABLES `watchlist` WRITE;
/*!40000 ALTER TABLE `watchlist` DISABLE KEYS */;
/*!40000 ALTER TABLE `watchlist` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-03-07 19:52:46

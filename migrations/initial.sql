CREATE TABLE `activities` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL DEFAULT '0',
  `activity_type` varchar(50) DEFAULT NULL,
  `start_date` varchar(30) NOT NULL DEFAULT '0',
  `timezone` varchar(40) DEFAULT NULL,
  `distance` decimal(10,2) NOT NULL DEFAULT '0.00',
  `duration` mediumint(8) unsigned DEFAULT '0',
  `avg_hr` tinyint(3) unsigned DEFAULT NULL,
  `max_hr` tinyint(3) unsigned DEFAULT NULL,
  `calories` mediumint(5) DEFAULT NULL,
  `shoe_id` int(10) unsigned DEFAULT NULL,
  `notes` text,
  `friends` varchar(255) DEFAULT NULL,
  `garmin_activity_id` int(11) unsigned DEFAULT NULL,
  `elevation_gain` int(5) unsigned DEFAULT NULL,
  `elevation_loss` int(5) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `USER` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2254 DEFAULT CHARSET=utf8;


CREATE TABLE `activities_friends` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `activity_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE `brands` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;


CREATE TABLE `shoes` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `model` varchar(60) NOT NULL DEFAULT '',
  `brand_id` int(10) NOT NULL,
  `user_id` int(10) unsigned NOT NULL DEFAULT '0',
  `inactive` tinyint(1) DEFAULT NULL,
  `size_type` smallint(1) DEFAULT NULL,
  `size` decimal(3,1) DEFAULT NULL,
  `notes` text,
  PRIMARY KEY (`id`),
  KEY `INACTIVE` (`inactive`),
  KEY `USER` (`user_id`),
  KEY `BRAND` (`brand_id`)
) ENGINE=InnoDB AUTO_INCREMENT=66 DEFAULT CHARSET=utf8;


CREATE TABLE `splits` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `activity_id` int(11) unsigned DEFAULT NULL,
  `split` mediumint(4) unsigned DEFAULT NULL,
  `distance` decimal(10,2) unsigned DEFAULT NULL,
  `duration` mediumint(8) unsigned DEFAULT NULL,
  `avg_hr` tinyint(3) unsigned DEFAULT NULL,
  `max_hr` tinyint(3) unsigned DEFAULT NULL,
  `calories` mediumint(5) unsigned DEFAULT NULL,
  `elevation_change` decimal(10,5) DEFAULT NULL,
  `elevation_gain` decimal(10,5) DEFAULT NULL,
  `elevation_loss` decimal(10,5) DEFAULT NULL,
  `max_speed` decimal(10,5) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `activity` (`activity_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE `trackpoints` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `activity_id` int(11) unsigned NOT NULL,
  `time` varchar(30) DEFAULT NULL,
  `latitude_deg` decimal(10,8) NOT NULL,
  `longitude_deg` decimal(11,8) NOT NULL,
  `altitude_meters` decimal(10,5) DEFAULT NULL,
  `distance_meters` decimal(10,5) DEFAULT NULL,
  `heart_rate_bpm` tinyint(3) unsigned DEFAULT NULL,
  `speed` decimal(10,5) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `activity` (`activity_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE `users` (
  `id` bigint(20) unsigned NOT NULL DEFAULT '0',
  `first_name` varchar(20) NOT NULL DEFAULT '',
  `last_name` varchar(40) NOT NULL DEFAULT '',
  `email` varchar(80) NOT NULL DEFAULT '',
  `password` varchar(40) DEFAULT '',
  `created` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `last_login` datetime DEFAULT NULL,
  `location` varchar(100) DEFAULT NULL,
  `timezone` varchar(40) DEFAULT NULL,
  `distance_units` smallint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `login` (`email`,`password`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

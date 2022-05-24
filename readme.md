DROP DATABASE IF EXISTS baldur;

CREATE DATABASE IF NOT EXISTS baldur;

USE baldur;

CREATE TABLE IF NOT EXISTS Artist(
artistID int AUTO_INCREMENT PRIMARY KEY,
artist_name varchar(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS Albums(
albumID int AUTO_INCREMENT PRIMARY KEY,
album_name varchar(50) NOT NULL,
artistID int NOT NULL, FOREIGN KEY (artistID) REFERENCES Artist(artistID) );

CREATE TABLE IF NOT EXISTS Songs(
songID int AUTO_INCREMENT PRIMARY KEY,
song_name varchar(50) NOT NULL,
streams int NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS Linkartist(
artistID int NOT NULL,
songID int NOT NULL,
FOREIGN KEY (artistID) REFERENCES Artist(artistID),
FOREIGN KEY (songID) REFERENCES Songs(songID)
);

CREATE TABLE IF NOT EXISTS Linkalbum(
albumID int NOT NULL,
songID int NOT NULL,
FOREIGN KEY (albumID) REFERENCES Albums(albumID),
FOREIGN KEY (songID) REFERENCES Songs(songID)
);

INSERT INTO Artist VALUES (DEFAULT, "Kendrik Lamar");
INSERT INTO Artist VALUES (DEFAULT, "Playboi Carti");
INSERT INTO Artist VALUES (DEFAULT, "Future");
INSERT INTO Artist VALUES (DEFAULT, "Stromae");

INSERT INTO Albums VALUE (DEFAULT, "Mr. Morale & The Big Steppers", 1);
INSERT INTO Albums VALUE (DEFAULT, "Whole Lotta Red", 2);
INSERT INTO Albums VALUE (DEFAULT, "Future: Complete Collection", 3);
INSERT INTO Albums VALUE (DEFAULT, "Cheese", 4);

INSERT INTO Songs VALUES (DEFAULT, "We Cry Together", 0);
INSERT INTO Songs VALUES (DEFAULT, "Rockstar Made", 0);
INSERT INTO Songs VALUES (DEFAULT, "WAIT FOR U", 0);
INSERT INTO Songs VALUES (DEFAULT, "Alors On Danse", 0);

INSERT INTO Linkartist VALUES (1,1);
INSERT INTO Linkartist VALUES (2,2);
INSERT INTO Linkartist VALUES (3,3);
INSERT INTO Linkartist VALUES (4,4);

INSERT INTO Linkalbum VALUES (1,1);
INSERT INTO Linkalbum VALUES (2,2);
INSERT INTO Linkalbum VALUES (3,3);
INSERT INTO Linkalbum VALUES (4,4);

CREATE VIEW AboveAverageSteams AS
SELECT song_name
FROM Songs
WHERE streams > (SELECT AVG(streams) FROM Songs);

DELIMITER $$

CREATE PROCEDURE all_songs_from_artist(artist int) BEGIN SELECT song_name FROM Songs where artist = Artist.artistID; END $$

CREATE TRIGGER preventSameArtistName BEFORE INSERT ON Artist FOR EACH ROW BEGIN IF (new.artist_name IN (SELECT artist_name FROM Artist)) THEN SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Unique Artist name required'; END IF;

END $$

CREATE FUNCTION artistbyID(id INT) returns VARCHAR(50) DETERMINISTIC READS SQL DATA BEGIN

return(SELECT artist_name FROM Artist where artistID = id);

END $$

DELIMITER ;

# LabeMusic-Back-end
Plataforma de publicação de áudio

- MODELAGEM:
```
CREATE TABLE IF NOT EXISTS labemusic_user(
  id VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  nickname VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);
```
```
CREATE TABLE IF NOT EXISTS labemusic_music(
id VARCHAR(255) PRIMARY KEY,
title VARCHAR(255) NOT NULL,
author VARCHAR(255) NOT NULL,
date DATE NOT NULL,
file VARCHAR(255) NOT NULL,
album VARCHAR(255) NOT NULL
);
```
```
CREATE TABLE labemusic_genre(
	id VARCHAR (255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);
```
```
CREATE TABLE labemusic_music_genre(
	genre_id VARCHAR (255),
    music_id VARCHAR(255),    
    FOREIGN KEY (music_id) REFERENCES labemusic_music(id),
    FOREIGN KEY (genre_id) REFERENCES labemusic_genre(id)    
);
```


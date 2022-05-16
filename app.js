const express = require('express');
const mysql = require('mysql');

const app = express();

//App config

app.set('view-engine', 'ejs');
app.use(express.static('views'));
app.use(express.urlencoded({ extended: false }));

//db

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'baldur',
});

db.connect((error) => {
  if (error) {
    console.log(`MySQL Error: ${error}`);
  }
});

// Routes

// GET

app.get('/', (req, res) => {
  res.render('index.ejs');
});

// POST

//CREATE

app.post('/create', (req, res) => {
  const name = req.body.songname;
  const artist = req.body.artist;
  const album = req.body.album;

  const sql = `INSERT INTO songs(song_name, artistID, albumID) VALUES(?,?,?)`;

  db.query(sql, [name, artist, album], (err, result) => {
    if (err) throw err;
    res.status(200);
    res.send('Insert successfull');
  });
});

//READ

app.post('/readartist', (req, res) => {
  db.query('SELECT * FROM artist', (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

app.post('/readsong', (req, res) => {
  db.query('SELECT * FROM songs', (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

app.post('/readalbum', (req, res) => {
  db.query('SELECT * FROM albums', (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

//UPDATE

app.post('/update', (req, res) => {
  const name = req.body.name;
  const id = req.body.id;

  const sql = `UPDATE artist SET artist_name = ? WHERE artistID = ?`;

  db.query(sql, [name, id], (err, result) => {
    if (err) throw err;
    res.status(200);
    res.send('Update successfull');
  });
});

//DELETE

app.post('/delete', (req, res) => {
  const id = req.body.value;

  console.log(id);

  const sql = `DELETE FROM songs WHERE songID = ?`;

  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.status(200);
    res.send('Delete successfull');
  });
});

app.post('/join', (req, res) => {
  const sql = `SELECT * FROM albums INNER JOIN songs on albums.albumID = songs.albumID`;

  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.post('/like', (req, res) => {
  const sql = `SELECT * FROM songs WHERE song_name LIKE 'Rock%';`;

  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.listen(3000);

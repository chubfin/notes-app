// const express = require('express');
// const cors = require('cors');
// const db = require('./db');

// const app = express();
// app.use(cors());
// app.use(express.json());

// db.connect(err => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   console.log('MySQL Connected...');
// });

// // GET
// async function getNotes() {
//   const res = await fetch('http://localhost:3000/notes');
//   const data = await res.json();

//   const list = document.getElementById('list');
//   list.innerHTML = '';

//   if (data.length === 0) {
//     list.innerHTML = `
//       <tr>
//         <td colspan="4" class="empty">Belum ada catatan 😢</td>
//       </tr>
//     `;
//     return;
//   }

//   data.forEach((note, index) => {
//     let isiPendek = note.isi;

//     if (isiPendek.length > 30) {
//       isiPendek = isiPendek.substring(0, 30) + "...";
//     }

//     list.innerHTML += `
//       <tr>
//         <td>${index + 1}</td>
//         <td>${note.judul}</td>
//         <td>${isiPendek}</td>
//         <td>
//           <button onclick="edit(${note.id})">✏️</button>
//           <button onclick="hapus(${note.id})">🗑️</button>
//         </td>
//       </tr>
//     `;
//   });
// }


// // POST
// app.post('/notes', (req, res) => {
//   const { judul, isi } = req.body;
//   db.query(
//     'INSERT INTO notes (judul, isi) VALUES (?, ?)',
//     [judul, isi],
//     (err) => {
//       if (err) throw err;
//       res.send('Note added');
//     }
//   );
// });

// app.get('/notes', (req, res) => {
//   db.query('SELECT * FROM notes', (err, result) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).send('Error ambil data');
//     }
//     res.json(result);
//   });
// });

// app.listen(3000, () => console.log('Server running on port 3000'));

// app.get('/', (req, res) => {
//   res.send('SERVER HIDUP');
// });

// // UPDATE
// app.put('/notes/:id', (req, res) => {
//   const { id } = req.params;
//   const { judul, isi } = req.body;

//   db.query(
//     'UPDATE notes SET judul=?, isi=? WHERE id=?',
//     [judul, isi, id],
//     (err, result) => {
//       if (err) {
//         console.error(err);
//         return res.status(500).send('Error update');
//       }

//       if (result.affectedRows === 0) {
//         return res.send('ID tidak ditemukan');
//       }

//       res.send('Note updated');
//     }
//   );
// });


// // DELETE
// app.delete('/notes/:id', (req, res) => {
//   const { id } = req.params;

//   db.query(
//     'DELETE FROM notes WHERE id=?',
//     [id],
//     (err, result) => {
//       if (err) {
//         console.error(err);
//         return res.status(500).send('Error delete');
//       }

//       if (result.affectedRows === 0) {
//         return res.send('ID tidak ditemukan');
//       }

//       res.send('Note deleted');
//     }
//   );
// });

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const sequelize = require("./config/database");
const noteRoutes = require("./routes/noteRoutes");
const Note = require('./schema/Notes');

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server jalan 😎");
});

// register schema
app.use("/notes", noteRoutes);

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
  console.log("DB synced");
  app.listen(PORT, () => console.log("Server running on port " + PORT));
});
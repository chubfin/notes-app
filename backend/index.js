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

app.use("/notes", noteRoutes);

// Tentukan Port
const PORT = process.env.PORT || 8080;

// JALANKAN SYNC DULU, BARU LISTEN
// Ini memastikan database siap sebelum server menerima tamu
sequelize.sync()
  .then(() => {
    console.log("DB synced");
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Gagal konek database:", err);
    // Tetap jalankan server agar Cloud Run tidak menganggap crash, 
    // tapi nanti akan error saat akses data. Ini lebih aman untuk deployment.
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running with DB error on port ${PORT}`);
    });
  });
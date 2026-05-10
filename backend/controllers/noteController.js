const noteModel = require("../models/noteModel");

// 1. Ambil Semua Catatan
const getAllNotes = async (req, res) => {
  try {
    const notes = await noteModel.findAll();
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 2. Ambil Satu Catatan Berdasarkan ID
const getNoteById = async (req, res) => {
  try {
    const { id } = req.params;
    // Menggunakan findById karena model kamu sepertinya pakai nama itu
    const note = await noteModel.findById(id); 
    
    if (!note) {
      return res.status(404).json({ message: "Catatan tidak ditemukan" });
    }
    
    res.json(note);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 3. Tambah Catatan
const createNote = async (req, res) => {
  try {
    const note = await noteModel.create(req.body);
    res.status(201).json(note);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// 4. Update
const updateNote = async (req, res) => {
  const { id } = req.params;
  try {
    // 1. Cek apakah datanya ada pakai findById (sesuai modelmu)
    const note = await noteModel.findById(id); 
    if (!note) return res.status(404).json({ message: "Not found" });

    // 2. Panggil updateById (SESUAIKAN DENGAN NAMA DI MODEL)
    await noteModel.updateById(id, req.body); 
    
    res.json({ message: "Updated" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 5. Delete
const deleteNote = async (req, res) => {
  const { id } = req.params;
  try {
    const note = await noteModel.findById(id);
    if (!note) return res.status(404).json({ message: "Not found" });

    // Panggil deleteById (SESUAIKAN DENGAN NAMA DI MODEL)
    await noteModel.deleteById(id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
};
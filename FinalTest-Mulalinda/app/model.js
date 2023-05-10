const mongoose = require("mongoose");

const matakuliahSchema = new mongoose.Schema({
    kode_mk: { type: String, required: [true, " Kode matakuliah harus diisi "] },
    nama: { type: String, required: [true, " Nama matakuliah harus diisi "] },
    ruangan: { type: String},
    jam: { type: String},
});

const Matakuliah = mongoose.model("Matakuliah", matakuliahSchema);

module.exports = Matakuliah;

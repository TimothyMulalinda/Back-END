var express = require('express');
var router = express.Router();
const { AllMK, byKode, byNama, postNewMK, delMKbyKode, updateMKbyKode } = require("./controller")

router.get("/matakuliah", AllMK);
router.get("/matakuliah/:kode", byKode);
router.get("/matakuliah?nama=", byNama)
router.post("/matakuliah", postNewMK);
router.delete("/matakuliah/:kode", delMKbyKode);
router.put("/matakuliah/:kode", updateMKbyKode);

module.exports = router;

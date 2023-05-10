const Matakuliah = require("./model")

const AllMK = async (req, res, next) => {
    try{
        const Data = await Matakuliah.find();
        res.json({status: "Success", message: "List MK", data: Data,
        });
    }catch(error){
        res.send({ status: "error", message: error.message });
    }
  };

const byKode = async (req, res, next) => {
    try{
        const Data = await Matakuliah.findOne({kode_mk: req.params.kode});
        res.json({status: "Success", message: "get matakuliah by Kode Matakuliah", data: Data,
        });
    }catch(error){
        res.send({ status: "error", message: error.message });
    }
  };

  const byNama = async (req, res, next) => {
    try{
        const Data = await Matakuliah.find({nama: req.query.nama.toLowerCase()});
        res.json({status: "Success", message: "get matakuliah by nama", data: Data,
        });
    }catch(error){
        res.send({ status: "error", message: error.message });
    }
};

  const postNewMK = async (req, res, next) => {
    try {
      await Matakuliah.insertMany(req.body);
      const result = await User.find();
      res.json({status: "Success", message: "post new matakuliah", data: result,
      });
    } catch (error) {
      res.send({ status: "error", message: error.message})
    }
  };

  const delMKbyKode = async (req, res, next) => {
    try {
      await Matakuliah.deleteOne({kode_mk: req.params.kode});
      const result = await User.find();
      res.json({status: "Success", message: "delete matakuliah by Kode", data: result,
      });
    } catch (error) {
      res.send({ status: "error", message: error.message})
    }
  };

  const updateMKbyKode = async (req, res, next) => {
    try {
      await Matakuliah.updateOne({kode_mk : req.params.kode}, {$set: {nama: req.body.nama, ruangan: req.body.ruangan, jam: req.body.jam}});
      const result = await User.find({kode_mk: req.params.kode});
      res.json({status: "Success", message: "update matakuliah by Kode", data: result,
      });
    } catch (error) {
      res.send({ status: "error", message: error.message})
    }
  };
  
  module.exports = {
    AllMK,
    byKode,
    byNama,
    postNewMK,
    delMKbyKode,
    updateMKbyKode
  };

  
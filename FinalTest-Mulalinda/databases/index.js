const mongoose = require('mongoose');
const { mongoUrl } = require('../config');

mongoose
.connect(mongoUrl)
.then((res) => console.log("success"))
.catch((error) => console.log("failed : ", error.message));
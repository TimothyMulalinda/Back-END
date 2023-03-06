const axios = require("axios")

async function ambilData(){
  try {
    const response = await axios.get("https://jsonplaceholder.typicode.com/users");
    return response.data;
  } catch (error) {
    console.log(error);
    return[];
  }
}
module.exports = ambilData;

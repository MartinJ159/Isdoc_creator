const axios = require("./../../../../utility/axiosConfig");

exports.login = async () => {
  const res = await axios
    .post("/auth/login", {
      username: process.env.ELIS_ROSSUM_USERNAME,
      password: process.env.ELIS_ROSSUM_PASSWORD
    })
    .catch(function(error) {
      // handle error
      console.log("chyba login");
    });
  const token = res.data.key;
  return token;
};

exports.logout = async token => {
  const res = await axios
    .post("/auth/logout", {
      headers: { Authorization: "token " + token }
    })
    .catch(function(error) {
      // handle error
      console.log("chyba logout");
    });
};

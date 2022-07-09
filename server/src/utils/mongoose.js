"use strict";
exports.__esModule = true;
exports.DBConnect = void 0;
var mongoose_1 = require("mongoose");
var DBConnect = function () {
  return new Promise(function (resolve, reject) {
    mongoose_1["default"].connect(
      "mongodb+srv://trantrungtien:Matkhau12345@cluster0.mlapa.mongodb.net/douyin?retryWrites=true&w=majority",
      { useNewUrlParser: true, useUnifiedTopology: true },
      function (error) {
        if (error) {
          console.log({ error: error });
          reject(error);
        } else {
          console.log("Connect to MongoDb Successfully");
          resolve(true);
        }
      }
    );
  });
};
exports.DBConnect = DBConnect;

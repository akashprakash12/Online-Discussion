var db = require("../config/connection");
var collection = require("../config/collection");
var bcrypt = require("bcrypt");
var axios = require("axios");
const { resolve, reject } = require("promise");

module.exports = {
//inser user to db (user registration)
    DoSignup: (data) => {
        return new Promise(async (resolve, reject) => {
            var fetch = await db
                .get()
                .collection(collection.Collection)
                .findOne({ email: data.email })
                .then(data);

            if (fetch) {
              
                reject("user exist");
            } else {
                
                data.password = await bcrypt.hash(data.password, 10);
                db.get().collection(collection.Collection).insertOne(data).then(data);
                resolve(data);
            }
        });
    },

   
//========== for check user exist or not =======================
    Dologin: (logindata) => {
        return new Promise(async (resolve, reject) => {
            let loginStatus = false;
            let response = {};

            var fetch = await db
                .get()
                .collection(collection.Collection)
                .findOne({ email: logindata.email },{ projection:{RePassword:0}});
            if (fetch) {
                bcrypt.compare(logindata.password, fetch.password).then((status) => {
                    if (status) {
                        response.user = fetch;
                        response.status = true;
                        resolve(response);
                    } else {
                        console.log("login failed");
                        resolve({ status: false });
                    }
                });
            } else {
               console.log(fetch);
                resolve({ status: false });
            }
        });
    }
  
};

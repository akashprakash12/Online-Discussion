var db = require("../config/connection");
var collection = require("../config/collection");
var bcrypt = require("bcrypt");
var axios = require("axios");
const { resolve, reject } = require("promise");

module.exports = {
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

            // callback(data.ops[0]._id);
        });
    },

    // checkUser:(data)=>{
    //     return new Promise(async(resolve,reject)=>{
    //  var fetch=await db.get().collection(collection.Collection).findOne({email:data.email}).then((data))
    //  if (fetch) {
    //      resolve(fetch)
    //     console.log("user alradi exist");

    // }else{
    //     console.log("do sign up");
    // }

    //     })

    // },

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

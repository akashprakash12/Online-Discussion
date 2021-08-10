var db = require("../config/connection");
var collection = require("../config/collection");
const { reject } = require("promise");
const mongoobjid = require("mongodb").ObjectID;
module.exports = {
    RetriveReportedToAdmin: () => {
        return new Promise(async (resolve, reject) => {
            await db
                .get()
                .collection(collection.Answer)
                .find(
                    {},
                    { projection: { report: 1, like: 1, dislike: 1, UserAnswer: 1, Answercode: 1 } }
                )
                .toArray()
                .then((response) => {
                    for (let index = 0; index < response.length; index++) {
                        const reported = response[index].report;
                        const liked = response[index].like;
                        const disliked = response[index].dislike;
                        if (reported >= 10 || liked >= 50 || disliked >= 30) {
                            var details = response[index];
                            resolve(details);
                        }
                    }
                });
        });
    },

    ReportDelete: (id) => {
        return new Promise((resolve, reject) => {
            db.get()
                .collection(collection.Answer)
                .deleteOne({ _id: mongoobjid(id) })
                .then((data) => {
                    console.log(data);
                    resolve(id);
                });
        });
    },
    deleteuser:(id)=>{
        return new Promise(async (resolve, reject) => {
            db.get().collection(collection.Collection).deleteOne({_id:mongoobjid(id)}).then((data)=>{
                console.log("user deleted");
            })
        })
    },

    retriveLikedToAdmin: () => {
        return new Promise(async (resolve, reject) => {
            await db
                .get()
                .collection(collection.Answer)
                .find({}, { projection: { like: 1, UserAnswer: 1, Answercode: 1 } })
                .toArray()
                .then((response) => {
                    var count = 10;
                    for (let index = 0; index < response.length; index++) {
                        const element = response[index].like;
                        if (element >= count) {
                            var details = response[index];
                            resolve(details);
                        }
                    }
                });
        });
    },
};

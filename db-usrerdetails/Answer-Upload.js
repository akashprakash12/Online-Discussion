var db = require("../config/connection");
var collection = require("../config/collection");
const { resolve, reject } = require("promise");
const { Question } = require("../config/collection");
const mongoobjid = require("mongodb").ObjectID;

module.exports = {
    insertData: (Answer) => {
        return new Promise(async (resolve, reject) => {
            status = {
                error: "error",
            };
            if (Answer.answercode == "" || Answer.answer == "") {
                reject(status);
            } else {
                await db
                    .get()
                    .collection(collection.Answer)
                    .insertOne(Answer)
                    .then((Answer) => {
                        resolve(Answer.ops[0]);
                    });
            }
        });
    },
    inserLikeDislikeReport: (id, data) => {
        var like = data.like;
        var dislike = data.dislike;
        var report = data.report;
        return new Promise(async (resolve, reject) => {
            await db
                .get()
                .collection(collection.Answer)
                .updateOne(
                    { _id: mongoobjid(id) },
                    { $set: { like: like, dislike: dislike, report: report } }
                )
                .then((resp) => {
                   
                });
        });
    },
};

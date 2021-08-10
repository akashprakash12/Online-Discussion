var db = require("../config/connection");
var collection = require("../config/collection");
const { resolve, reject } = require("promise");

module.exports = {
    RetriveQuestion: () => {
        return new Promise(async (resolve, reject) => {
            await db
                .get()
                .collection(collection.Question)
                .find(
                    {},
                    {
                        projection: {
                            code: 1,
                            userdata: { email: 1, _id: 1, Username: 1 },
                            Answercode: 1,
                            UserAnswer: { _id: 1, Username: 1 },
                        },
                    }
                )
                .toArray()
                .then((respons) => {
                    resolve(respons);
                });
        });
    },
    RetriveAnswer: () => {
        return new Promise(async (resolve, reject) => {
            await db
                .get()
                .collection(collection.Answer)
                .find(
                    {},
                    {
                        projection: {
                            Answercode: 1,
                            UserAnswer: { _id: 1, Username: 1 },
                            like: 1,
                            dislike: 1,
                            report: 1,
                        },
                    }
                )
                .toArray()
                .then((respons) => {
                    resolve(respons);
                });
        });
    },
};

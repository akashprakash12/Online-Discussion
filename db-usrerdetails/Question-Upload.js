var db = require("../config/connection");
var collection=require('../config/collection');
const { resolve, reject } = require("promise");
const { Question, QuestionAnswer } = require("../config/collection");


module.exports={
    insertData:(Question)=>{
        return new Promise(async(resolve,reject)=>{
        status={
            error:"error"
        }
            if (Question.code==''|| Question.question=="") {
                reject(status)
            } else {
                  await db.get().collection(collection.Question).insertOne(Question).then((Question)=>{ 
                    resolve(Question.ops[0]) 
                })
            }
        })

    }
}
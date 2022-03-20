const mongoClient = require( 'mongodb' ).MongoClient;
const dotenv = require("dotenv")
dotenv.config()

let mongodb;

function connect(callback){
  mongoClient.connect(process.env.MONGO_URL,  { useNewUrlParser: true }, function( error, client ){
      mongodb = client.db('9Game');
      callback();
  });
}

function get(){
  return mongodb;
}


function close(){
  mongodb.close();
}

module.exports = {
  connect,
  get,
  close
};



// module.exports = {

//   connectToServer: function( callback ) {
//     MongoClient.connect( process.env.MONGO_URL,  { useNewUrlParser: true }, function( error, client ) {
//       _db  = client.db('9Game');
//       return callback( error );
//     } );
//   },

//   getDb: function() {
//     return _db;
//   }
// };
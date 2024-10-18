var express = require('express');
var router = express.Router();

var PROTO_PATH = __dirname + '/../../grpc-node/proto/books.proto';
var grpc = require('@grpc/grpc-js');
var protoLoader = require('@grpc/proto-loader');
var packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });
var protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
var bookPackage = protoDescriptor.bookPackage;

const bookClient = new bookPackage.Book('localhost:8081', grpc.credentials.createInsecure());

/* GET home page. */
router.get('/', function(req, res, next) {
  const book = {
    title: "Some very real title",
    author: "Some very real author",
    content: "Some very real content",
    trace: {
      traceId: req.traceId
    },
  }
  console.log('GET / successful -- traceId: ' + req.traceId);

  bookClient.CreateBook(book, function(err, data) {
    if(err) {
        console.log(err);
        res.send('Big time error');
    } else {
        res.send('Created book: ' + JSON.stringify(data));
    }
  });
});

module.exports = router;

var PROTO_PATH = __dirname + '/proto/books.proto';
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

const server = new grpc.Server();

let books = []

server.addService(bookPackage.Book.service,
  {
      "CreateBook": createBook,
      "GetAllBooks": getAllBooks,
      "GetBook": getBook,
      "UpdateBook": updateBook,
      "DeleteBook": deleteBook
  });

function createBook(call) {
  console.log("Call received -- CreateBook");
  const book = call.request;
  console.log("trace: " + book.trace.traceId);
  bookItem = {
    id: books.length + 1,
    author: book.author,
    title: book.title,
    content: book.content
  }
  books.push(bookItem);
  call.write(bookItem);
  call.end();
}

function getAllBooks(call) {

}

function getBook(call) {

}

function updateBook(call, callback) {

}

function deleteBook(call, callback) {

}

server.bindAsync("localhost:8081", grpc.ServerCredentials.createInsecure(), (error, port) => {
  server.start();
  console.log(`listening on port ${port}`);
});
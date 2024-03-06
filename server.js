const Express = require("express");
const Multer = require("multer");
const Minio = require("minio");
const cors = require("cors");
const app = Express();

app.use(Express.urlencoded({ extended: true, limit: "50mb" }));
app.use(Express.json({ limit: "50mb" }));

app.use(
  cors({
    origin: "*",
    exposedHeaders: "content-length",
    credentials: true,
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Origin",
      "X-Requested-With",
      "Accept",
      "Accept-Encoding",
      "Accept-Language",
      "Host",
      "Referer",
      "User-Agent",
      "X-CSRF-Token",
    ],
    maxAge: 86400,
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);

const minioClient = new Minio.Client({
  endPoint: "localhost",
  port: 9000,
  useSSL: false,
  accessKey: "ORliQ7CPImFIzypOf3gC",
  secretKey: "RjBmBkhlsMuVMQhaVFBNNONFtQl6wy7Ki6rpIhim",
});

const BUCKET_NAME = "sobee-bucket";

app.post(
  "/upload",
  Multer({ storage: Multer.memoryStorage() }).single("upload"),
  function (request, response) {
    minioClient.putObject(
      BUCKET_NAME,
      request.file.originalname,
      request.file.buffer,
      function (error, etag) {
        if (error) {
          return console.log(error);
        }
        response.send(request.file);
      }
    );
  }
);

app.post(
  "/uploadfile",
  Multer({ dest: "./uploads/" }).single("upload"),
  function (request, response) {
    minioClient.fPutObject(
      BUCKET_NAME,
      request.file.originalname,
      request.file.path,
      { "Content-Type": request.file.mimetype },
      function (error, etag) {
        if (error) {
          return console.log(error);
        }
        response.send(request.file);
      }
    );
  }
);

app.get("/download", function (request, response) {
  minioClient.getObject(
    "sobee-bucket",
    request.query.filename,
    function (error, stream) {
      if (error) {
        return response.status(500).send(error);
      }
      stream.pipe(response);
    }
  );
});

minioClient.bucketExists(BUCKET_NAME, function (error) {
  if (error) {
    return console.log(error);
  }
  const server = app.listen(3000, function () {
    console.log("Listening on port %s...", server.address().port);
  });
});

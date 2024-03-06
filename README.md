# Express Minio

This is a simple example of how to use Minio with Express.

> Minio is a high performance distributed object storage server, designed for large-scale private cloud infrastructure.
> It is compatible with Amazon S3 cloud storage service.
> It is best suited for storing unstructured data such as photos, videos, log files, backups and container / VM images.
> Size of an object can range from a few KBs to a maximum of 5TB.
> Minio is designed in a cloud-native manner to scale sustainably in multi-tenant environments.

## Before you start

- Follow the instructions by Thuan Bui on [Tạo Object Storage Server với MinIO + Docker](https://thuanbui.me/tao-object-storage-server-voi-minio-docker/)

## How to use

1. Clone this repository
2. Run `npm install`
3. Run `npm start` or `npm run dev` for development
4. Using Postman or Insomnia to make requests to the server
5. Enjoy!

## Available routes

### POST /upload

![POST /upload](/assets/postman-upload.png)

### GET /download

![GET /download](/assets/postman-download.png)

## Sample load file to web page

```html
<img
  src="http://localhost:3000/download?filename=Group.png"
  width="100"
  height="100"
/>
```

- `3000` is the port of the server.
- The `filename` query parameter is the name of the file you want to load to the webpage that you uploaded to Minio.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

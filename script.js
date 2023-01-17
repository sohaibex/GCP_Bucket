const { Storage } = require('@google-cloud/storage');

const storage = new Storage();

const bucketName = 'first-tp-bucket';
const fileName = './img/gumball.jpg';
const fileNameBucket = 'gumball.jpg';

async function createBucket() {
    await storage.createBucket(bucketName);
    console.log(`Bucket ${bucketName} created.`);
}

async function uploadImage() {
    await storage.bucket(bucketName).upload(fileName, {
        gzip: true,
        metadata: {
            cacheControl: 'public, max-age=31536000',
        },
    });

    console.log(`${fileName} uploaded to ${bucketName}.`);
}


// Download an image from the bucket
async function downloadImage() {
    await storage
        .bucket(bucketName)
        .file(fileNameBucket)
        .download({ destination: 'C:/Users/sohai/OneDrive/Bureau/fg/image-downloaded.jpg' });

    console.log(`${fileNameBucket} downloaded from ${bucketName}.`);
}
createBucket();
uploadImage();
downloadImage()
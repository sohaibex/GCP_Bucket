const { Storage } = require('@google-cloud/storage');
const storage = new Storage();

const bucketName = 'first-tp-bucket';
const fileName = 'gumball.jpg';
const headerDict = {
    "origin": ['*'],
    "responseHeader": ["X-Requested-With", "Access-Control-Allow-Origin", "Content-Type"],
    "method": ["GET", "HEAD", "DELETE", "OPTIONS"],
    "maxAgeSeconds": 3600
}

const requestOptions = {
    headers: new Headers(headerDict),
};
function fetchImageMetadata() {
    storage
        .bucket(bucketName)
        .getFiles()
        .then(results => {
            console.log(results)
            const files = results[0];
            files.forEach(file => {
                console.log(file.name);
            });
        })
        .catch(err => {
            console.error('ERROR:', err);
        });
}

async function displayImage() {
    const metadata = await fetchImageMetadata();
    console.log("Meta", metadata);
    const container = document.getElementById('image-container');

    const image = document.createElement('img');
    image.src = `https://storage.cloud.google.com/${bucketName}/${fileName}`;
    container.appendChild(image);

    const metadataList = document.createElement('ul');
    for (const [key, value] of Object.entries(metadata)) {
        const item = document.createElement('li');
        item.textContent = `${key}: ${value}`;
        metadataList.appendChild(item);
    }
    container.appendChild(metadataList);
}




displayImage();







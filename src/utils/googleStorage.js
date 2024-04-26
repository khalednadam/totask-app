const config = require('../config/config');
const { Storage } = require('@google-cloud/storage');

const storage = new Storage({
  projectId: config.GC_ID,
  keyFilename: config.GC_KEYFILE,
});
const bucket = storage.bucket(config.GC_BUCKET);

/**
 * Uploads a file to Google Cloud Storage.
 * @param {string} filename - The name of the file to be uploaded.
 * @param {Buffer} fileBuffer - The buffer containing the file data.
 * @returns {Promise<string>} A Promise that resolves to the URL of the uploaded file on success.
 * @throws {Error} Throws an error if there is an issue with the upload process.
 */
const uploadToGoogleStorage = async (filename, fileBuffer) => {
  const timeStamp = new Date();
  const blob = bucket.file(`${timeStamp}-${filename}`);
  const blobStream = blob.createWriteStream();
  return new Promise((resolve, reject) => {
    // Error handling for the stream
    blobStream.on('error', (error) => {
      console.error("Error uploading to blob:", error);
      reject(error); // Reject the Promise if an error occurs
    });

    // Event listener for when the upload finishes
    blobStream.on('finish', () => {
      resolve(`https://storage.googleapis.com/${bucket.name}/${blob.name}`);
    });

    // Ensure fileBuffer is not empty before writing to blobStream
    if (fileBuffer && fileBuffer.length > 0) {
      // Write the fileBuffer data to the blobStream
      blobStream.end(fileBuffer, () => {
        // Additional handling after the file upload completes, if needed
      });
    } else {
      // Reject Promise if fileBuffer is empty or invalid
      const error = new Error("File buffer is empty or invalid");
      console.error(error);
      reject(error);
    }
  });
};

const deleteFileFromGoogleStorage = async (fileLink) => {
  // Split the URL by '/'
  const parts = fileLink.split('/');
  // The last part should be the filename
  const filename = parts.pop();
  const file = bucket.file(filename);
  await file.delete();
};

/**
 * Uploads multiple files to Google Cloud Storage.
 * @param {Array<{filename: string, fileBuffer: Buffer}>} files - An array of objects, each containing filename and fileBuffer.
 * @returns {Promise<Array<string>>} A Promise that resolves to an array of URLs of the uploaded files on success.
 * @throws {Error} Throws an error if there is an issue with the upload process.
 */
const uploadMultipleToGoogleStorage = async (files) => {
  const uploadPromises = files.map(async ({ originalname, buffer }) => {
    const timeStamp = new Date();
    const blob = bucket.file(`${timeStamp}-${originalname}`);
    const blobStream = blob.createWriteStream();

    return new Promise((resolve, reject) => {
      blobStream.on('error', (error) => {
        console.error("Error uploading to blob:", error);
        reject(error);
      });

      blobStream.on('finish', () => {
        resolve(`https://storage.googleapis.com/${bucket.name}/${blob.name}`);
      });

      if (buffer && buffer.length > 0) {
        blobStream.end(buffer);
      } else {
        const error = new Error("File buffer is empty or invalid");
        console.error(error);
        reject(error);
      }
    });
  });

  return Promise.all(uploadPromises);
};

module.exports = { uploadToGoogleStorage, deleteFileFromGoogleStorage, uploadMultipleToGoogleStorage } 

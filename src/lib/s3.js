'use strict';

import fs from 'fs-extra';

const s3Upload = (path, key) => {
  const aws = require('aws-sdk');
  const amazonS3 = new aws.S3();
  const uploadOptions = {
    Bucket: process.env.AWS_BUCKET,
    Key: key,
    ACL: 'public-read',
    Body: fs.createReadStream(path), // TODO: fs function unresolved
  };

  return amazonS3.upload(uploadOptions)
    .promise() // this calls the internal callback of the .upload method
    .then((response) => {
      console.log(response, 'response from s3');
      return fs.remove(path)
        .then(() => response.Location)
        .catch(err => Promise.reject(err));
    })
    .catch((err) => {
      return fs.remove(path)
        .then(() => Promise.reject(err))
        .catch(fsErr => Promise.reject(fsErr));
    });
};


// TODO: adding s3 getObject method for http GET route.
const s3Get = (key) => {
  const aws = require('aws-sdk');
  const amazonS3 = new aws.S3();
  const getOptions = {
    Bucket: process.env.AWS_BUCKET,
    Key: key,
  };

  return amazonS3.getObject(getOptions)
    .promise()
    .then((data) => {
      console.log(data, 'SUCCESSFUL GET OBJECT FROM S3 BUCKET');
    })
    .catch((err) => {
      Promise.reject(err);
    });


}

const s3Remove = (key) => {
  const aws = require('aws-sdk');
  const amazonS3 = new aws.S3();
  const removeOptions = {
    Key: key,
    Bucket: process.env.AWS_BUCKET,
  };

  return amazonS3.deleteObject(removeOptions) // TODO: this could be an issue...
    .promise()
    .then((data) => {
      console.log(data, 'SUCCESSFUL DELETION');
    })
    .catch((err) => {
      Promise.reject(err);
    });
};

export { s3Upload, s3Get, s3Remove };

exports.GetBankruptList = (req, res, next) => {

  console.log('GetBankruptList /API id:' + req.params.id);

  res.status(200).json({
        message:  "APISuccessfully!",
        // result: result.recordset
      });

}

exports.encodingBase64 = (req, res, next) => {

  console.log('encodingBase64 /API data:' );


  encodingBase64(req.body.data).then(result =>{
    res.status(200).json({
      message:  "Successfully!",
      result: result
    });

  },err=>{
    res.status(400).json({
      message:  "Was error" + err,
    });
  });

}

exports.decodingBase64 = (req, res, next) => {
  // console.log('decodingBase64 /API data:' );
  decodingBase64(req.body.data).then(result =>{
    res.status(200).json({
      message:  "Successfully!",
      result: result
    });

  },err=>{
    res.status(400).json({
      message:  "Was error" + err,
    });
  });
}

exports.nodeRSA = (req, res, next) => {

  console.log('nodeRSA /API :' );

  nodeRSA().then(result =>{
    res.status(200).json({
      message:  "Successfully!",
      result: result
    });

  },err=>{
    console.log(err);
    res.status(400).json({
      message:  "Was error" + err,
    });
  });
}

exports.crypto = (req, res, next) => {

  console.log('crypto /API :' );

  crypto().then(result =>{
    res.status(200).json({
      message:  "Successfully!",
      result: result
    });

  },err=>{
    console.log(err);
    res.status(400).json({
      message:  "Was error" + err,
    });
  });
}

exports.encrypLEDpub = (req, res, next) => {
  console.log('encrypLEDpub /API :' );
  const toEncrypt = req.body.data;

  encrypLEDpub(toEncrypt).then(result =>{
    res.status(200).json({
      message:  "Successfully!",
      result: result
    });

  },err=>{
    console.log(err);
    res.status(400).json({
      message:  "Was error" + err,
    });
  });
}
exports.decryptLEDPrivate = (req, res, next) => {
  console.log('decryptLEDPrivate /API :' );
  const toDecrypt = req.body.data;

  decryptLEDPrivate(toDecrypt).then(result =>{
    res.status(200).json({
      message:  "Successfully!",
      result: result
    });

  },err=>{
    console.log(err);
    res.status(400).json({
      message:  "Was error" + err,
    });
  });
}



// *************************************
function encodingBase64(data){
  console.log(' fnc encodingBase64() ' + data);
  return new Promise(function(resolve, reject) {
    // let buff = new Buffer(data);
    let buff = new Buffer.from(data);
    let base64data = buff.toString('base64');
    resolve(base64data);
  });
}

function decodingBase64(data){
  console.log(' fnc decodingBase64() ' + data);
  return new Promise(function(resolve, reject) {

  let buff = new Buffer.from(data, 'base64');
  let text = buff.toString('ascii');
  resolve(text);

  });
}


// // Encoding Binary Data to Base64 Strings
// const fs = require('fs');

// let buff = fs.readFileSync('stack-abuse-logo.png');
// let base64data = buff.toString('base64');

// console.log('Image converted to base 64 is:\n\n' + base64data);

// // Decoding Base64 Strings to Binary Data

// 'use strict';

// const fs = require('fs');

// let data = 'xvxvvvd';
// let buff = new Buffer(data, 'base64');
// fs.writeFileSync('stack-abuse-logo-out.png', buff);

// console.log('Base64 image data converted to file: stack-abuse-logo-out.png');


//https://www.npmjs.com/package/node-rsa
function nodeRSA(){

  console.log('Welocme nodeRSA()');

  return new Promise(function(resolve, reject) {

    const NodeRSA = require('node-rsa');
    const key = new NodeRSA({b: 512});
    
    const text = 'Hello RSA!';
    const encrypted = key.encrypt(text, 'base64');
    console.log('encrypted: ', encrypted);
    const decrypted = key.decrypt(encrypted, 'utf8');
    console.log('decrypted: ', decrypted);

    resolve('nodeRSA successful.');

  })
}

function crypto(){
  console.log('Welcome crypto()');
  return new Promise(function(resolve, reject) {

    const crypto = require('crypto');

const secret = 'abcdefg';
const hash = crypto.createHmac('sha256', secret)
                   .update('I love cupcakes')
                   .digest('hex');

    resolve('crypto successful.>>' +hash );

  });
}


function encrypLEDpub(toEncrypt) {
  console.log('Welcome encrypLEDpub()' + toEncrypt);
  return new Promise(function(resolve, reject) {

    var crypto = require("crypto");
    var path = require("path");
    var fs = require("fs");
    try{

      var relativeOrAbsolutePathToPublicKey ='backend/controllers/certs/my-server.pub'
      var absolutePath = path.resolve(relativeOrAbsolutePathToPublicKey);
      var publicKey = fs.readFileSync(absolutePath, "utf8");
      var buffer = Buffer.from(toEncrypt);
      var encrypted = crypto.publicEncrypt(publicKey, buffer);
      resolve( encrypted.toString("base64"));
    }catch(e){
      reject(e)
    }

  });
}

function decryptLEDPrivate(toDecrypt) {
  console.log('Welcome decryptLEDPrivate()' + toDecrypt);
  return new Promise(function(resolve, reject) {

    var crypto = require("crypto");
    var path = require("path");
    var fs = require("fs");

    try {
      
      var relativeOrAbsolutePathToPublicKey ='backend/controllers/certs/my-server.key.pem'
      var absolutePath = path.resolve(relativeOrAbsolutePathToPublicKey);
      var privateKey = fs.readFileSync(absolutePath, "utf8");
      var buffer = Buffer.from(toDecrypt, "base64");
      var decrypted = crypto.privateDecrypt(privateKey, buffer);

      resolve(decrypted.toString("utf8"));
    }
    catch (e) {
      reject(e)
    }


    

  });
}
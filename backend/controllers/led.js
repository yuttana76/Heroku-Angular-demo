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

exports.encryptURSA = (req, res, next) => {

  console.log('encryptURSA /API data:' );

  encryptURSA().then(result =>{
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


function encryptURSA(){

  return new Promise(function(resolve, reject) {

// openssl genrsa -out certs/my-server.key.pem 2048
// openssl rsa -in certs/my-server.key.pem -pubout -out certs/my-server.pub

'use strict';

var fs = require('fs')
  , ursa = require('ursa')
  , crt
  , key
  , msg
  ;

key = ursa.createPrivateKey(fs.readFileSync('./certs/my-server.key.pem'));
crt = ursa.createPublicKey(fs.readFileSync('./certs/my-server.pub'));

console.log('Encrypt with Public');
msg = crt.encrypt("Everything is going to be 200 OK", 'utf8', 'base64');
console.log('encrypted', msg, '\n');

console.log('Decrypt with Private');
msg = key.decrypt(msg, 'base64', 'utf8');
console.log('decrypted', msg, '\n');

console.log('############################################');
console.log('Reverse Public -> Private, Private -> Public');
console.log('############################################\n');

console.log('Encrypt with Private (called public)');
msg = key.privateEncrypt("Everything is going to be 200 OK", 'utf8', 'base64');
console.log('encrypted', msg, '\n');

console.log('Decrypt with Public (called private)');
msg = crt.publicDecrypt(msg, 'base64', 'utf8');
console.log('decrypted', msg, '\n');

  });
}

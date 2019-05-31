
// https://stackabuse.com/how-to-start-a-node-server-examples-with-the-most-popular-frameworks/

const fs = require('fs');

exports.GetVDO1 = (req, res, next) => {

  console.log('GetVDO1 /API ' + __dirname);

  // Set a response type of mp4 video for the response
  res.writeHead(200, {'Content-Type': 'video/mp4'});

  // Read the video into a stream

  let vidstream = fs.createReadStream(__dirname+'/vdo/video-1.mp4');

  // Pipe our stream into the response
  vidstream.pipe(res);

}

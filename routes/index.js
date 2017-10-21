const uuid = require('uuid/v1');
const qr = require('qr-image');
const fs = require('fs');
require('dotenv').config()

/* GET top page. */
let index = function(req, res, next) {
  let uniq    = uuid()
  let date    = new Date()
  let year    = String(date.getFullYear())
  let month   = ('0' + (date.getMonth() + 1)).slice(-2)
  let sec     = ('0' + date.getDate()).slice(-2)
  let suffix  = year + month + sec
  let name    = suffix + '-' + uniq + '.png'
  let qrPath  = 'public/images/qr/'
  let qrImage = qr.image(process.env.URL + uniq, { type: 'png' });
  
  qrImage.pipe(fs.createWriteStream(qrPath + name));
  
  // Search image
  fs.readdir(qrPath, function(err, files){
    if (err) throw err;

    // Delte PR image
    files.forEach(function(file) {
      if (!file.match(suffix) && !file.match(/\.keep/)) {
        console.log(file);
        fs.unlink(qrPath + file, function (err) {});
      }
    }, this);

  });

  res.cookie('uuid', uniq)
  res.render('index', {
    uniq_id:  uniq,
    pr_image: name
  });

}

module.exports = index
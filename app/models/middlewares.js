const multer = require('multer');
// var upload = multer({dest:'uploads/'})


const storage = multer.diskStorage({
    //cb call back function
    destination: function (req, file, cb) {
      // make uploads folder to store img
      cb(null, '../app/uploads');
      //cb(null, path.join(__dirname, '/uploads/'));
  
    },
    filename: function (req, file, cb) {
      // cb(null,  Date.now()+file.originalname);
      cb(null, Date.now() + file.originalname);
    }
  });



  const fileFilter = (req, file, cb) => {
    //file not accept if this false
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      //accept
      cb(null, true);
    }
    else {
      //reject
      cb(null, false);
    }
  }


const upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
  })

  module.exports.upload = upload; 
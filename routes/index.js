var express = require('express');
var fs = require('fs');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Connective Unconscious' });
});

function serve_photo_album(album_name, display_name) {
  // Parse photo list
  var photo_array = new Array();
  // read the ordered list of photos
  var text = fs.readFileSync(`./public/${album_name}/list.txt`, 'utf-8');
  photo_array = text.trim().split('\n');

  router.get(`/${album_name}/`, function(req, res, next) {
    var image = req.query['image'];
    if (!image) {
      res.redirect(`/${album_name}/?image=0`);
      return;
    }
    var photo_id = 0;
    if ((image >= 0) && (image < photo_array.length)) {
      photo_id = Number(image);
    }
    var last_id = (photo_id-1)>=0 ? photo_id-1 : photo_array.length-1;
    var next_id = (photo_id+1)==photo_array.length ? 0 : photo_id+1; 
    // draw the image page
    res.render('photo_album', { 
      album: album_name,
      title: display_name,
      photo: photo_array[photo_id],
      photo_id: photo_id,
      last_id: last_id,
      next_id: next_id});
  });
};

serve_photo_album('nihonnoyume', '日本の夢');
serve_photo_album('jikannoyume', '時間の夢');

module.exports = router;

const express = require('express');
const fs = require('fs');

const router = express.Router();

router.get('/video', function(req, res) {
  const path = 'assets/Laundry.mp4'
  const stat = fs.statSync(path)
  const fileSize = stat.size
  const range = req.headers.range
  if (range) {
    const parts = range.replace(/bytes=/, "").split("-")
    const start = parseInt(parts[0], 10)
    const end = parts[1] 
      ? parseInt(parts[1], 10)
      : fileSize-1
    const chunksize = (end-start)+1
    const file = fs.createReadStream(path, {start, end})
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'video/mp4',
    }
    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4',
    }
    res.writeHead(200, head)
    fs.createReadStream(path).pipe(res)
  }
});


router.get('/metadata', function(req, res) {
//    res.setHeader("Access-Control-Allow-Origin", "*")
//    const head = {
//      'Content-Type': 'application/json',
//      'Access-Control-Allow-Origin' : '*'
//    }
//    res.writeHead(200, head)
    res.json({ 
      symbol: "&",
      name: "ampersand",
      image: "link",
      seller_fee_basis_points: 10,
      properties: {
        creators: [
          { 
            address: '2325jgjdfhgf84y87yfwefh84f8g7wfg4whitgw',
            share: 50
          },
          { 
            address: '2325jgjdfhgf84y87yfwefh84f8g7wfg4whitgw',
            share: 50
          }
        ]
      }
    })
});

module.exports = router;

// import data from "../data/inventory.json";
var express = require('express');
var router = express.Router();
const { v4: uuid } = require('uuid');

var data = [
  {
    "id": uuid(),
    "itemName": "Parachutes",
    "description": "\"Parachutes\" is the debut studio album by British rock band Coldplay. It was released on 10 July 2000 by Parlophone in the United Kingdom. The album was produced by the band and British record producer Ken Nelson, except for one track, \"High Speed\", which was produced by Chris Allison. Parachutes has spawned the singles \"Shiver\", \"Yellow\", \"Trouble\", and \"Don't Panic\".",
    "price": 10.99,
    "imageURL": "https://m.media-amazon.com/images/I/61XGRcPbr4L._UF1000,1000_QL80_.jpg"
  },
  {
    "id": uuid(),
    "itemName": "A Sky Full of Stars",
    "description": "\"A Sky Full of Stars\" is a song by the British rock band Coldplay. It was released in May 2014 as the second single from their sixth album, Ghost Stories (2014). An exclusive digital EP version of it, with the B-sides \"All Your Friends\", \"Ghost Story\" and \"O (Reprise)\", came out in the following weeks, being considered the band's eleventh extended play.",
    "price": 19.99,
    "imageURL": "https://upload.wikimedia.org/wikipedia/en/8/8d/Coldplay_-_A_Sky_Full_of_Stars_%28Single%29.png"
  },
  {
    "id": uuid(),
    "itemName": "A Rush of Blood to the Head",
    "description": "A Rush of Blood to the Head is the second studio album by British rock band Coldplay. It was released on 26 August 2002 by Parlophone in the United Kingdom, and a day later by Capitol Records in the United States. The album was produced by the band and Ken Nelson, and makes greater use of the electric guitar and piano than its predecessor.",
    "price": 29.99,
    "imageURL": "https://upload.wikimedia.org/wikipedia/en/6/60/Coldplay_-_A_Rush_of_Blood_to_the_Head_Cover.png"
  }
]

/* GET users listing. */
router.get('/', function(req, res, next) {
  return res.send(data);
});

router.post('/newItem', function (req, res, next) {
  const newItem = {
    id: uuid(),
    itemName: req.body.itemName,
    description: req.body.description,
    price: req.body.price,
    imageURL: req.body.imageURL
  };
  data.push(newItem);
  return res.send(newItem);
});

router.delete('/:id', function (req, res, next) {
  const itemId = req.params.id;
  const foundItem = data.find(item => item.id === itemId);
  if (foundItem) {
    data = data.filter(item => item.id !== itemId);
    return res.send(foundItem);
  } else {
    return res.status(404).send({ message: 'item not found, cannot delete' });
  }
});

router.patch('/:id', function (req, res, next) {
  const itemId = req.params.id;
  const updatedItem = req.body;
  const foundItem = data.find(item => item.id === itemId);
  if (foundItem) {
    data = data.map((item) => {
      if (item.id === itemId) {
        return {...item, ...updatedItem};
      } else {
        return item;
      }
    });
    return res.send({...foundItem, ...updatedItem});
  } else {
    return res.status(404).send({ message: 'item not found, cannot update' });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router({mergeParams: true});
const webPush = require('web-push');

const vapidKeys = webPush.generateVAPIDKeys();
webPush.setVapidDetails(
  'mailto:test@gmail.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

// 1. service-worker의 pushManager가 Registration을 하기 위한  키를 받아오는 GET
router.get('/key', (req, res) => {
  console.log(`publick key sent: ${vapidKeys.publicKey}`);
  res.send({
      key: vapidKeys.publicKey
  });
});

// 2. 구독 POST
const temp_subs = [];
router.post('/subscribe', (req, res) => {
  temp_subs.push(req.body.subscription);
  console.log(`subscribed : ${JSON.stringify(req.body.subscription)}`);
  res.send('Subscribed');
});

// 3. 등록된 service-worker들에게 푸시를 보내는 POST
router.post('/notify', (req, res) => {
  console.log(`-------------------------------------------`);
  console.log(`notify requested : ${JSON.stringify(req.body)}`);
  let payload = {};
  payload.title = req.body.title;
  payload.message = req.body.message;

  for(const subs of temp_subs){
    webPush.sendNotification(subs, JSON.stringify(payload))
      .then( (response) => {
          console.log('sent notification');
          res.sendStatus(201);
      }).catch( (err) => {
          console.error(`notification error : ${err}`);
      });
  }
});

module.exports = router;

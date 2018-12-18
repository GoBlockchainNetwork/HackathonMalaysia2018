const FCM = require('fcm-node');
const serverKey = ''; //put your server key here
const fcm = new FCM(serverKey);

var message = {
// this may vary according to the message type (single
// recipient, multicast, topic, et cetera)

    to: ,
    collapse_key: 'your_collapse_key',

    notification: {
        title: 'Title of your push notification',
        body: 'Body of your push notification'
    },

    data: {
    // you can send only notification or only
    // data(or include both)
        my_key: 'my value',
        my_another_key: 'my another value'
    }
};

fcm.send(message, function (err, response) {
    if (err) {
        console.log("Something has gone wrong!");
    } else {
        console.log("Successfully sent with response: ", response);
    }
});
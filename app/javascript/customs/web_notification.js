import VAPID from '../shared/vapid.js.erb'

function readyNotification() {
  console.log('Already for push notificaton')
  setup(logSubscription);
}

function setup(onSubscribed) {
  console.log('Setting up push subscription');

  if (!window.PushManager) {
    console.warn('Push messaging is not supported in your browser');
    return
  }

  if (!ServiceWorkerRegistration.prototype.showNotification) {
    console.warn('Notifications are not supported in your browser');
    return;
  }

  if (Notification.permission !== 'granted') {
    Notification.requestPermission(function (permission) {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        console.log('Permission to receive notifications granted!');
        subscribe(onSubscribed);
      }
    });
    return;
  } else {
    console.log('Permission to receive notifications granted!');
    subscribe(onSubscribed);
  }  
}

function subscribe(onSubscribed) {
  navigator.serviceWorker.ready.then((serviceWorkerRegistration) => {
    const pushManager = serviceWorkerRegistration.pushManager
    pushManager.getSubscription()
    .then((subscription) => {
      if (subscription) {
        // refreshSubscription(pushManager, subscription, onSubscribed);
      } else {
        pushManagerSubscribe(pushManager, onSubscribed);
      }
    })
  });
}

function pushManagerSubscribe(pushManager, onSubscribed) {
  console.log('Subscribing started...');
  pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: VAPID.publicKey
  })
  .then(onSubscribed)
  .then(() => { console.log('Subcribing finished: success!') })
  .catch((e) => {
    if (Notification.permission === 'denied') {
      console.warn('Permission to send notifications denied');
    } else {
      console.error('Unable to subscribe to push: ', e);
    }
  });
}

function refreshSubscription(pushManager, subscription, onSubscribed) {
  console.log('Refreshing subscription');
  return subscription.unsubscribe().then((bool) => {
    pushManagerSubscribe(pushManager);
  });
}

function logSubscription(subscription) {
  console.log("Current subscription", subscription.toJSON());
}

function getSubscription() {
  return navigator.serviceWorker.ready
  .then((serviceWorkerRegistration) => {
    return serviceWorkerRegistration.pushManager.getSubscription()
    .catch((error) => {
      console.warn('Error during getSubscription()', error);
    });
  });
}

function sendNotification(message) {
  getSubscription().then((subscription) => {
    console.log(subscription)
    return fetch("/push", {
      headers: formHeaders(),
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({ subscription: subscription.toJSON(), message: message })
    }).then((response) => {
      console.log("Push response", response);
      if (response.status >= 500) {
        console.error(response.statusText);
        alert("Sorry, there was a problem sending the notification. Try resubscribing to push messages and resending.");
      }
    })
    .catch((e) => {
      console.error("Error sending notification", e);
    });
  })
}

function formHeaders() {
  return new Headers({
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'X-CSRF-Token': authenticityToken(),
  });
}

function authenticityToken() {
  return document.querySelector('meta[name=csrf-token]').content;
}

export {
  readyNotification,
  sendNotification,
}
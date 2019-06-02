// Example bot for Hangouts Chat that demonstrates bot-initiated messages
// by spamming the user every minute.
//
// This bot makes use of the Apps Script OAuth2 library at:
//     https://github.com/googlesamples/apps-script-oauth2
//
// Follow the instructions there to add the library to your script.

// When added to a space, we store the space's ID in ScriptProperties.
function onAddToSpace(e) {
  PropertiesService.getScriptProperties()
      .setProperty(e.space.name, '');
  return {
    'text': 'Hi Team 38! I\'ll assign everyone excluding Dillon a reviewer every week. '
  };
}

// When removed from a space, we remove the space's ID from ScriptProperties.
function onRemoveFromSpace(e) {
  PropertiesService.getScriptProperties()
      .deleteProperty(e.space.name);
}

// Add a trigger that invokes this function every minute via the
// "Edit > Current Project's Triggers" menu. When it runs, it will
// post in each space the bot was added to.
function onTrigger() {
  var spaceIds = PropertiesService.getScriptProperties()
      .getKeys();
  var message = { 'text': 'Hi! Here is the reviewer assignment for this week (' + getWeek() + '): \n' + randomAssignment() };
  for (var i = 0; i < spaceIds.length; ++i) {
    postMessage(spaceIds[i], message);
  }
}

// 
function randomAssignment() {
  var name = ['*Aci*', '*Felicia*', '*Klungs*', '*Kezia*'];
  var arr = [0, 1, 2, 3];
  while (!isDerrangement(arr)) {
    shuffle(arr);
  }
  
  var message = "";
  for (var i = 0; i < arr.length; i++) {
    // name[i] review name[arr[i]]
    message += name[i] + " reviews " + name[arr[i]] + "\n";
  }
  
  console.log(message);
  return message;
}

function getWeek() {
 var now = new Date();
 var week0 = new Date("Mon, 13 May 2019 00:01:00");
 var deltaInMilli = now.getTime() - week0.getTime();
  
 // one week in milliseconds
 var one_week=1000*60*60*24*7;
 var deltaInWeek = Math.floor(deltaInMilli / one_week); 
 
 return "Week " + deltaInWeek;
}

function isDerrangement(arr) {
  for (var i = arr.length - 1; i >= 0; i--) {
    if (arr[i] == i) {
      return false;
    }
  }
  return true;
}

function shuffle(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
    [array[i], array[j]] = [array[j], array[i]]; // swap elements
  }
}

var SCOPE = 'https://www.googleapis.com/auth/chat.bot';
// The values below are copied from the JSON file downloaded upon
// service account creation.
var SERVICE_ACCOUNT_PRIVATE_KEY = "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCy+FnNhVbzoR2D\nfDa6Y1dnohw0NCjCOATSI2R4vIEHi4ZjFAOfKWPyMnyJrtVrQFyeDYLEl+jhTqIB\n50+EcfohmGgZz5SBYJAwply6MAnXGYi+uiHP3+UWE0NPPiR2G9LPoz+xhwMuu34f\nDs1Dg0vbenvJuhpFFcNCI/iYRjxwGv/MlbE+jklIeYkdzC5MgTyzNs8f9TQnGxfH\nd/+iQl8EWnnjyJMVAlhBkOZKsaEiE9WSpDhHyZkSyI6dycV8gFoC/wm+WmhFTnu3\nTiYXPS5bie9W6LXbsRZUZ9Jh+VmDgeX86E9zpwFs5GZmTSeesIlFqiXhyCe5Vkik\nF813stvZAgMBAAECggEAAbB5s4iQzq2siEVTxGxj4rLranw8DsJF3GBwZjncS3CQ\nGQ8TLi1PN9XtakTL1650uVq2C2pGLNtHyPYQoHbNdkP4ppa4p4R8c/McELdbnmvL\nqEY8Q7iwskXGBsFWyYUfdy2KsD+uomIrcXpbqmmavZSBRuESdqi7Djyl7/UIxMOe\ncEZKtUo6WPYctNvqiOT9lL94U8k+M6Mx5xS/EDABKqPO4Th5vbv6mg3OSxRXiRuP\n1JH+kdr/G2MaZodTIZDE8hlI1BOmV5ZRDS2AmXmZy20g6Vl9xauf2j7DV/J3Jwng\nI6w+SMEhb67DwSQ6AvGQINygLZ01gXJOJVVdp0JDUQKBgQDWim+76iWg618iltTM\nipkgdUJQHMp1zr33FNAomCtWqaSUof4UOxd+4CX0mODZa7a34HNQsl4MIZMRcIW3\nn9rPO0M0XNQoRC/30WpeedS3GFO7dTpdNd4ZqkAjNzfROSkMHXdlicPIMm0ztbk2\nz0e7j7Q3kQn4bJL0J6ImgYaMkQKBgQDVjjIsVYWEOy+/C4uS36O8jPlGkzMGZkUB\njA6QJfFvcH+SypElOVDEx4O7r8s/2EG529pBL7I53TT0xK7OOwn+FX0Q+hQEa2fO\nwA36a7fpT43/9MHMFq9WT5V3HFnutZ5Z4PAhNh4dN7FQa5TBuCchpOONElq2+AIJ\nlDKeX/2eyQKBgQC8PnwLxkd+CwhOsUnGr1XsxPaKlLiQ5faI9hovhFWClRdz0y+9\nUJwtF0A2fm3MWFbawHZuOBONUWhZxQGPPRQhAT7Wkx0Ut7/fEkDi5MNgZFgUA6hS\nYRGgM2JTg//V9PGvT6uTzG2dG6H13V3GWdn3GQBoQTseXyYSVTRR1RTaAQKBgG40\nPzgZuhkO4gjY0GIu/rQim9ELzV0UEbBGso04x2sWxv7dgiGPflrOCvEkOuLrmp9r\nESpqjrLFsLpPdVX/qZxxQmUsaIAPXTaYbZ45UGMaJtFbYVcMrdcAosUg4FgLaXhA\nWCsLXmb9godZvR5rBeaazMLUIfQh8As5axXHu33hAoGBAMu3MpRTtUVGhxE8YM/U\nnkdacHKfIXER3gE3HIL+aUpneS7/sad+yFu1BimWt2yIfPcf8MIZxinqRSJHOGo3\nVw9lvkQdykeaYZl5TgA+yKxQQ8UR13CNkjdTrx1sKBCKHT0fgdlgfNfRBJs6k1OA\nNBfmqxh0TaITlB6SuAapTjyV\n-----END PRIVATE KEY-----\n";
var SERVICE_ACCOUNT_EMAIL = "chatbot@su19-codeu-38-6755.iam.gserviceaccount.com";

// Posts a message into the given space ID via the API, using
// service account authentication.
function postMessage(spaceId, message) {
  var service = OAuth2.createService('chat')
      .setTokenUrl('https://accounts.google.com/o/oauth2/token')
      .setPrivateKey(SERVICE_ACCOUNT_PRIVATE_KEY)
      .setClientId(SERVICE_ACCOUNT_EMAIL)
      .setPropertyStore(PropertiesService.getUserProperties())
      .setScope(SCOPE);
  if (!service.hasAccess()) {
    Logger.log('Authentication error: %s', service.getLastError());
    return;
  }
  var url = 'https://chat.googleapis.com/v1/' + spaceId + '/messages';
  UrlFetchApp.fetch(url, {
    method: 'post',
    headers: { 'Authorization': 'Bearer ' + service.getAccessToken() },
    contentType: 'application/json',
    payload: JSON.stringify(message),
  });
}
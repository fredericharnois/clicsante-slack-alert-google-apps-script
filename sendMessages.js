function sendMessages() {
  const availabilities = getAvailabilities()
  const availsCount = availabilities.length
  const SLACK_URL = 'https://hooks.slack.com/services/XXXXXXXXXXX/XXXXXXXXXXX/XXXXXXXXXXXXXXXXXXXXXXXX';
  if (availsCount > 0) {
    for (i=0; i < availabilities[0].length; i++) {
      const slackMessage = {
        "blocks": [
          {
            "type": "section",
            "text": {
              "type": "plain_text",
              "text": `🚨 Un rendez-vous est disponible le ${availabilities[0][i]} à ${availabilities[1][i]}. 🚨`,
              "emoji": true
            },
            "accessory": {
              "type": "button",
              "text": {
                "type": "plain_text",
                "text": "Réservez 💉",
                "emoji": true
              },
              "url": "https://clients3.clicsante.ca/XXXXX/"
            }
          }
        ]
      }
      var options = {
        method: 'POST',
        contentType: 'application/json',
        payload: JSON.stringify(slackMessage)
      };
      UrlFetchApp.fetch(SLACK_URL, options);
      Utilities.sleep(100)
    }
  } 
}

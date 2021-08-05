function getAvailabilities() {
  const dateUrl = 'https://api3.clicsante.ca/v3/establishments/XXXXX/schedules/public?dateStart=2021-05-01&dateStop=2021-06-01&service=2612&timezone=America/Toronto&places=XXXX&filter1=1&filter2=0';
  const options = {
    'headers' : {
      'authority': 'api3.clicsante.ca',
      'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="90", "Google Chrome";v="90"',
      'accept': 'application/json, text/plain, */*',
      'authorization': 'Basic cHVibGljQHRyaW1vei5jb206MTIzNDU2Nzgh',
      'x-trimoz-role': 'public',
      'sec-ch-ua-mobile': '?0',
      'product': 'clicsante',
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.0.0 Safari/537.36',
      'origin': 'https://portal3.clicsante.ca',
      'sec-fetch-site': 'same-site',
      'sec-fetch-mode': 'cors',
      'sec-fetch-dest': 'empty',
      'referer': 'https://portal3.clicsante.ca/',
      'accept-language': 'en-US,en;q=0.9',
      }
  };
  const dateResponse = UrlFetchApp.fetch(dateUrl, options);
  const dateJson = dateResponse.getContentText();
  const dateData = JSON.parse(dateJson);
  const availabilities = dateData.availabilities;

  var avails = []
  var dates = []
  var times = []
  const MILLIS_PER_WEEK = 1000 * 60 * 60 * 24 * 7;
  const now = new Date();
  const limitDate = new Date(now.getTime() + MILLIS_PER_WEEK);
  for (i=0; i < availabilities.length; i++) {
      const availDate = new Date(availabilities[i]);

      if (limitDate.getTime() > availDate.getTime()) {
        const MILLIS_PER_DAY = 1000 * 60 * 60 * 24;
        const rawDateStop = new Date(availDate.getTime() + MILLIS_PER_DAY);
        const dateStop = Utilities.formatDate(rawDateStop, 'EDT', 'yyyy-MM-dd');
        const timeUrl = `https://api3.clicsante.ca/v3/establishments/XXXXX/schedules/day?dateStart=${availabilities[i]}&dateStop=${dateStop}&service=2612&timezone=America/Toronto&places=XXXX&filter1=1&filter2=0`
        const timeResponse = UrlFetchApp.fetch(timeUrl, options);
        const timeJson = timeResponse.getContentText();
        const timeData = JSON.parse(timeJson);
        const timeAvails = timeData.availabilities;
        for (j=0; j < timeAvails.length; j++) {
          const rawDateTime = timeAvails[j].start;
          const dateTimeObject = new Date(rawDateTime);
          const date = Utilities.formatDate(dateTimeObject, 'EDT', 'yyyy-MM-dd');
          dates.push(date);
          const time = Utilities.formatDate(dateTimeObject, 'EDT', 'HH:mm');
          times.push(time);
        }
        avails.push(dates);
        avails.push(times);
      }
    };

  return avails

};

const axios = require('axios');
const jsdom = require('jsdom');
const puppeteer = require('puppeteer');
const NodeGeocoder = require('node-geocoder');
const apiKey = 'AIzaSyDhLdclEEQfC6F47z-VcPpGQZPPlnwGfa8';

const delay = ms => new Promise(res => setTimeout(res, ms));

const geocoderOptions = {
  provider: 'google', // Which geocoding service to user
  httpAdapter: 'https', // Default
  apiKey: apiKey, // Most of the providers require an API key
};
const geocoder = NodeGeocoder(geocoderOptions);

function compareRatings(a, b) {
  if (a.rating < b.rating) {
    return 1;
  }
  if (a.rating > b.rating) {
    return -1;
  }
  return 0;
}
async function getPhoto(url) {
  const browser = await puppeteer.launch({ headless: 'new' });

  const page = await browser.newPage();
  await page.goto(url);
  const data = await page.evaluate(function () {
    return document.querySelector('img').src;
  });
  return data;
}
const apiController = {
  async getThingsToDo(req, res, next) {
    console.log(req.body.location);
    const results = await geocoder.geocode(req.body.location);
    const lat = results[0].latitude.toString();
    const long = results[0].longitude.toString();
    console.log(results);
    let location = lat + ',' + long; // location in cordinates
    let radius = '1000'; // radius in meteres to search around
    let types = 'tourist_attraction'; // type of location being looked for check out the google places api for mor information (only specify 1 type)
    //let priceLevel = user specified price
    console.log(location);
    const { data } = await axios.get(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=${radius}&types=${types}&key=${apiKey}`,
    );
    //pushing to an array so locations can be sorted later
    const locationsArray = [];
    for (location in data.results) {
      //sorts out non places and buisness with less than 10 reviwes
      if (
        !data.results[location].hasOwnProperty('user_ratings_total') ||
        data.results[location].user_ratings_total < 10
      ) {
        continue;
      }
      locationsArray.push(data.results[location]);
    }
    locationsArray.sort(compareRatings);
    const locationsObj = {};
    if (locationsArray.length == 0) {
      res.sendStatus(404);
    }
    for (let i = 0; i <= 2; i++) {
      console.log(locationsArray[i]);
      console.log(i);
      const locationPhoto = await getPhoto(
        `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&maxheight=800&photo_reference=${locationsArray[i].photos[0].photo_reference}&key=${apiKey}`,
      );

      locationsObj[i] = {
        name: locationsArray[i].name,
        rating: locationsArray[i].rating,
        photo: locationPhoto,
      };
      console.log(locationsObj);
    }
    res.locals.locations = locationsObj;
    next();
  },
  async getFlights(req, res, next) {
    const location = req.body.location;
    const leaveDate = req.body.leaveDate;
    const returnDate = req.body.returnDate;
    console.log(location, leaveDate, returnDate);
    const browser = await puppeteer.launch({
      headless: 'new',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        `--window-size=1920,1080`,
      ],
      defaultViewport: {
        width: 1920,
        height: 1080,
      },
    });
    console.log('hiiiii');
    // go to specified url
    const page = await browser.newPage();
    await page.goto('https://www.google.com/travel/flights?hl=en-US');
    await delay(1000);
    await page.keyboard.type(location);
    await page.keyboard.press('Tab');
    await delay(200);
    await page.keyboard.press('Tab');
    await delay(200);
    await page.keyboard.press('ArrowDown');
    await delay(200);
    await page.keyboard.press('Enter');
    await delay(200);
    await page.keyboard.press('Tab');
    await delay(200);
    await page.keyboard.type(leaveDate);
    await delay(200);
    await page.keyboard.press('Tab');
    await page.keyboard.type(returnDate);
    await page.keyboard.press('Tab');
    await delay(200);
    await page.keyboard.press('Tab');
    await delay(200);
    await page.keyboard.press('Enter');
    await delay(3000);
    // await page.keyboard.press('Tab');
    // await delay(200);
    // await page.keyboard.type('05/29');
    // await delay(5000);
    // console.log('h');
    // await page.keyboard.press('Enter');
    // await page.keyboard.press('Tab');
    const data = await page.evaluate(function () {
      const outputObj = {};
      const arrayOfFlights = document.querySelectorAll('.pIav2d');
      for (let i = 0; i <= 2; i++) {
        outputObj[i] =
          arrayOfFlights[i].firstChild.firstChild.getAttribute('aria-label');
      }
      return outputObj;
    });
    res.locals.flightsInfo = data;
    next();
  },
  async hotelsToStayAt(req, res, next) {
    const results = await geocoder.geocode(req.body.location);
    const lat = results[0].latitude.toString();
    const long = results[0].longitude.toString();
    console.log(results);
    let location = lat + ',' + long; // location in cordinates
    let radius = '1000'; // radius in meteres to search around
    let types = 'lodging'; // type of location being looked for check out the google places api for mor information (only specify 1 type)
    //let priceLevel = user specified price
    let { data } = await axios.get(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=${radius}&types=${types}&key=${apiKey}`,
    );
    const hotelsArray = [];
    for (hotel in data.results) {
      //sorts out non places and buisness with less than 10 reviwes
      if (
        !data.results[hotel].hasOwnProperty('user_ratings_total') ||
        data.results[hotel].user_ratings_total < 10
      ) {
        continue;
      }
      hotelsArray.push(data.results[hotel]);
    }
    hotelsArray.sort(compareRatings);
    //console.log(hotelsArray);
    let hotelsObj = {};
    let placesApiPhotoRequest = await axios.get(
      `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&maxheight=800&photo_reference=AUacShivvPtTo2Jmnzkk0lcojtdNzQx8cNPJPBs0yTg0WbaueHYdxRNdryGlT8Zgnx9kDHvIE9RJUGdVWYpDSFPnQoiPqSaxFbMoXVRHsEK2FhPjbBKOMqsVURP2o2f55CdeLzrXxrTkoznGodmAFIPd106jhDA1_lKNJfltfRqQ9zI9UHY&key=${apiKey}`,
    );
    //console.log(placesApiPhotoRequest.data);
    let website = await axios.get(
      `https://lh3.googleusercontent.com/places/ANJU3DvcXmXYRPExvd5V3ldNPrqqElnevoJla7u19OqZmysRReTkHC0JzsXl7D2SNybp40XC-AL79uimBc21dyq3A00Tt1YHF6gxnw=s1600-w800-h800`,
      {
        Headers: {
          'accept-encoding': 'application/json',
        },
      },
    );
    // const photoSrc = await getPhoto(
    //   `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&maxheight=800&photo_reference=AUacShivvPtTo2Jmnzkk0lcojtdNzQx8cNPJPBs0yTg0WbaueHYdxRNdryGlT8Zgnx9kDHvIE9RJUGdVWYpDSFPnQoiPqSaxFbMoXVRHsEK2FhPjbBKOMqsVURP2o2f55CdeLzrXxrTkoznGodmAFIPd106jhDA1_lKNJfltfRqQ9zI9UHY&key=${apiKey}`,
    // );
    // console.log(photoSrc);
    //console.log(website);
    //console.log(JSON.stringify(website.data, null, 4));
    //let dom = new jsdom.JSDOM(website.data);
    //let document = dom.window.document;
    //console.log(document.querySelector('body').firstChild.src);
    //const fakeHotel = document.getElementsByTagName('img').src;
    //console.log(fakeHotel);
    //let hotelImage = document.querySelector('img').src;
    //console.log(hotelImage);
    for (let i = 0; i <= 2; i++) {
      // make request to place/photo api using the photos object on location
      //   let placesApiPhotoRequest = await axios.get(
      //     `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&maxheight=800&photo_reference=AUacShivvPtTo2Jmnzkk0lcojtdNzQx8cNPJPBs0yTg0WbaueHYdxRNdryGlT8Zgnx9kDHvIE9RJUGdVWYpDSFPnQoiPqSaxFbMoXVRHsEK2FhPjbBKOMqsVURP2o2f55CdeLzrXxrTkoznGodmAFIPd106jhDA1_lKNJfltfRqQ9zI9UHY&key=${apiKey}`,
      //   );
      const photoSrc = await getPhoto(
        `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&maxheight=800&photo_reference=${hotelsArray[i].photos[0].photo_reference}&key=${apiKey}`,
      );
      hotelsObj[i] = {
        name: hotelsArray[i].name,
        rating: hotelsArray[i].rating,
        photos: photoSrc,
      };
    }
    res.locals.topHotels = hotelsObj;
    next();
  },
};
module.exports = apiController;

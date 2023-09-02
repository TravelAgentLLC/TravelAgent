const axios = require('axios');
const jsdom = require('jsdom');
const zlib = require('zlib');
const puppeteer = require('puppeteer');
const { get } = require('http');
const apiKey = 'AIzaSyDhLdclEEQfC6F47z-VcPpGQZPPlnwGfa8';

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
    let location = '10.799079,106.666475'; // location in cordinates
    let radius = '1000'; // radius in meteres to search around
    let types = 'tourist_attraction'; // type of location being looked for check out the google places api for mor information (only specify 1 type)
    //let priceLevel = user specified price
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
    for (let i = 0; i <= 2; i++) {
      const locationPhoto = await getPhoto(
        `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&maxheight=800&photo_reference=${locationsArray[i].photos[0].photo_reference}&key=${apiKey}`,
      );
      locationsObj[i] = {
        name: locationsArray[i].name,
        rating: locationsArray[i].rating,
        photo: locationPhoto,
      };
    }
    console.log(locationsObj);
    res.locals.hotelInfo = locationsObj;
    next();
  },
  async hotelsToStayAt(req, res, next) {
    let location = '10.799079,106.666475'; // location in cordinates
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
    console.log(hotelsArray[0]);
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
    console.log(hotelsObj);
    console.log(hotelsArray[0].photos[0].photo_reference);
    res.locals.topHotels = hotelsObj;
    next();
  },
};
module.exports = apiController;

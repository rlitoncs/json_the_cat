const needle = require('needle');


const apiEndpoint = "https://api.thecatapi.com/v1/breeds/search?q=";

const fetchBreedDescription = (breedName, callback) => {
  needle.get(apiEndpoint + breedName, (err, resp, body) => {
    //edge case: request failed
    if (err) {
      callback(err, null);
    } else if (body.length === 0) {
      //edge case: breed not found
      callback(`The breed '${breedName}' cannot be found.`, null);
    } else {
      callback(null, body[0].description);
    }

  });

};

module.exports = { fetchBreedDescription };
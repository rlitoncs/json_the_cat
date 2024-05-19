const needle = require('needle');

const input = process.argv.slice(2);
//edge case: no arguments or more than 1 argument
if (input.length !== 1) {
  console.log(`Provide only 1 argument`);
  process.exit(0);
}
const requestedBreed = input[0];
const apiEndpoint = "https://api.thecatapi.com/v1/breeds/search?q=" + requestedBreed;

needle.get(apiEndpoint, (err, resp, body) => {

  //edge case: request failed
  if (err) {
    console.log(`Request Failed: (${apiEndpoint}) is not a valid endpoint`);
    process.exit(0);
  }
  //edge case: breed not found
  if (body.length === 0) {
    console.log(`Search Failed: The breed '${requestedBreed}' cannot be found.`);
    process.exit(0);
  }
    
  const breedName = body[0].name;
  const breedDescription = body[0].description;
  console.log(`Searched for: '${requestedBreed}'\nFound: ${breedName}\nDescription:\n${breedDescription}`);
});
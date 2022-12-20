const seedDatabase = require("./seed");


seedDatabase(function(){
  // after the seed is done... exit
  process.exit(0);
});
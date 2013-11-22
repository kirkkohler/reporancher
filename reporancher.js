
if (Meteor.isClient) {
  Template.splash.events({
    'click input[type=submit]': function (event) {
      event.preventDefault();
      console.log("You clicked the Battle button dawg.")
      // get data from form template
      var form_data = {
        "user1": "bob",
        "repo1": "reponame1", 
        "user2": "alice",
        "repo2" : "reponame2"
      };
      console.log("Here is the data: ");
      // make API calls here using data
      // ...
      // render the new template with both monsters (passed in?)
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

function Monster(data) {
  // constructor for monsters
  this.user =  data; //data.user;
  this.name = data; //data.repo;
  this.maxHealth = 100;
  this.currentHealth = this.maxHealth;
  this.alive = true;
  this.strength = 100;
  this.accuracy = 1;
  this.defense = 0.00;
};

function fight() {
  var monster1 = new Monster("foo");
  var monster2 = new Monster("bar");
  console.log("Let the battle begin!");
  var rounds = 0; // round counter ( interesting for stats maybe )
  while(monster1.alive && monster2.alive) {
    console.log(attack(monster1, monster2));
    console.log(attack(monster2, monster1));
    console.log(monster1.currentHealth + ": " + monster2.currentHealth);
    // write result of this round to input box
  }
  if (!monster1.alive && !monster2.alive) {
    console.log("Both monsters died! It is a draw!!");
  } else {
    var winner = (monster1.alive) ? monster1.name : monster2.name;
    console.log(winner + " is victorious!");
  }
};

function attack(attacker, defender) {
  // simulates a single attack, returns "miss" if missed
  // else returns damage as int (factoring in defense)
  if (Math.floor((Math.random()*100)+1) > attacker.accuracy) {
    return attacker.name + " misses";
  } else {
    // hits
    defender.currentHealth -= Math.round(attacker.strength * (1-defender.defense));
    if (defender.currentHealth <= 0)
      defender.alive = false;
    return attacker.name + " hits " + defender.name + " for " + Math.round(attacker.strength * (1-defender.defense));
  }
};


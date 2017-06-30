var data = {
  f01: {
    name: "Alice",
    age: 15,
    follows: ["f02", "f03", "f04"]
  },
  f02: {
    name: "Bob",
    age: 20,
    follows: ["f05", "f06"]
  },
  f03: {
    name: "Charlie",
    age: 35,
    follows: ["f01", "f04", "f06"]
  },
  f04: {
    name: "Debbie",
    age: 40,
    follows: ["f01", "f02", "f03", "f05", "f06"]
  },
  f05: {
    name: "Elizabeth",
    age: 45,
    follows: ["f04"]
  },
  f06: {
    name: "Finn",
    age: 25,
    follows: ["f05"]
  }
};

function getNamesFromIds(ids, userbase) {
  var namesArray = []
  ids.forEach(function(id) { namesArray.push(userbase[id].name) })
  return namesArray
}

function getFollowersFromId(id, userbase) {
  var followers = []
    for (user in userbase) {
      if (userbase[user].follows.indexOf(id) !== -1) {
        followers.push(user)
      }
    }
  return followers
}

// List everyone and for each of them, list the names of who they follow and who follows them
function listUsersAndFollowers(userbase) {
  var list = {}
  for (user in userbase) {
    var followedBy = []
    for (user2 in userbase) {
      if (userbase[user2].follows.indexOf(user) !== -1) {
        followedBy.push(user2)
      }
    }
    list[userbase[user].name] = {
      following: getNamesFromIds(userbase[user].follows, userbase),
      followers: getNamesFromIds(followedBy, userbase)
    }
  }
  console.log(list)
}

// Identify who follows the most people
function mostFollowing(userbase) {
  var output = ""
  for (user in userbase) {
    if (output === "") { output = user ; continue }
    if (userbase[user].follows.length > userbase[output].follows.length) {
      output = user
    }
  }
  return((getNamesFromIds(Array(output), userbase)).join())
}

// Identify who has the most followers
function mostFollowers(userbase) {
  var output = []
  var highestFollowers = 0
  var userData = {}
  for (user in userbase) {
    userData[user] = getFollowersFromId(user, userbase)
  }
  for (user in userData) {
    if (userData[user].length > highestFollowers) highestFollowers = userData[user].length
  }
  for (user in userData) {
    if (userData[user].length === highestFollowers) output.push(user)
  }
  console.log(getNamesFromIds(output, userbase))
}

// Identify who has the most followers over 30
function mostFollowersOver30(userbase) {
  var output = []
  var highestFollowers = 0
  var userData = {}
  for (user in userbase) {
    userData[user] = getFollowersFromId(user, userbase)
  }
  for (user in userData) {
    if (userData[user].length > highestFollowers) highestFollowers = userData[user].length
  }
  for (user in userData) {
    if ((userData[user].length === highestFollowers) && (userbase[user].age > 30)) output.push(user)
  }
  console.log(getNamesFromIds(output, userbase))
}
mostFollowersOver30(data)


// Identify who follows the most people over 30
// List those who follow someone that doesn't follow them back
// List everyone and their reach (sum of # of followers and # of followers of followers)
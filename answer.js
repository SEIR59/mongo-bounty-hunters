// db.bounties.insert(
//     {
//       name: 'Han Solo',
//       wantedFor : 'Owing money',
//       client : 'Jabba the Hut',
//       reward : 1000000,
//       ship: 'Millennium Falcon',
//       hunters :['Bobba Fett', 'Dengar', 'IG-88', 'Zuckuss', 'Greedo', 'Bossk', '4-LOM'],
//       captured: false
//     }
//     )


// db.bounties.insert([
//     {
//       name: 'Han Solo',
//       wantedFor : 'Owing money',
//       client : 'Jabba the Hut',
//       reward : 1000000,
//       ship: 'Millennium Falcon',
//       hunters :['Bobba Fett', 'Dengar', 'IG-88', 'Zuckuss', 'Greedo', 'Bossk', '4-LOM'],
//       captured: false
//     },
//     {
//       name: 'Rocket',
//       wantedFor : 'Stealing Batteries',
//       client : 'Ayesha High Priestess of the Sovereign',
//       reward : 1000000000,
//       ship: 'The Milano',
//       hunters :['Nebula', 'Ravagers'],
//       captured: false
//     },
//     {
//       name: 'Sara Lance',
//       wantedFor : 'Screwing up the timeline, causing anachronisms',
//       client : 'Time Bureau',
//       reward : 50000,
//       ship: 'Waverider',
//       hunters :['Chronos'],
//       captured: false
//     },
//     {
//       name: 'Malcolm Reynolds',
//       wantedFor : 'Aiming to misbehave',
//       client : 'The Alliance',
//       reward : 40000,
//       ship: 'Serenity',
//       hunters :['Jubal Early'],
//       captured: false
//     },
//     {
//       name: 'Starbuck',
//       wantedFor : "Disobeying Captain's orders",
//       client : 'Captain Adama',
//       ship: 'Demetrius',
//       reward : 1000,
//       hunters :['Apollo'],
//       captured: true
//     }
//   ])

// delete dupicated data
db.bounties.aggregate(
    [ 
        { "$sort": { "_id": 1 } }, 
        { "$group": { 
            "_id": "$name", 
            "doc": { "$first": "$$ROOT" } 
        }}, 
        { "$replaceRoot": { "newRoot": "$doc" } },
        { "$out": "bounties" }
    ]

)
// increse bounties 333333
db.bounties.updateMany(
    {
    },
    {
        $inc: {
            reward: 333333
        }
    }
)

// multiply  by 2
db.bounties.updateMany(
    {
    },
    {
        $mul: {
            reward: 2
        }
    }
)

// Add Bobba Fett as a hunter for Malcolm Reynolds
db.bounties.update(
    {
        name: 'Malcolm Reynolds'
    },
    {
        $push: {
            hunters: 'Bobba Fett'
        }
    }
)

// Add Bobba Fett as a hunter for the one that has the ship Waverider
db.bounties.update(
    {
        ship: 'Waverider'
    },
    {
        $push: {
            hunters: 'Bobba Fett'
        }
    }
)
// Find and remove Dengar the bounty hunter
db.bounties.updateMany({},
    { $pull: { hunters:  "Dengar" } }
)

// Upsert is used with update method which creates a new document if the query does not retrieve any documents matching the query parameters.
// Try giving a lastSeen field to Han Solo, with the property yesterday (we haven't set his yet)
db.bounties.update(
    {
    name: 'Han Solo'
    },
    {$set:{
        lastSeen: 'yesterday'
    }}
);
db.bounties.find({name:'Han Solo'});

// Try giving all bounties that are not Han Solo a new field of lastSeen - with a value of last week

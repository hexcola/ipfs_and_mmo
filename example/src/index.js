const IPFS = require('ipfs')
const OrbitDB = require('orbit-db')

// const fs = require('fs');
// var obj;
// fs.readFile('file', 'utf8', function (err, data) {
//   if (err) throw err;
//   obj = JSON.parse(data);
// });

// OrbitDB uses Pubsub which is an experimental feature
// and need to be turned on manually.
// Note that these options need to be passed to IPFS in
// all examples in this document even if not specified so.
const ipfsOptions = {
    EXPERIMENTAL: {
        pubsub: true
    }
}

// Create IPFS instance
const ipfs = new IPFS(ipfsOptions)

ipfs.on('ready', async () => {
    // Create OrbitDB instance
    const orbitdb = new OrbitDB(ipfs)
    const options = {
        accessController: {
          // Give write access to ourselves
          write: ['*']
        },
        indexBy: 'name'
      };
    
    //   const db = await orbitdb.keyvalue('first-database', access)
    const db = await orbitdb.docs('orbit.blockcraft.master', options)

    console.log(db.address.toString())
    // const hash = await db.put({ _id: 'QmAwesomeIpfsHash', name: 'shamb0t', followers: 500 })

    const hash = await db.put(  
        {
            name: 'master',
            data: {
                tilesets: [
                    {
                        columns: 20,
                        firstgid: 1,
                        image: "../tilesheet.png",
                        imageheight: 3136,
                        imagewidth: 640,
                        margin: 0,
                        name: "tilesheet",
                        spacing: 0,
                        tilecount: 1960,
                        tileheight: 32,
                        tilewidth: 32
                    }
                ],
                chunkWidth: 20,
                chunkHeight: 20,
                nbChunksHorizontal: 5,
                nbChunksVertical: 5,
                nbLayers: 2
            }
    })

    console.log(hash);


    const profile = db.get('master')
    console.log(profile);
    // // [{ _id: 'shamb0t', name: 'shamb0t', followers: 500 }]
    // // to get all the records
    // const profilex = db.get('');
    // console.log(profilex);
    // // returns all the records
    // // [{ _id: 'shamb0t', name: 'shamb0t', followers: 500 }]
})

const mongoose = require('mongoose')


const connectionDb = async () => {

    try{
        const username = encodeURIComponent('raheem');
        const password = encodeURIComponent('raheem@1214');
        const clusterUrl = 'raheemcluster.4svf7fn.mongodb.net';
        const databaseName = 'mycontacts-backend';

        const connectionString = `mongodb+srv://${username}:${password}@${clusterUrl}/${databaseName}?retryWrites=true&w=majority`;

        const connect = await mongoose.connect(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        //const connect = await mongoose.connect(process.env.CONNECTION_STRING);
        console.log(
            "DATABASE CONNECTED: ", connect.connection.host,
            connect.connection.name
        );
    }catch (err)
    {
        console.log(err)
        process.exit(1)
    }

};

module.exports = connectionDb;
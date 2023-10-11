const dotenv = require("dotenv");
dotenv.config();
const http = require("http");

const mongodb = require("mongodb");


const connectString = process.env.MONGO_URL;
   

mongodb.connect(
    connectString,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    (err, client) => {
        if (err) console.log("Error on connection MongoDB");
        else {
            console.log("MongoDB connection succeed");
            module.exports = client;

            const app = require("./app");
            const server = http.createServer(app);
            let PORT = process.env.PORT || 3000;
            server.listen(PORT, function () {
                console.log(
                    `server portta muvaffaqiyatli,${PORT} portta ishlamoqda, http://localhost:${PORT}`
                );
            });
        }
    }
);

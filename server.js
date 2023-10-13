const dotenv = require("dotenv");
dotenv.config();
const http = require("http");

const mongoose = require("mongoose");


const connectString = process.env.MONGO_URL;
   

mongoose.connect(
    connectString,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    (err, goose) => {
        if (err) console.log("Error on connection MongoDB");
        else {
            console.log("MongoDB connection succeed");
            console.log(goose);

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

const http = require("http");

const mongodb = require("mongodb");

let db;
const connectString =
    "mongodb+srv://yusuf:z1pjfF3ozp6pofMj@cluster0.40fsowl.mongodb.net/Reja";

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
            let PORT = 3000;
            server.listen(PORT, function () {
                console.log(
                    `server portta muvaffaqiyatli,${PORT} portta ishlamoqda, http://localhost:${PORT}`
                );
            });
        }
    }
);

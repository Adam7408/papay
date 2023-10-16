const Member = require("../models/Member");

let memberController = module.exports;

memberController.signup = async (req, res) => {
    try {
        console.log("POST: controll signupga kimdir kirdi");
        const data = req.body;
        const member = new Member();
        const new_member = await member.signupData(data);

        res.json({ state: "succeed", data: new_member });
    } catch (err) {
        console.log(
            `ERROR: controller/signupga kirishta hatolik boldi ${err.message}`
        );
        res.json({ state: "neudachno", message: err.message });
    }
};
memberController.login = async (req, res) => {
    try {
        console.log("POST: controll loginga kimdir kirdi");
        const data = req.body;
        const member = new Member();
        const result = await member.loginData(data);

        res.json({ state: "succeed", data: result});
    } catch (err) {
        console.log(
            `ERROR: controller/loginga kirishta hatolik boldi ${err.message}`
        );
        res.json({ state: "neudachno", message: err.message });
    }
};
memberController.logout = (req, res) => {
    console.log("GET cont.logout");
    res.send("logout sahifadasiz");
};

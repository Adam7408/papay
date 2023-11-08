const MemberModel = require("../schema/member.model");
const Definer = require("../lib/mistake");
const assert = require("assert");
const {
    shapeIntoMongooseObjectId,
    lookup_auth_member_liked,
} = require("../lib/config");
const Member = require("../models/Member");

class Restaurant {
    constructor() {
        this.memberModel = MemberModel;
    }

    async getAllRestaurantsData() {
        try {
            const result = await this.memberModel
                .find({
                    mb_type: "RESTAURANT",
                })
                .exec();

            assert(result, Definer.general_err1);
            return result;
        } catch (err) {
            throw err;
        }
    }

    async updateRestaurantByAdminData(update_data) {
        try {
            const id = shapeIntoMongooseObjectId(update_data?.id);
            const result = await this.memberModel
                .findByIdAndUpdate({ _id: id }, update_data, {
                    runValidators: true,
                    lean: true,
                    returnDocument: "after",
                })
                .exec();
            assert.ok(result, Definer.general_err1);

            return result;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = Restaurant;

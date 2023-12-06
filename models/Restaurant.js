const MemberModel = require('../schema/member.model');
const Definer = require('../lib/mistake');
const assert = require('assert');
const { shapeIntoMongooseObjectId } = require('../lib/config');
const Member = require('../models/Member');

class Restaurant {
	constructor() {
		this.memberModel = MemberModel;
	}
	
	async getRestaurantsData(member, data) {
		try{
			const auth_mb_id = shapeIntoMongooseObjectId(member?._id);
			let match = { mb_type: 'RESTAURANT', mb_status: 'ACTIVE' };
			let aggregationQuery = []; // Array
			data.limit = data['limit'] * 1;
			data.page = data['page'] * 1;

			switch (data.order) {
				case 'top':
					match['mb_top'] = "Y";
					aggregationQuery.push({ $match: match });
					aggregationQuery.push({ $sample: { size: data.limit } });
					break;
				case 'random':
					aggregationQuery.push({ $match: match });
					aggregationQuery.push({ $sample: { size: data.limit } });
					break;
				default:
					aggregationQuery.push({ $match: match });
					const sort = { [data.order]: -1 };
					aggregationQuery.push({ $sort: sort });
					break;
			}

			aggregationQuery.push({ $skip: (data.page - 1) * data.limit });
			aggregationQuery.push({ $limit: data.limit });
			// TODO: Check auth member liked the chosen target

			const result = await this.memberModel.aggregate(aggregationQuery).exec();
			assert.ok(result, Definer.general_err1);

			return result;
		} catch(err) {
			throw err;
		}
	}

	async getChosenRestaurantData(member, id) {
		try {
			id = shapeIntoMongooseObjectId(id);

			if (member) {
				const member_obj = new Member();
				await member_obj.viewChosenItemByMember(member, id, 'member');
			}

			const result = await this.memberModel
				.findOne({
					_id: id,
					mb_status: 'ACTIVE',
				})
				.exec();
				
			assert.ok(result, Definer.auth_err2);

			return result;
		} catch (err) {
			throw err;
		}
	}

	async getAllRestaurantsData() {
		try {
			const result = await this.memberModel
				.find({
					mb_type: 'RESTAURANT',
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
					returnDocument: "after"
				})
				.exec();
			console.log("REstaurant.jsdagi:::: resutl::::", result);
			assert.ok(result, Definer.general_err1);
			
			return result;
		} catch (err) {
			throw err;
		}
	}
}

module.exports = Restaurant;
const UserModel = require('./models/users');
const profiles = require('../plugins/profiles')

module.exports = {
  async getUser({ steamAccountId }) {
    try {
      return await UserModel.findOne({ steamAccountId })
    } catch(err) {
      console.log(err);
    }
  },
  async getUsers() {
    try {
      return await UserModel.find()
    } catch(err) {
      console.log(err);
    }
  },
  async deleteUsers() {
    try {
      return await UserModel.deleteMany()
    } catch(err) {
      console.log(err);
    }
  },
  async syncProfiles() {
    try {
      const users = await this.getUsers();

      const filteredProfiles = profiles.filter(profile => {
        return !users.find(user => user.steamAccountId === profile.steamAccountId)
      });

      return await UserModel.insertMany(filteredProfiles);
    }catch(err) {
      console.log(err);
    }
  },
  async addNewUser({ steamAccountId, discordId, name }) {
    try {
      return await UserModel.create({ steamAccountId, name, discordId })
    }catch(err) {
      console.log(err);
    }
  },
  async updateUser(user, field, value) {
		user[field] = value;
		await user.save();
  },
}
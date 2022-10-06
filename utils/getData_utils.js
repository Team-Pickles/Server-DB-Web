const user = require("../repository/user.repository");
const map = require("../repository/map.repository.js");

module.exports = {
    findUserById: async (user_id) => {
        let result;
        const func = async () => {
          const tmp = await user.findUserByIdForGetData(user_id);
          result = tmp;
        };
        await func();
        return {ok: result !== undefined, user: result}
    },
    findMapById: async (map_id) => {
        let result;
        const func = async () => {
          const tmp = await map.findMapById(map_id);
          result = tmp;
        };
        await func();
        return {ok: result !== undefined, map: result}
    }
}
const { sendMessage } = require("../../common/responses")

module.exports = {
    basic: async(req, res, next) => {
        sendMessage(res, "Success", {headers: req.rawHeaders});
    }
}
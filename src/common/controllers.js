const { sendMessage } = require("./responses")

module.exports = {
    basic: async(req, res, next) => {
        sendMessage(res, "Success", {headers: req.rawHeaders});
    }
}
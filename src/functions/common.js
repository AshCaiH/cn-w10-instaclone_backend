import { sendMessage } from "./responses.js"

export const basic = async(req, res, next) => {
    sendMessage(res, "Success", {headers: req.rawHeaders});
}
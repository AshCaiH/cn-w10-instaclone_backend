import { sendMessage } from "./responses.js"

export const getImages = async(req, res, next) => {
    const url = "https://api.unsplash.com/photos?page=1&client_id=" + process.env.UNSPLASH_ACCESS_KEY;

    const response = await fetch(url, {
        method: "GET",
        headers: { "Accept-Version": "v1" },
    })

    const images = Object.values(await response.json()).map((item) => {
        const image = {
            id: item.id,
            urlSmall: item.urls.small,
            urlRegular: item.urls.regular,
            photographer: item.user.name,
        }

        return image;
    });

    const remaining = (response.headers.get("x-ratelimit-remaining") + " remaining requests.");

    sendMessage(res, "Success", {remaining: remaining, images: images});
}
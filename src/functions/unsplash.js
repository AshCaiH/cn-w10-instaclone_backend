import { sendMessage, sendError } from "./responses.js"

const parseData = (item) => {
    const image = {
        id: item.id,
        urlSmall: item.urls.small,
        urlRegular: item.urls.regular,
        photographer: item.user.name,
    }
    
    return image;
}

const unsplashRequest = async (url) => {
    const response = await fetch(url, {
        method: "GET",
        headers: { "Accept-Version": "v1" },
    })

    let images = null;
    const responseData = await response.json();

    try {
        images = Object.values(responseData).map((item) => {
            return parseData(item);
        });
    } catch {
        images = [ parseData(responseData) ]
    }

    return {
        images: images, 
        remaining: response.headers.get("x-ratelimit-remaining") + " remaining requests."
    }
}

export const getImages = async(req, res, next) => {
    try {
        const url = `https://api.unsplash.com/photos?page=${req.params.pageNo}&client_id=${process.env.UNSPLASH_ACCESS_KEY}` 
        const api = await unsplashRequest(url)

        sendMessage(res, "Success", {remaining: api.remaining, images: api.images});
    } catch (error) {sendError(req, res, error);}
}

export const getRandomImage = async (req, res, next) => {
    try {
        const url = "https://api.unsplash.com/photos/random?page=1&client_id=" + process.env.UNSPLASH_ACCESS_KEY
        const api = await unsplashRequest(url)

        sendMessage(res, "Success", {remaining: api.remaining, images: api.images});
    } catch (error) {sendError(req, res, error);}
}
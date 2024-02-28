
export const sendError = (req, res, error) => {
    res.status(500).json({
        message: error.message,
        error: error,
        auth: req.authorisation,
    });
}

export const sendMessage = (res, message, extra, status) => {
    res.status(status || 200).json({message, ...extra});
}
class Response {
    success = (message, statusCode, results) => {
        return {
            message,
            error: false,
            statusCode,
            data: results
        };
    };

    error = (message, statusCode, source = "") => {
        const codes = [200, 201, 400, 401, 404, 403, 422, 409, 500];
        const findCode = codes.find((code) => code == statusCode);

        if (!findCode) statusCode = 500;
        else statusCode = findCode;

        return {
            message,
            error: true,
            statusCode,
            source
        };
    };
}

module.exports = new Response();
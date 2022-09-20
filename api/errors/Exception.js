class BadRequest extends Error {
    constructor(message) {
        super(message);
        this.name = "Bad Request";
        this.message = message;
        this.type = "Bad Request";
        this.status = 400;
    }
}

class NotFound extends Error {
    constructor(message){
        super(message);
        this.name = "Not Found";
        this.message = message;
        this.type = "Not Found";
        this.status = 404;
    }
}

module.exports = {
    BadRequest: (message) => {
        if (message instanceof Error === true) return message;
        const error = new BadRequest(message);
        return error;
    },

    NotFound: (message) => {
        if (message instanceof Error === true) return message;
        const error = new NotFound(message) 
        return error;
    }
}
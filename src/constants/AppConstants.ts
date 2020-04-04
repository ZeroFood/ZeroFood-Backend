
class AppConstants {
    port: number = 3000;

    constructor() {
        this.port = Number(process.env["NODE_ENV"] || this.port);
    }

}

export default new AppConstants();
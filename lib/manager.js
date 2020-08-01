const employee = require("./employee")

class manager extends employee {
    constructor (name, id, email, officePhone) {
        super(name, id, email);
        this.officePhone = officePhone;
    }
    getRole() {
        return "Manager";
    }
    getOfficePhone() {
        return this.officePhone;
    }
}

module.exports = manager;
const service = require("./movies.service");


async function list(req, res) {
    res.json({ data: await service.list() });
}


module.exports = {
    list,
}
const service = require("./movies.service");


async function list(req, res) {
    const isShowing = req.query.is_showing;
    console.log("isShowing: ", isShowing);
    if (isShowing) {
        res.json({ data: await service.listMoviesByShowing() });
    } else {
        res.json({ data: await service.list() });
    }
    
}


module.exports = {
    list,
}
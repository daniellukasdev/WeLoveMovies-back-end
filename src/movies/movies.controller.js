const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");


// ##################  Middleware  ##################

async function movieExists(req, res, next) {
    const { movieId } = req.params;

    const movie = await service.read(movieId);
    if (movie) {
        res.locals.movie = movie;
        return next();
    }
    return next({ status:404, message: "Movie cannot be found." })
}


// ##################  Routes  ##################

async function list(req, res) {
    const isShowing = req.query.is_showing;
    
    if (isShowing) {
        res.json({ data: await service.listMoviesByShowing() });
    } else {
        res.json({ data: await service.list() });
    }
}

function read(req,res) {
    const { movie: data } = res.locals;
    res.json({ data });
}

async function getTheatersByMovie(req, res,) {
    const { movie_id } = res.locals.movie;
    res.json({ data: await service.theatersByMovie(movie_id) });
}

async function getReviewsByMovie(req, res) {
    const { movie_id } = res.locals.movie;
    res.json({ data: await service.reviewsByMovie(movie_id) });

}


module.exports = {
    list,
    read: [asyncErrorBoundary(movieExists), read],
    getTheatersByMovie: [
        asyncErrorBoundary(movieExists), 
        asyncErrorBoundary(getTheatersByMovie)
    ],
    getReviewsByMovie: [asyncErrorBoundary(movieExists), asyncErrorBoundary(getReviewsByMovie)],
}
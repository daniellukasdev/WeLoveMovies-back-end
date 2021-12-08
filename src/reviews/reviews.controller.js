const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// ##################  Middleware  ##################

// checks that a review with given ID exists and stores it in res.locals
// otherwise returns error
async function reviewExists(req, res, next) {
    const { reviewId } = req.params;

    const review = await service.read(reviewId);
    if (review) {
        res.locals.review = review;
        return next();
    }
    return next({ status:404, message: "Review cannot be found." })
}

// ####################  Routes  ####################

async function update(req, res) {
    const { review_id } = res.locals.review;
    const updatedReview = {
        ...res.locals.review,
        ...req.body.data,
        review_id: review_id,
    }
    await service.update(updatedReview);
    res.json({ data: await service.reformatReview(review_id) });
}

async function destroy(req, res) {
    const { review_id } = res.locals.review;
    await service.delete(review_id);
    res.sendStatus(204);
}

module.exports = {
    update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)],
    delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
}
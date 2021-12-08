const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

// #################  Mapped Properties Object  #################

const addCritic = mapProperties({
    critic_id: "critic.critic_id",
    preferred_name: "critic.preferred_name",
    surname: "critic.surname",
    organization_name: "critic.organization_name",
    created_at: "critic.created_at",
    updated_at: "critic.updated_at",
});

// ############  Table Builders for Specific Routes  ############

function listMoviesByShowing() {
    return knex("movies as m")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .distinct("m.*")
    .where({ "mt.is_showing": true })
    .orderBy("m.movie_id");
}

function theatersByMovie(movieId) {
    return knex("movies_theaters as mt")
    .join("theaters as t", "mt.theater_id", "t.theater_id")
    .select("t.*")
    .where({ "mt.movie_id": movieId });
}

function reviewsByMovie(movieId) {
    return knex("reviews as r")
        .join("critics as c", "r.critic_id", "c.critic_id")
        .select("*")
        .where({ "r.movie_id": movieId })
        .then((reviewsArr) => reviewsArr.map(addCritic));
}

// ############  Table Builders for Standard Routes  ############

function list() {
    return knex("movies", "*");
}

function read(movieId) {
    return knex("movies")
        .select("*")
        .where({ movie_id: movieId })
        .first();
}

module.exports = {
    list,
    listMoviesByShowing,
    read,
    theatersByMovie,
    reviewsByMovie,
};
const knex = require("../db/connection");

function list() {
    return knex("movies", "*");
}

module.exports = {
    list,
};
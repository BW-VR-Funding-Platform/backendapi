const db = require("../database/connection.js");

module.exports = {
    add,
    find,
    findBy,
    findById,
};

function find() {
    return db("users").select("id", "firstname","lastname").orderBy("id");
}

function findBy(filter) {
    return db("users as u")
        .join("roles as r", "u.role", "r.id")
        .where(filter)
        .select("u.id", "u.firstname","u.lastname", "u.password", "r.name as role")
        .orderBy("u.id");
}

function findBy(filter) {
    return db("users as u")
        .join("roles as r", "u.role", "r.id")
        .where(filter)
        .select("u.id", "u.firstname","u.lastname", "u.password", "r.name as role")
        .orderBy("u.id");
}

async function add(firstname, lastname) {
    try {
        const [id] = await db("firstname, lastname").insert(firstname, lastname, "id");

        return findById(id);
    } catch (error) {
        throw error;
    }
}



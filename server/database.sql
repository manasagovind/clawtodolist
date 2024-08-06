CREATE DATABASE todolist;

CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(300)
);

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(50),
    name VARCHAR(50),
    password TEXT
);
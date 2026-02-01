--liquibase formatted sql
--changeset krupal:001

create table Users(
    id bigint primary key,
    name varchar(255),
    email varchar(255),
    password varchar(255)
);
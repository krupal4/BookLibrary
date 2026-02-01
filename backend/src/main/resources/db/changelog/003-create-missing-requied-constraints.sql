--liquibase formatted sql
--changeset krupal:003

alter table users
    add constraint uq_users_email unique (email);
--liquibase formatted sql
--changeset krupal:002

drop table Users;

create table users(
        id bigint generated always as identity primary key,
        name varchar(255) not null,
        email varchar(255) not null,
        password varchar(255) not null
);

create table categories(
        id bigint generated always as identity primary key,
        name varchar(255) not null,
        created_by bigint references users(id),
        created_on timestamp default  current_timestamp
);

create table authors(
        id bigint generated always as identity primary key,
        name varchar(255) not null,
        created_by bigint references users(id)
);

create table books(
        id bigint generated always as identity primary key,
        title varchar(255) not null,
        description varchar(1023) not null ,
        rating double precision not null ,
        published_on timestamp default null,
        created_by bigint references users(id),
        created_on timestamp default current_timestamp
);

create table book_authors(
    book_id bigint not null,
    author_id bigint not null,
    primary key (book_id, author_id),
    constraint fk_book_authors_book
        foreign key (book_id) references books(id) on delete cascade,
    constraint fk_book_authors_author
        foreign key (author_id) references authors(id) on delete cascade
);

create  table book_categories(
    book_id bigint not null,
    category_id bigint not null,
    primary key (book_id, category_id),
    constraint fk_book_categories_book
        foreign key (book_id) references books(id) on delete cascade,
    constraint fk_book_categories_categories
        foreign key (category_id) references categories(id) on delete cascade
);
create database hmo;
use hmo;
create table members(
 ID int primary key,
 FirstName varchar (255) not null,
 LastName varchar(255) not null,
 Adress varchar(255) not null,
 Phone varchar(10) not null,
 Mobile varchar(10)not null,
 BirthDate date not null);

create table coronaPatients(
 ID int primary key,
 Confirmed date,
 Recovery date);

create table vaccines(
 ID int primary key,
 manufacturer1 varchar(255),
 given1 date,
 manufacturer2 varchar(255),
 given2 date,
 manufacturer3 varchar(255),
 given3 date,
 manufacturer4 varchar(255),
 given4 date);

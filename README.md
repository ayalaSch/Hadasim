# Hadasim
Home work for Hadasim

Question3- airconditioning remote - attached as a word document\
Question2- tweeter towers - clone, then compile and run in a development environment as Visual Studio\
Question1- HMO managing system. The system allows the user to add members, view all members, view information about a member including: date of birth, name, address, phone and mobile number, corona information and vaccine information. There is an option for updating member information, and deleting a member.\
The client side is written in reactJS, the server side in nodeJS. 

Question1-\
Requirements: ReactJS, nodeJS, mySQL.\
Clone the prject and open in a development environment as VScode.\
Navigate into the 'question1' folder.\
A '.env' file must be added in the server-side folder containing the following:\
    MYSQL_HOST= (your connection)\
    MYSQL_USER= (your user name)\
    MYSQL_PASSWORD= (your password)\
    MYSQL_DATABASE= 'hmo'
  
In mySQL run the provided file: 'create DB.sql' to create database and tables to work with.

# Setting up the server side
In terminal navigate to folder: `cd .\server-side\`\
then install packages server depends on: `npm i`\
then run the program with: `npm start`\
(the server should run on http://localhost:3000/ )

# Setting up the client side
In terminal navigate to folder: `cd .\client-side\`\
then install packages client depends on: `npm i`\
then run the program with: `npm start`


The following assumptions were made while working: there could be different vaccine manufacturers that are not known in advance.

Client side screenshots:\
main page:\
![image](https://github.com/ayalaSch/Hadasim/assets/144174103/24d1e908-0919-4078-9943-196413a17fff)

view details of existing member:\
![image](https://github.com/ayalaSch/Hadasim/assets/144174103/f2fe6eac-7fb8-4181-a162-97297550bf90)

update member:\
![image](https://github.com/ayalaSch/Hadasim/assets/144174103/1d558146-0eef-4784-abfc-053666e908e7)

add new member:\
![image](https://github.com/ayalaSch/Hadasim/assets/144174103/d1939df0-7ea4-4728-80b4-f87d4dd38e39)



CREATE DATABASE AS pern_stack;
-- To start the server, in the directory type: "psql -U postgres"
    
-- ::LIST OF COMMANDS:: --
-- /l show a list of all your databases
-- /c move inside a database
-- /dt show all the tables in database
-- CREATE DATABASE perntodo;
-- CREATE TABLE todo;
-- ^C to back out into menu


CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(255)
); 
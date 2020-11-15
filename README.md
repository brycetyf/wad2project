# Initital Load for Mac Users
Please follow the following instructions if you are running on a Mac machine.

## Installing dependencies (commands to run)
npm install axios
npm install @material-ui/core
npm install react-router-dom

## Bootstrapping the database with the required data
1) Go to phpMyAdmin
2) Log in 
3) Click on "Import" tab on the landing page
4) Select on "data_dump_bryce.sql" file
5) Check if the required information has been bootstrapped into the database

## Starting the backend
cd ~/app/backend && python backend.py

## Starting the Web App
cd ~/app && npm start 

# Initital Load for Windows Users
Please follow the following instructions if you are on a Windows machine.

## Installing dependencies (commands to run)
npm install axios
npm install @material-ui/core
npm install react-router-dom

## Bootstrapping the database with the required data
1) Go to phpMyAdmin
2) Log in 
3) Click on "Import" tab on the landing page
4) Select on "data_dump_bryce.sql" file
5) Check if the required information has been bootstrapped into the database

## Changing configurations in backend.py
1) Go to app/backend/backend.py
2) Comment out application.config at line 9
3) Uncomment application.config at line 10
4) Save the changes

## Starting the backend
cd app/backend && python backend.py

## Starting the Web App
cd app && npm start 
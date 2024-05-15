# PM2 Tutorial
https://betterstack.com/community/guides/scaling-nodejs/pm2-guide/


# VELOMALLORCA BIKE BUILDER
## _Sitio web de velomallorca donde configurar tu bicicleta por piezas._

## Features 
- MVC
- JWT security
- Bootstrap and Bootswatch style
- Mustache templating engine

## Dependencies
- [NodeJs]
 

## Install
Download repository and install de dependencies
```
git clone git@github.com:RgmDev/velomallorca.git
npm install
```
Create a database and user in MySQL
```
create database dbname;
create user 'dbuser'@'%' identified by 'password'
grant all privileges on namedb.* to 'dbuser'@'%';
flush privileges;
```
Rename .env.example to .env and set up the environment
```
# ADMIN
ADMIN_MAIL=admin@gmail.com

# DATABASE
DB_HOST=localhost
DB_USER=dbuser
DB_PASS=password
DB_NAME=dbname

# JWT
JWT_KEY=secret_key

# MAILER
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=info@gmail.com
SMTP_PASS=passworrdmail
```

Install seuqelize-cli and migrate database
```
npm install -g sequelize-cli

sequelize db:create
sequelize db:migrate
```

Run de app and enjoy it
```
npm start
```

## License
MIT

**Free Software, Hell Yeah!**

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

   [NodeJs]: <https://nodejs.org/en/>
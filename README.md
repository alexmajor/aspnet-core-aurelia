# ASP .NET Core v2 with Aurelia

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisities
1. [VSCode](https://code.visualstudio.com) - recommended development environment
2. [NodeJS](https://nodejs.org/en/) with NPM for client side package management
3. [.NET Core SDK](https://www.microsoft.com/net/download/windows) - version 2.1.3 (at time of writting)
4. Microsoft SQL Server 2017 - [Developer Edition](https://www.microsoft.com/en-ca/sql-server/sql-server-downloads)

## Development

### Setup
1. Clone the repository to local
2. Open the folder in VSCode
3. In terminal navigate to the *client* folder
    - Execute `npm install` to install npm packages
3. In terminal navigate to the *server* folder
    - Execute `dotnet restore` to restore dotnet-cli packages
    - Execute `dotnet ef database update` to create local database

### Building
During development both the client and server sections of the application will need to running.
* Client - In terminal navigate to the *client* folder and execute `au run` (adding `--watch` will automtically re-complie as changes are made)
* Server - In terminal navigate to the *server* folder and execute `dotnet run`

## Built With
* **UI & Business Logic** [Aurelia](http://aurelia.io) with [Bootstrap v3](https://getbootstrap.com/docs/3.3/) styling
* **Service Layer** ASP.NET Core MVC [Web API](https://docs.microsoft.com/en-us/aspnet/core/tutorials/first-web-api)
* **Data Access** [Entity Framework Core](https://docs.microsoft.com/en-us/ef/core/)
* **Data Storage** [Microsoft SQL Server](https://www.microsoft.com/en-ca/sql-server/sql-server-downloads)

## License
<a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-sa/4.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/">Creative Commons Attribution-ShareAlike 4.0 International License</a>.
     

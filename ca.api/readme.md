ng new ca-web
npm install bootstrap
dotnet new webapi -n ca.api

dotnet add package Microsoft.EntityFrameworkCore --version 8.0.0
dotnet add package Pomelo.EntityFrameworkCore.MySql --version 8.0.0
dotnet add package Microsoft.EntityFrameworkCore.Tools --version 8.0.0
dotnet add package Microsoft.AspNetCore.Authentication.JwtBearer --version 8.0.0

dotnet ef dbcontext scaffold Name=MySqlDB Pomelo.EntityFrameworkCore.MySql --output-dir Entities --context-dir Data --namespace ca.api.Entities --context-namespace ca.api.Data --context DataContext -f --no-onconfiguring --verbose

--------------

dotnet add package Microsoft.AspNetCore.Cors
dotnet dev-certs https --trust
dotnet run --launch-profile https


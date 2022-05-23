const labsAngularBackend = require("labs-angular-backend");

new labsAngularBackend.Server().start().catch(er =>  console.error(er));

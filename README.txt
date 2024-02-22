in src/database/database.providers.ts neet to change conection information by yours.
then in terminal write: 
        npm run start

access to api/swagger by http://localhost:3000/api#/

if you got something like {
        [Nest] 6231  - 19.02.2024, 20:04:42   ERROR [ExceptionHandler] 
AggregateError: 
    at internalConnectMultiple (node:net:1114:18)
    at afterConnectMultiple (node:net:1667:5)
}
just check connection parameter and/or do run a db
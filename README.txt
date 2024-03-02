in src/database/database.providers.ts neet to change conection information by yours.
then in terminal write: 
        npm run start

access to api/swagger by http://localhost:3000/api#/
/////////////////////////////////////////////////////////////////////////////////////////
if you got something like {
        [Nest] 6231  - 19.02.2024, 20:04:42   ERROR [ExceptionHandler] 
AggregateError: 
    at internalConnectMultiple (node:net:1114:18)
    at afterConnectMultiple (node:net:1667:5)
}
just check connection parameter of db and/or do run a db
//////////////////////////////////////////////////////////////////////////////////////////
in root folder, in my example it is '4', need to create .env file, without name
file must contain information from your awsS3 bucket

AWS_ACCESS_KEY_ID=your id key 
AWS_SECRET_ACCESS_KEY=your secret key 
AWS_S3_REGION=yor region
JWT_CONSTANT=some random text

UPLOAD_RATE_TTL=60  during this time you can do UPLOAD_RATE_LIMIT request to server
UPLOAD_RATE_LIMIT=3 number of requests
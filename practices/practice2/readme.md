# Class practice

Access to dynamodb through lambda code

Create 3 lambdas. One for read, one for create-update, and one for delete

## create-update lambda

Given an update-create event: 
```
{
 "id": "randomID",
 "data": "Object containing data to create-update"
}
```

Add this data to dynamodb with id given from the event


## read lambda

Given a read event 
```
{
 "id": "id to search"
}
```

Print the data found in the database. In case of failure throw an error

## delete lambda

Given a delete event
```
{
 "id": "id to delete"
}
```

if found, delete the data



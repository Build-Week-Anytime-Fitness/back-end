# back-end

"id": "1", "personName": "Pete", "email": "petel@email.com", "isOverEighteen": true, "password": abc123, "isInstructor": false



 { "id": "1", "className": "oldie but goodie", "classType": "jazzersize", "classDate": "Monday", "startTime": 9:00am, "duration": 1, "intensity": "high", "location": "anywhere", "numberOfStudents": 10, "maxClassSize": 10 }

 ### BASE URL

 ```
    https://amazing-fitness-app.herokuapp.com

 ```

 ### Dummy Accounts

 Below are two dummy clients and two dummy instructor accounts

 ```
 Instructor# 1
 email: ca@marvel.org
 password: password

 Instructor# 2
 email: bp@marvel.org
 password: password

 Client # 1
 email: th@marvel.org
 password: password

 Client # 2
 email: gl@dc.org
 password: password

 ```

 ## Register Client /Instructor Endpoint

 | Action | Method | Route | Body |
 | ------ | ------ | ----- | ---- |
 | Register/Create | POST | /api/register | { name, email, password, is_instructor }
 | Login | POST | /api/login | {email, password} |


 ### Data Types for Registering the user

 ```
 {
     name: 'string',
     email: 'string',
     password: 'string',
     is_instructor: 'boolean'
 }
 ```

 ### Data Types for Logging In the user

 ```
 {
     email: 'string',
     password: 'string',
 }

 ```

 ### Expected Response after successful Login

 ```
 {
    "message": "welcome, Green Lantern",
    "id": 4,
    "email": "gl@dc.org",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0Ijo0LCJlbWFpbCI6ImdsQGRjLm9yZyIsImlzX2luc3RydWN0b3IiOmZhbHNlLCJpYXQiOjE2MjE3ODU5OTEsImV4cCI6MTYyMTg3MjM5MX0.Cjy0MedMrvLnIZ6PpOP5_co6BkRUau7eX-_oBtOiM8c",
    "is_instructor": false
}
 ```

 ### Expected Response after successful registration

 ```
{
        "message": "User successfully registered"
}

 ```

 ## CRUD for Instructor Fitness Classes

 | Action | Method | Route | Required |
 | ------ | ------ | ----- | -------- |
 | Fetch All Instructor Classes | GET | /api/classes | n/a |
 | Fetch All Classes by Instructor ID | GET |/api/classes/instID | append clientID to endpoint |
 | Add New Fitness Class | POST | /api/classes | see requirements below |
 | Deletes Fitness Class | DELETE | /api/classes/:id | append classID to endpoint |
 | Updates Fitness Class | PUT | /api/classes/:id | see requirements below + append classID to endpoint |


 ### Data Types for adding and updating fitness class

 ```
 {

     class_name: 'string'
     class_type: 'string'
     class_date: 'string'
     start_time : 'string'
     duration : 'number'
     intensity: 'string'
     location: 'string'
     max_class_size: 'number'
     instructor_id: 'number'
 }

 ```

 ### Expected Response after querying for classes by specific instructor

 ```

 This will return an array of objects. Each object will contain the following information

 {
    "id": 4,
    "class_name": "cardio-master",
    "class_type": "cardio",
    "class_date": "Friday",
    "start_time": "11:00 am",
    "duration": 45,
    "intensity": "high",
    "location": "living room",
    "number_of_students": 1,
    "max_class_size": 30,
    "instructor_id": 2
  },

 ```


 ### Expected Response after successfull addition of classes by the Instructor

 ```
    {
        "message": "You just added a bit of goodness to this world!"
    }
 ```

 ### Expected Response after successfully updating class information

 ```
    {
        "message": "class successfully updated!"
    }

 ```

 ### Expected Response after successfull deletion of class information

 ```
 {

    "message": "class successfully deleted!",
    "deletedClass": {
        "id": 5,
        "class_name": "Never Again",
        "class_type": "cardio",
        "class_date": "Saturday",
        "start_time": "4:00 am",
        "duration": 60,
        "intensity": "medium",
        "location": "park",
        "number_of_students": 1,
        "max_class_size": 45,
        "instructor_id": 1
    }
 }

 ```

 ## CRUD for Client Fitness Classes

 | Action | Method | Route | Required |
 | ------ | ------ | ----- | -------- |
 | Gets Fitness Classes By Client | GET | /api/clientclasses/:id | Append clientID to endpoint|
 | Sign Up for Classes | POST | /api/clientclasses | class_id is required |
 | Unenroll from Classes | DELETE | /api/clientclasses/:id | Append classID to the endpoint |


 ### Data Types for enrolling into a fitness class

 ```
 {
     class_id: 'number'
 }

 ```


 ### Expected Response after client successfully enrolls for a fitness class

 ```
 {
     "message": "You successfully signed up for Never again cardio alone"
 }

 ```

 ### Expected Response after client successfully unenrolls from a class

 ```
 {
     "message": "You will no longer be participating in roomba-zoomba"
 }
 
 ```






 

 


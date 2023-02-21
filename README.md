# Hackerz

## Online Courses Website

Hackerz is a website devloped using MERN stack which can be utilized by:

- Individual Trainees
- Corporate Trainees
- Instructors
- Admins

to do the following features :-

## Features:

### Trainees:

- Search and sort available courses suited to your preferences
- Check out the course outlines before enrolling in it
- Enroll in your most favourite courses
- Solve exercises made by verified instructors for your most favourite courses
- Take notes and download them as you watch videos uploaded by verified instructors
  -Review and rate the courses you've enrolled in!
- And if you don't like any of that! You can just request to refund the course.

### Instructors:

- Add your own courses that you wish to teach
- Add multiple subtitles according to your liking
- Link videos in your courses for the trainees to watch
- Create exercises for the trainees to solve in order to test their understanding

### Admins:

- Create corporate users on demand
- Create instructors on demand
- Accept or deny corporate user requests to enroll in courses

## Motivation

As students, we find some of the material presented to us to be somewhat restrictive, and while the internet is vast and rich in learning material, we found it a bit hard to locate step-by-step tutorials and classes that would hold our hands while learning new things. Enter Hackerz. We decided to take this into our own hands and introduce a service that has courses tailored for new learners, made by users, for users.

## Build Status

Incomplete. Wallet function for trainees still not yet implemented alongside with admins accepting refund requests. Some backend failures might appear due to no full-error prevention.

## Code Style

We opted for [prettier] as a formatter and [es-lint] as a linter. These tools help us to keep our codebase organized, readable, and up-to-date. They help us to adhere to the coding standards, and ensure that our code is free of any potential errors.

## Code Examples

### The following code is an example of a simple webpage in our coding style to show the basic course information alongside its subtitles:-

```javascript
import React, { useRef, useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
const axios = require("axios").default;
const APIURL = "http://localhost:5000";

export default function CourseView({ user }) {
  const [course, setCourse] = useState([]);
  const fetchCourse = async () => {
    const response = await axios.get(APIURL + "/courses/" + id);
    setCourse(response.data);
  };
  useEffect(() => {
    fetchCourse();
  }, []);

  return (
    <Card className="mt-4 mb-5 w-50 mx-auto">
      <Card.Header>
        {course.title} by {course.instructorUsername}
      </Card.Header>
      {course.subtitles.map((subtitle) => {
        return <Card.Text>{subtitle.title}</Card.Text>;
      })}
    </Card>
  );
}
```

## How to use

As a user you can view the website features with either having an account or not.

First of all our home page has a Navigation bar which contains a search button which will allow the guest user to search for the course they want. They can search by the course name, course subject - sort by most popular or even filter by price and rating.

A list of the available courses will be displayed in the form of cards which a user can click on in order to view more details about the course (such as: preview video, subtitles, duration and reviews of the course)

As a guest user this is the last step you can reach, however as a logged in user you can enroll in your preffered courses - which gives you access to various exercises that you can practise with as well as subtitles content alongside their respective videos. After watching videos, you are able to mark the subtitles as completed. Finally, after completion of the course, a certificate is sent to their email and can be downloaded upon request.

## Contribute

We find some of those features useful for the future of our project:

- Discussion board, where you can see people's status and the current course they are enrolled in to ask for their opinion on it

- Admin checking validity of info presented in a course or legality of it (ex. no flat earth conspiracy theorists or how to make meth)

## Tech

Hackerz uses a number of open source projects to work properly:

- [ReactJS] - HTML enhanced for web apps!
- [React Bootstrap] - great UI boilerplate for modern web apps
- [node.js] - evented I/O for the backend
- [Express] - fast node.js network app framework
- [mongoose] - JavaScript object-oriented programming library that creates a connection between MongoDB and the Node.js JavaScript runtime environment
- [Axios] - Promise based HTTP client for the browser and [node.js]

## Credits

[Learn React In 30 Minutes by Web Dev Simplified](https://www.youtube.com/watch?v=hQAHSlTtcmY)

## Installation

Hackerz requires [Node.js](https://nodejs.org/) v16+ to run.

Install the dependencies and devDependencies and start the server.

```sh
cd hackerz
npm i
node backend/server
```

Install the dependencies and deploy the frontend in another tab

```sh
npm i
npm start
```

Verify the deployment by navigating to your server address in
your preferred browser.

```sh
127.0.0.1:3000
```

## Screenshots

### Admin Panel

![Admin Panel](https://cdn.discordapp.com/attachments/959471678629503036/1060969889940123648/image.png)

### Search with filters

![Search](https://cdn.discordapp.com/attachments/959471678629503036/1060969474162954361/image.png)

### Course View as Guest

![Guest Course View](https://cdn.discordapp.com/attachments/959471678629503036/1060969688353480754/image.png)

### Course View as enrolled Trainee

![Enrolled Course View](https://cdn.discordapp.com/attachments/959471678629503036/1060971482521546773/image.png)

### Solve Exercises and view your score

![Exercise](https://cdn.discordapp.com/attachments/959471678629503036/1060971918049689740/image.png)
![Score](https://cdn.discordapp.com/attachments/959471678629503036/1060971963796967445/image.png)

## Tests

After each database change. It is preferred to check if the data got updated. For example: After changing a user's email, you can check if the email got updated by fetching this user's information using the API reference.

```http
  GET 127.0.0.1:5000/admin/get-user/${username}
```

All tests can be done via [Postman] using the API url 127.0.0.1:5000. Use the following API reference for your tests:

## API Reference

#### Get user information

```http
  GET /admin/get-user/${username}
```

| Parameter  | Type     | Description                   |
| :--------- | :------- | :---------------------------- |
| `username` | `string` | **Required**. User's username |

#### Create a new admin user

```http
  POST /admin/addadmin
```

#### Create a new instructor user

```http
  POST /admin/addinst
```

| Body       | Type     | Description                   |
| :--------- | :------- | :---------------------------- |
| `username` | `string` | **Required**. User's username |
| `password` | `string` | **Required**. User's password |

#### Create a new corporate trainee user

```http
  POST /admin/addcorp
```

| Body       | Type     | Description                   |
| :--------- | :------- | :---------------------------- |
| `username` | `string` | **Required**. User's username |
| `password` | `string` | **Required**. User's password |

#### Create a new individual trainee user

```http
  POST /admin/addindiv
```

| Body       | Type     | Description                   |
| :--------- | :------- | :---------------------------- |
| `username` | `string` | **Required**. User's username |
| `password` | `string` | **Required**. User's password |

#### Get corporate course requests

```http
  GET /admin/corp-requests
```

#### Accept a pending corporate course request

```http
  POST /admin/${id}/accept
```

| Params | Type     | Description                          |
| :----- | :------- | :----------------------------------- |
| `id`   | `string` | **Required**. Corporate Request's ID |

#### Reject a pending corporate course request

```http
  POST /admin/${id}/reject
```

| Params | Type     | Description                          |
| :----- | :------- | :----------------------------------- |
| `id`   | `string` | **Required**. Corporate Request's ID |

#### Get enrolled in a course as an individual trainee

```http
  POST /trainee/${user}/${course}/enroll
```

| Params   | Type     | Description                   |
| :------- | :------- | :---------------------------- |
| `user`   | `string` | **Required**. User's username |
| `course` | `string` | **Required**. Course's ID     |

#### Check if an individual trainee is enrolled in a course

```http
  GET /trainee/${user}/${course}/isEnrolled
```

| Params   | Type     | Description                   |
| :------- | :------- | :---------------------------- |
| `user`   | `string` | **Required**. User's username |
| `course` | `string` | **Required**. Course's ID     |

#### Returns all enrolled courses for a trainee

```http
  GET /trainee/${user}/myCourses
```

| Params | Type     | Description                   |
| :----- | :------- | :---------------------------- |
| `user` | `string` | **Required**. User's username |

#### Save trainee's score in an exercise

```http
  POST /trainee/${user}/${exercise}/save-score
```

| Params     | Type     | Description                   |
| :--------- | :------- | :---------------------------- |
| `user`     | `string` | **Required**. User's username |
| `exercise` | `string` | **Required**. Exercise ID     |

| Body    | Type     | Description                               |
| :------ | :------- | :---------------------------------------- |
| `score` | `string` | **Required**. Trainee's score in exercise |

#### Trainee marks subtitle as completed

```http
  POST /trainee/${user}/${subtitle}/complete
```

| Params     | Type     | Description                   |
| :--------- | :------- | :---------------------------- |
| `user`     | `string` | **Required**. User's username |
| `subtitle` | `string` | **Required**. Subtitle ID     |

#### Checks if trainee completed a subtitle

```http
  GET /trainee/${user}/${subtitle}/isCompleted
```

| Params     | Type     | Description                   |
| :--------- | :------- | :---------------------------- |
| `user`     | `string` | **Required**. User's username |
| `subtitle` | `string` | **Required**. Subtitle ID     |

#### Returns trainee's progress in a course in percentage

```http
  GET /trainee/${user}/${course}/progress
```

| Params   | Type     | Description                   |
| :------- | :------- | :---------------------------- |
| `user`   | `string` | **Required**. User's username |
| `course` | `string` | **Required**. Course ID       |

#### Trainee adds a review for a course

```http
  POST /trainee/${user}/${course}/add-review
```

| Params   | Type     | Description                   |
| :------- | :------- | :---------------------------- |
| `user`   | `string` | **Required**. User's username |
| `course` | `string` | **Required**. Course ID       |

#### Returns all reviews for a course

```http
  GET /trainee/${course}/reviews
```

| Params   | Type     | Description             |
| :------- | :------- | :---------------------- |
| `course` | `string` | **Required**. Course ID |

#### Returns all instructors

```http
  GET /instructor
```

#### Updates instructor rating

```http
  PUT /instructor/${user}
```

| Params | Type     | Description                         |
| :----- | :------- | :---------------------------------- |
| `user` | `string` | **Required**. Instructor's username |

| Body     | Type     | Description                |
| :------- | :------- | :------------------------- |
| `rating` | `number` | **Required**. Rating (1-5) |

#### Get information about instructor

```http
  GET /instructor/${user}
```

| Params | Type     | Description                         |
| :----- | :------- | :---------------------------------- |
| `user` | `string` | **Required**. Instructor's username |

#### Get courses taught by specific instructor

```http
  GET /instructor/${user}/my-courses
```

| Params | Type     | Description                         |
| :----- | :------- | :---------------------------------- |
| `user` | `string` | **Required**. Instructor's username |

| Query      | Type     | Description                               |
| :--------- | :------- | :---------------------------------------- |
| `query`    | `string` | **Not Required**. Search by query         |
| `minPrice` | `string` | **Not Required**. Filter by minimum price |
| `maxPrice` | `string` | **Not Required**. Filter by maximum price |
| `subject`  | `string` | **Not Required**. Filter by subject name  |

#### Instructor can create a course

```http
  POST /instructor/${user}/add-course
```

| Params | Type     | Description                         |
| :----- | :------- | :---------------------------------- |
| `user` | `string` | **Required**. Instructor's username |

| Body          | Type     | Description                                        |
| :------------ | :------- | :------------------------------------------------- |
| `title`       | `string` | **Required**. Course title                         |
| `description` | `string` | **Not Required**. Course description               |
| `price`       | `string` | **Required**. Course price                         |
| `subject`     | `string` | **Required**. Course subject                       |
| `subtitles`   | `string` | **Not Required**. Course subtitles                 |
| `previewURL`  | `string` | **Not Required**. Course preview video youtube URL |

#### Edit instructor biography

```http
  POST /instructor/${user}/editbiography
```

| Params | Type     | Description                         |
| :----- | :------- | :---------------------------------- |
| `user` | `string` | **Required**. Instructor's username |

| Body            | Type     | Description                          |
| :-------------- | :------- | :----------------------------------- |
| `userbiography` | `string` | **Required**. Updated user biography |

#### Edit instructor email

```http
  POST /instructor/${user}/editusermail
```

| Params | Type     | Description                         |
| :----- | :------- | :---------------------------------- |
| `user` | `string` | **Required**. Instructor's username |

| Body        | Type     | Description                      |
| :---------- | :------- | :------------------------------- |
| `useremail` | `string` | **Required**. Updated user email |

#### Edit instructor email

```http
  POST /home/register
```

| Params            | Type     | Description                       |
| :---------------- | :------- | :-------------------------------- |
| `username`        | `string` | **Required**. User's username     |
| `userpassword`    | `string` | **Required**. User's password     |
| `confirmpassword` | `string` | **Required**. To confirm password |
| `usercountry`     | `string` | **Required**. User's country      |
| `useremail`       | `string` | **Required**. User's email        |

#### Search courses

```http
  GET /courses
```

| Query           | Type     | Description                                      |
| :-------------- | :------- | :----------------------------------------------- |
| `query`         | `string` | **Not Required**. Search by query                |
| `minPrice`      | `string` | **Not Required**. Filter by minimum price        |
| `maxPrice`      | `string` | **Not Required**. Filter by maximum price        |
| `subject`       | `string` | **Not Required**. Filter by subject name         |
| `rating`        | `string` | **Not Required**. Filter by course rating        |
| `sortByPopular` | `string` | **Not Required**. Filter by most popular courses |

#### Get course information

```http
  GET /courses/${id}
```

| Params | Type     | Description             |
| :----- | :------- | :---------------------- |
| `id`   | `string` | **Required**. Course ID |

#### Get exercises in a specific course

```http
  GET /courses/${course}/get-exercises
```

| Params   | Type     | Description             |
| :------- | :------- | :---------------------- |
| `course` | `string` | **Required**. Course ID |

#### Add exercise to a specific course

```http
  POST /courses/${course}/add-exercise
```

| Params   | Type     | Description             |
| :------- | :------- | :---------------------- |
| `course` | `string` | **Required**. Course ID |

#### Update course rating

```http
  PUT /courses/${id}
```

| Params | Type     | Description             |
| :----- | :------- | :---------------------- |
| `id`   | `string` | **Required**. Course ID |

#### Get subtitle information

```http
  GET /courses/${course}/${subtitle}/get-subtitle
```

| Params     | Type     | Description               |
| :--------- | :------- | :------------------------ |
| `course`   | `string` | **Required**. Course ID   |
| `subtitle` | `string` | **Required**. Subtitle ID |

## Licenses

- [MIT]
- [Apache 2.0]

[//]: # "These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax"
[git-repo-url]: https://github.com/Advanced-Computer-Lab-2022/hackerz.git
[node.js]: http://nodejs.org
[express]: http://expressjs.com
[angularjs]: http://angularjs.org
[mongoose]: https://mongoosejs.com/docs/documents.html
[react bootstrap]: https://react-bootstrap.github.io
[reactjs]: https://reactjs.org/docs/getting-started.html
[mit]: https://choosealicense.com/licenses/mit/
[apache 2.0]: https://www.apache.org/licenses/LICENSE-2.0
[prettier]: https://prettier.io/
[es-lint]: https://eslint.org/
[axios]: https://github.com/axios/axios
[postman]: https://www.postman.com/

# Todo App

A simple to-do application built using Node.js, Express, and MongoDB, demonstrating RESTful routes for managing tasks efficiently.

## Features

- **Add Tasks**: Create new to-dos with task name, due date, and importance category.
- **View Tasks**: Display a list of all tasks.
- **Edit Tasks**: Update task details including name, due date, and importance.
- **Delete Tasks**: Remove tasks that are no longer needed.
- **Importance Categories**: Choose between "Normal", "Important", and "Urgent".
- **Responsive Design**: Styled with Bootstrap for a consistent and modern interface.

## Technologies Used

- **Backend**: Node.js, Express.js
- **Frontend**: EJS templates with Bootstrap for styling
- **Database**: MongoDB
- **Styling**: Bootstrap (CDN link for integration)
- **Utilities**: Moment.js for date formatting, Method-Override for HTTP verb support
- **Environment**: Node.js with MongoDB

## Prerequisites

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- A package manager like npm or yarn.

## RESTful Routes

| HTTP Method | Route       | Description               |
| ----------- | ----------- | ------------------------- |
| GET         | `/`         | List all tasks            |
| GET         | `/new`      | Form to create a new task |
| POST        | `/`         | Create a new task         |
| GET         | `/:id`      | View a specific task      |
| GET         | `/:id/edit` | Form to edit a task       |
| PUT         | `/:id`      | Update a task             |
| DELETE      | `/:id`      | Delete a task             |

## License

This project is licensed under the MIT License.

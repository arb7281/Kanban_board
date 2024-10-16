# Kanban Board Project

This is a Kanban Board project built using React. The project allows users to create, update, and manage tasks across different lanes (To Do, In Progress, Done). It utilizes a JSON server for handling the backend data.

## Features

- **Task Management**: Add, edit, and delete tasks.
- **Drag-and-Drop Functionality**: Easily move tasks between lanes.
- **Persistent Data**: Tasks are stored in a JSON server and persist across sessions.

## Table of Contents

1. [Setup Instructions](#setup-instructions)
2. [Running the JSON Server](#running-the-json-server)
3. [Running the React Application](#running-the-react-application)
4. [Technologies Used](#technologies-used)

## Setup Instructions

### Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v14 or above)
- [npm](https://www.npmjs.com/) (v6 or above)
- [Git](https://git-scm.com/)

### Clone the Repository

```bash
git clone https://github.com/your-username/kanban-board.git
cd kanban-board

## Running the JSON Server

The JSON server is used to mock the backend API. It provides RESTful routes for our tasks.

### Step 1: Install JSON Server

First, install the JSON server globally using npm:

```bash
npm install -g json-server

### Step 2: Set Up JSON Server

Navigate to the project directory and start the JSON server:

```bash
json-server --watch db.json --port 3000

This will start the JSON server on http://localhost:3000, and it will serve the data from the db.json file.


### db.json

The `db.json` file contains the initial data for your Kanban board. You can customize this file to include different tasks and properties as needed. Here’s an example of what your `db.json` file might look like:

```json
{
  "tasks": [
    {
      "id": 1,
      "title": "Design the landing page",
      "lane": "To Do",
      "priority": "High",
      "deadlineDate": "2024-09-01",
      "userId": 1
    },
    {
      "id": 2,
      "title": "Develop the authentication module",
      "lane": "In Progress",
      "priority": "Medium",
      "deadlineDate": "2024-09-10",
      "userId": 2
    }
    // Add more tasks here
  ]
}


## Running the React Application

Once the JSON server is running, you can start the React application.

### Step 1: Install Dependencies

If you haven't already, install the required npm packages by running:

```bash
npm install

### Step 2: Start the React Application

Start the development server:
```bash
npm start

This will start the React application on http://localhost:3001. The app will automatically connect to the JSON server running on port 3000.

## Technologies Used

- **React**: A JavaScript library for building user interfaces. It allows for the creation of reusable UI components and manages the state of the application efficiently.
- **React Bootstrap**: A popular library that provides Bootstrap components as React components, facilitating the creation of responsive and modern UI elements.
- **Redux Toolkit**: A set of tools and best practices for managing global state in a React application, making it easier to handle state changes and side effects.
- **JSON Server**: A simple tool for creating a full fake REST API with zero coding. It is used here to mock the backend and provide persistent storage for the Kanban tasks.



# BookSearchApp

**BookSearchApp** is a full-stack application that allows users to search for books, view detailed information, and save their favorite books to their personal collection. It utilizes the Google Books API for book data and GraphQL for efficient querying.

## Features

- **Search for Books**: Users can search for books by title, author, or genre.
- **Book Details**: View detailed information about each book, including title, author(s), description, and more.
- **Save Favorite Books**: Users can save books to their personal collection.
- **Responsive Design**: The app is fully responsive and works on both desktop and mobile devices.

## Tech Stack

- **Frontend**: React, Apollo Client, GraphQL
- **Backend**: Node.js, Express.js, Apollo Server, GraphQL
- **Database**: MongoDB (for saved books)
- **API**: Google Books API (for book search)
- **Authentication**: JWT for user login and registration
- **Deployment**: Render, Heroku, or Netlify for deployment

## Installation

### Run the project in local:

```
git clone https://github.com/Anshul1555/BookFinder.git
cd BookFinder
npm i
npm run build
npm run develop

```

## Usage

- **Search for Books**: Enter a book title, author, or keyword in the search bar, and the app will display a list of books that match the search criteria.
- **Save Books**: Users can save books to their personal collection by clicking the "Save" button on each book’s details page.
- **View Saved Books**: Go to the saved books page to view all books saved by the user.

## API

### GraphQL Endpoints

- **GET /graphql**: The primary endpoint for interacting with the GraphQL API.

#### Example Query: Search for Books

query SearchBooks($query: String!) {
searchBooks(query: $query) {
title
authors
description
imageLinks {
thumbnail
}
}
}`

Example Mutation: Save a Book
mutation SaveBook($title: String!, $author: String!, $description: String!) {
saveBook(title: $title, author: $author, description: $description) {
\_id
title
author
}
}

## Contributing

We welcome contributions to improve this project! If you find any bugs or have suggestions for new features, please feel free to create an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

If you have any questions, feel free to contact me at [anshulsharma9366@gmail.com].

## Video:

https://github.com/user-attachments/assets/e0f80cb5-b0ea-47d7-925e-c14baa43379f

### Breakdown:

- **Features**: Lists the key features of your app (book search, save favorites, etc.).
- **Tech Stack**: Describes the technologies used in the project (React, GraphQL, Node.js, MongoDB, Google Books API).
- **Installation**: Provides clear instructions for setting up and running the project locally.
- **API**: Gives examples of how to interact with the GraphQL API for both querying and mutations.
- **Contributing**: Encourages others to contribute to the project.
- **License and Contact**: Standard sections for open-source projects.

This should be a clean and straightforward README format without unnecessary code block formatting. Let me know if you need further adjustments!

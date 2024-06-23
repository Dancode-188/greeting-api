# Greeting API



This project is a simple Node.js application that exposes an API endpoint for generating personalized greetings. It is built using the Express framework and includes various enhancements to showcase creativity and technical skills.



## Features


- API endpoint: `/api/hellovisitor`

- Accepts a `name` query parameter to generate a personalized greeting

- Returns the client's IP address, current timestamp, server hostname, and the greeting message

- Implements error handling and input validation

- Includes rate limiting to prevent excessive requests from a single client

- Utilizes caching to improve performance for frequently requested names

- Provides logging functionality to track important events and requests



## Prerequisites

- Node.js (version >= 12)

- npm (Node Package Manager)



## Installation



1. Clone the repository:



  ```

  git clone https://github.com/yourusername/greeting-api.git

  ```



2. Navigate to the project directory:



  ```

  cd greeting-api

  ```



3. Install the dependencies:



  ```

  npm install

  ```



## Usage

1. Start the server:



  ```

  npm start

  ```



  The server will start running on `http://localhost:3000`.



2. Make a GET request to the API endpoint:



  ```

  http://localhost:3000/api/hellovisitor?name=Mark

  ```



  Replace `Mark` with the desired name.



3. The API will respond with a JSON object containing the client's IP address, current timestamp, server hostname, and the personalized greeting message.



## API Endpoint

- **URL**: `/api/hellovisitor`

- **Method**: GET

- **Query Parameters**:

 - `name` (optional): The name to be included in the greeting. If not provided, the default value is "Visitor".

- **Response**:

 - `client_ip`: The IP address of the client making the request.

 - `timestamp`: The current timestamp in ISO format.

 - `hostname`: The hostname of the server.

 - `greeting`: The personalized greeting message.



## Error Handling



The API implements error handling middleware to gracefully handle any errors that occur during the request processing. If an error occurs, the API will respond with a 500 Internal Server Error status code and an error message.



## Input Validation



The `name` query parameter is validated to ensure it meets certain criteria. If the name exceeds a maximum length of 20 characters, the API will respond with a 400 Bad Request status code and an appropriate error message.



## Rate Limiting

The API includes rate limiting functionality to prevent excessive requests from a single client. It utilizes the `express-rate-limit` middleware to limit each IP address to 100 requests per 15 minutes. If the limit is exceeded, the API will respond with a 429 Too Many Requests status code.



## Caching

To improve performance, the API implements caching for frequently requested names. It uses the `node-cache` library to store the responses for commonly requested names. Before processing each request, the API checks if the response is already cached and returns it directly, reducing the server's processing overhead.


## Logging

The API incorporates logging functionality to track important events and requests. It utilizes the \`winston\` library to log incoming requests, including the `name` parameter and the corresponding response. The logs are stored in the `app.log` file.


## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvement, please open an issue or submit a pull request.


## License

This project is licensed under the [MIT License](LICENSE).
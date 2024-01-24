# This project provides your custom home page for your browser. You can setup it the way you want!

## Stack:

### Backend: 
Python, FastAPI, SQLAlchemy, Postgres

### Frontend:
NextJS, Typescript, Tailwind, Shadcn/UI


# Docs for Development

### Backend Response Templates:

```js
{
    status: 200;
    title: "HTTP 200: OK";
    description: "The request has succeeded.";
    details: null;
    payload: [{
        // If it's get method, some payload here
    }];
}

{
    status: 500;
    title: "HTTP 500: Internal Server Error";
    description: "The server encountered an unexpected condition which prevented it from fulfilling the request.";
    details: null;
    payload: null;
}

{
    status: 422;
    title: "HTTP 500: Unprocessable Entity";
    description: "You've sent wrong data";
    details: {
        // Contains details FastAPI generates for 422 HTTP error
    };
    payload: null;
}
```
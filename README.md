# Spring Boot REST API with Spring Security 🔒, Spring HATEOAS 📃, and Thymeleaf 🍃

Simple Spring Boot API that utilizes [OMDB API](http://www.omdbapi.com/) to allow users to search for movies and save them in their personal account.

This projects assumes that the backend DB is PostgreSQL. 

To use with PostgreSQL, you will need to `setx DB_PASS <password>` or `export DB_PASS=<password>`. (or just edit the whole `application.properties`).

Example usage: 

~~~json
GET /user/<id>
{
    "id": "3c934579-f734-44af-974d-e1e2ec78afed",
    "email": "test@test.gr",
    "links": [
        {
            "rel": "self",
            "href": "http://localhost:8080/user/3c934579-f734-44af-974d-e1e2ec78afed"
        },
        {
            "rel": "movies",
            "href": "http://localhost:8080/user/3c934579-f734-44af-974d-e1e2ec78afed/movies"
        }
    ]
}
~~~

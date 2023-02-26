
# Netflix Clone API

open source API for movies app build by Node JS / Express JS / Mongo DB  with another technologies like : 
 - JWT -> Json Web Token (instead sessions)
 - Bcrypt -> Data Encryption
    

## Installation

Clone the project

```bash
  git clone https://github.com/achraflafkiri/restful-movie-app.git
```

Go to the project directory

```bash
  cd restful-movie-app
```

Install dependencies

```bash
  npm install
```

Configure `.env` file with this variables :
- `PORT` -> localhost port
- `DB_URL` -> your mongo db url
- `SECRET_KEY` -> the key that the JWT will use

Start the server

```bash
  npm run start
```


## Requests

AUTH
```bash
/api/v1/auth/register   [POST]
/api/v1/auth/login      [POST]
```

USERS
```bash
/api/v1/users        [GET]
/api/v1/users/:id    [GET]
/api/v1/users/:id    [PATCH]
/api/v1/users/:id    [DELETE]
```

MOVIES
```bash
/api/v1/movies        [GET]
/api/v1/movies        [POST]
/api/v1/movies/:id    [GET]
/api/v1/movies/:id    [PATCH]
/api/v1/movies/:id    [DELETE]
```

LISTS
```bash
/api/v1/lists        [GET]
/api/v1/lists        [POST]
/api/v1/lists/:id    [DELETE]
```




## Queries


USERS
```bash
/api/v1/users/?limit=10  [GET]
```

MOVIES
```bash
/api/v1/movies/?genre=romantic  [GET]
/api/v1/movies/?type=serie      [GET]

```

LISTS
```bash
/api/v1/lists/?genre=romantic  [GET]
/api/v1/lists/?type=serie      [GET]
``` 




## 🔗 Links
[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://ahmedmahmoud929.github.io/am-portfolio-mern/)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/ahmed-mahmoud-24b49621b/)
[![facebook](https://img.shields.io/badge/facebook-1DA1F2?style=for-the-badge&logo=facebook&logoColor=white)](https://www.facebook.com/profile.php?id=100028876007672)


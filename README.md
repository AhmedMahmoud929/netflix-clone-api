
# Netflix Clone API

open source API for movies app build by Node JS / Express JS / Mongo DB  with another technologies like : 
 - JWT -> Json Web Token (instead sessions)
 - Bcrypt -> Data Encryption
    

## Installation

Clone the project

```bash
  git clone https://github.com/AhmedMahmoud929/netflix-clone-api
```

Go to the project directory

```bash
  cd netflix-clone-api
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
/api/auth/register   [POST]
/api/auth/login      [POST]
```

USERS
```bash
/api/users        [GET]
/api/users/:id    [GET]
/api/users/:id    [PATCH]
/api/users/:id    [DELETE]
```

MOVIES
```bash
/api/movies        [GET]
/api/movies        [POST]
/api/movies/:id    [GET]
/api/movies/:id    [PATCH]
/api/movies/:id    [DELETE]
```

LISTS
```bash
/api/lists        [GET]
/api/lists        [POST]
/api/lists/:id    [DELETE]
```




## Queries


USERS
```bash
/api/users/?limit=10  [GET]
```

MOVIES
```bash
/api/movies/?genre=romantic  [GET]
/api/movies/?type=serie      [GET]

```

LISTS
```bash
/api/lists/?genre=romantic  [GET]
/api/lists/?type=serie      [GET]
``` 




## 🔗 Links
[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](ahmedmahmoud929.github.io/am-portfolio-mern/)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/ahmed-mahmoud-24b49621b/)
[![facebook](https://img.shields.io/badge/facebook-1DA1F2?style=for-the-badge&logo=facebook&logoColor=white)](https://www.facebook.com/profile.php?id=100028876007672)


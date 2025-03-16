# adopt-a-seed-api

## start the backend

firstly you need to create a .env file

```
DATABASE_URL="<changeme>"
SECRET_KEY="<changeme>"
ALGORITHM="<changeme>"
ACCESS_TOKEN_EXPIRE_MINUTES=<changeme>
OLLAMA_MODEL="gemma3:4b"
OLLAMA_URL="http://ollama:11434"
```

```bash
uv run main.py
```

## swagger

http://127.0.0.1:8000/docs

### setup some mock data

```bash
curl --location --request POST 'http://127.0.0.1:8000/seeds/fill'
curl --location --request POST 'http://127.0.0.1:8000/seed_databases/fill'
curl --location --request POST 'http://127.0.0.1:8000/seed_databases/seeds/fill'
curl --location --request POST 'http://127.0.0.1:8000/plants/fill'
```

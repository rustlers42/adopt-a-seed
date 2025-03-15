# start the backend

```bash
uv run main.py
```

# swagger

http://127.0.0.1:8000/docs

## setup some mock data

```bash
curl --location --request POST 'http://127.0.0.1:8000/seeds/fill'
curl --location --request POST 'http://127.0.0.1:8000/seed_databases/fill'
curl --location --request POST 'http://127.0.0.1:8000/seed_databases/seeds/fill'
curl --location --request POST 'http://127.0.0.1:8000/plants/fill'
```

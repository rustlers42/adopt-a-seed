# Adopt-a-Seed

## Frontend

[Frontend README](./adopt-a-seed/README.md)

## Backend

[Backend README](./adopt-a-seed-api/README.md)

## Additional Services

- [Ollama](https://ollama.com)

## Start Everything with a Single Command

For simplicity, there is a single command to start everything. This command will start the frontend, backend, and additional services. It will also build the frontend and backend images.

```bash
docker compose up --build
```

## What's Currently Working

- [x] Users can log in (with JWT tokens)
- [x] There is a leaderboard
- [x] Users can see all available seed databases
- [x] Users can adopt a seed
- [x] Users can return a seed
- [x] Users can see the seeds they have adopted
- [x] Users can track the progress of the seeds they have adopted
- [x] AI-generated telemetry data based on a survey
- [x] AI-generated growing tips for users to take care of the seed
- [x] Usage of a local Ollama instance

## Next Steps

- [ ] Implement a management system for seed databases
- [ ] Implement a one-time-password system to verify that the user has returned the new seeds to the seed database
- [ ] A store where users can purchase growing supplies with Plant-a-Seed coins

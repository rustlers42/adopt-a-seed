# adopt-a-seed

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
- [x] There is a leaderboard where individuals can challenge each other
- [x] Users can see all available seed databases
- [x] Users can adopt a seed
- [x] Users can return a seed
- [x] Users can see the seeds they have adopted
- [x] Users can track the progress of the seeds they have adopted
- [x] There are rewards where users can earn adopt-a-seed coins
- [x] AI-generated telemetry data based on a survey
- [x] AI-generated growing tips for users to take care of the seed
- [x] Usage of a local Ollama instance

## Next Steps

- [ ] A management system for seed databases
- [ ] A one-time-password system to verify that the user has returned the new seeds to the seed database
- [ ] A detailed view for the seed databases and improved first contact experience
- [ ] A store where users can purchase growing supplies with adopt-a-seed coins
- [ ] A seed recommendation system from the seed database
- [ ] Recommendations based on the season or the user's location
- [ ] A user profile page
- [ ] Track images of the seeds/plants in the grow history

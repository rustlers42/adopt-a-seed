# Adopt-A-Seed

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

- [x] Landing page
- [x] Users can log in (with JWT tokens)
- [x] Users can log out
- [x] Guests & Users can see a leaderboard
- [x] Guests & Users can see all available seed databases and search them
- [x] Users can see all relevant events for them
- [x] Users can see growth & telemetry events for selected plants
- [x] Users can adopt a seed from a seed database
- [x] Users can adopt a seed they got themselves
- [x] Users can return a seed
- [x] Users can see the seeds they have adopted
- [x] Users can track the progress of the seeds they have adopted
- [x] Users have a Köppen climate classification
- [x] Tracking the progress of a plant rewards Adopt-A-Seed coins
- [x] Returning a seed rewards Adopt-A-Seed coins using OTP tokens
- [x] AI-generated telemetry data based on a survey and user climate zone
- [x] AI-generated growing tips for users to take care of the seed based on past survey results
- [x] Algorithm which decides whether the next growth state has been reached
- [x] Usage of a local Ollama instance

## Next Steps

- [ ] A login/management system for the seed databases
- [ ] Seed databases can see the state of all seeds they have given out
- [ ] Generation of OTP for seed databases (currently 000-000 is always valid)
- [ ] A detailed view for the seed databases and improved first contact experience
- [ ] Option to order seeds via mail
- [ ] A seed recommendation system from the seed database
- [ ] Recommendations based on the season or the user's location (we already store the climate zone)
- [ ] A user profile page
- [ ] Track images of the seeds/plants in the growth history
- [ ] Signup/Onboarding
- [ ] Track time of plants
- [ ] Option to link user account with cryptocurrency wallet
- [ ] Smart contracts to generate Adopt-A-Seed cryptocurrency for users

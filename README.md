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

## UN SDG Goals we are aiming for

### Zero Hunger

"End hunger, achieve food security and improved nutrition, and promote sustainable agriculture"

- **Seed Adoption and Distribution**: Facilitates easier access to diverse, nutritious plants, potentially increasing food security through household or community gardening.
- **AI-generated Growing Tips**: Equips users with personalized information to grow edible plants more effectively, improving nutrition and yield.
- **Climate-Based Seed Recommendations**: Matching seeds to the user's Köppen climate classification ensures higher success rates, maximizing crop yields and minimizing resource waste.

### Sustainable Cities and Communities

"Make cities and settlements inclusive, safe, resilient and sustainable"

- **Community Engagement through Leaderboard and Events**: Promotes sustainable urban gardening practices by engaging community members, encouraging participation, and fostering urban green spaces.
- **Plant Tracking and Reward System**: Incentivizes continuous user engagement, increasing sustainability awareness and long-term commitment to greener urban living.

### Life on Land

"Take urgent action to combat climate change and its impacts"

- **AI-generated Climate-Sensitive Telemetry and Tips**: Encourages users to adopt plants suitable for their climate zones, promoting resilience to climate impacts.
- **Growth State Algorithm**: Encourages sustainable gardening practices and environmental awareness by rewarding user efforts and successful plant management.
- **User Climate Awareness**: Users learn about their climate classification, raising awareness and informing actions to reduce environmental impact.

### Climate Action

"Protect and restore terrestrial ecosystems and promote their sustainable use, manage forests sustainably, combat desertification, stop and reverse land degradation, and stop the loss of biodiversity"

- **Promotion of Biodiversity**: Provides diverse seed databases, enabling users to grow and conserve various plant species.
- **Adoption and Return System**: Encourages users to sustainably engage with plant species, enhancing the conservation of terrestrial ecosystems.
- **Seed Tracking and Growth History**: Helps users see their direct impact on plant life, encouraging sustained efforts in biodiversity conservation and restoration efforts.

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
- [x] Tracking the progress of a plant rewards adopt-a-seed coins
- [x] Returning a seed rewards adopt-a-seed coins using OTP tokens
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
- [ ] Smart contracts to generate adopt-a-seed cryptocurrency for users

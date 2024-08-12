# Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Development Server

Start the development server on `http://localhost:3000`:

### Launch project using Docker
```bash 
# Build & Install full project
$ make start

# Run images
$ make up
```

### Container access and DB setup
```bash 
# Container access
$ make debug

# If needed migrate schema.prisma
$ yarn prisma migrate dev --name init
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

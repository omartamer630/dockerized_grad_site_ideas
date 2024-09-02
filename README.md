# Dockerized Grad_site_ideas

This project is a Dockerized version of [Grad_site_ideas](https://github.com/Khemu1), a web application designed and developed by [Khemu1](https://github.com/Khemu1). The Dockerization and deployment on AWS EC2 were handled by [omartamer630](https://github.com/omartamer630).

## Table of Contents

- [About the Project](#about-the-project)
- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Dockerization](#dockerization)
- [Deployment](#deployment)
- [Contributing](#contributing)

## About the Project

Grad Ideas is a collaborative platform where students can submit, share, and explore innovative project ideas. Designed to foster creativity and teamwork, this web application allows users to propose new concepts, comment on submissions, and connect with peers who share similar interests. The Dockerized version streamlines the deployment and setup process, enabling the application to run seamlessly in isolated containers for consistent performance and ease of management.

## Getting Started

These instructions will guide you on how to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Docker installed on your machine.
- Docker Compose installed.
- AWS account with access to EC2.
- Basic knowledge of Docker, Docker Compose, and AWS EC2.

### Installation
 **Pull Image:**
 ```bash
 https://hub.docker.com/repository/docker/omartamer12/grad_site_ideas
```
Or **Clone the Repository:**
   
```bash
   git clone git@github.com:omartamer630/grad_site_ideas.git
   cd dockerized-Grad_site_ideas
```
   
### Dockerization

# This project has been dockerized to simplify the development and deployment process.
# Docker allows the application to run in isolated containers, ensuring consistency
# across different environments.

# To build the Docker image, use the following command
```bash
docker compose up --build -d
```
# The application will be accessible at

```bash
http://localhost:80
```
or
```bash
http://ec2-13-38-230-173.eu-west-3.compute.amazonaws.com:3000/
```
for browser search.

### Deployment

# The application is deployed using AWS EC2. The Docker container is hosted
# on an EC2 instance, which allows it to be accessed remotely.

# The application will be accessible via the EC2 instance's public IP or domain.
```bash
docker compose up -d
```
### Contributing

# Contributions are welcome! If you'd like to contribute, please fork the repository
# and create a new branch for your feature or bugfix. Once your changes are ready,
# submit a pull request for review.

# Steps to contribute:
# 1. Fork the repository
# 2. Create a new branch (e.g., `feature/your-feature-name`)
# 3. Commit your changes
# 4. Push to the branch
# 5. Submit a pull request

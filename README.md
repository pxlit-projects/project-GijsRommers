# Fullstack Java Project

## Gijs Rommers (3-AON-B)
Change the name and Class in the title above

## Folder structure

- Readme.md
- _architecture_: this folder contains documentation regarding the architecture of your system.
- `docker-compose.yml` : to start the backend (starts all microservices)
- _backend-java_: contains microservices written in java
- _demo-artifacts_: contains images, files, etc that are useful for demo purposes.
- _frontend-web_: contains the Angular webclient

Each folder contains its own specific `.gitignore` file.  
**:warning: complete these files asap, so you don't litter your repository with binary build artifacts!**

## How to setup and run this application

:heavy_check_mark:_(COMMENT) Add setup instructions and provide some direction to run the whole  application: frontend to backend._

## How to run
### General
- Requirements
    - Java 21
    - Docker (Desktop) With Docker Compose

- Clone the repository by running: 
```sh
git clone https://github.com/pxlit-projects/project-GijsRommers.git
```
### Frontend:
- Open termnal in root folder (the one this README.md is located)
- run the following command: 
```sh
docker-compose up
```
- This will deploy the frontend using NGINX 
    - You can access it via http://localhost
- It also deploys the PostgreSQL and RabbitMQ for the backend

### Backend
- Open the backend-java/ExamenProject in IntelliJ
- Create three databases in the Postgres instance
    - We recommend using the database tool in IntelliJ 
    - commentservice
    - postservice
    - reviewservice
- Launch the microservices
    - Make sure the Config microservice launches first! 
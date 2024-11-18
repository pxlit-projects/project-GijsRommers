# Architecture

### Blog Platform - Container View

Het platform is opgebouwd uit meerdere microservices die via RabbitMQ en een Spring Gateway communiceren. Netflix Eureka wordt gebruikt voor service discovery. Elke service heeft een specifieke verantwoordelijkheid:  

- **Post Service**: Beheert blogposts (CRUD-operaties).  
- **Review Service**: Verwerkt beoordelingen van blogposts.  
- **Comment Service**: Beheert reacties op blogposts.  
- **Config Service**: Centrale configuratie voor alle microservices.  
- **RabbitMQ**: Asynchrone berichtuitwisseling tussen microservices.  
- **Spring Gateway**: API-gateway voor routing en beveiliging.  


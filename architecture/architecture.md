# Architecture

### Blog Platform - Container View

Het platform is opgebouwd uit meerdere microservices die via RabbitMQ en een Spring Gateway communiceren. Netflix Eureka wordt gebruikt voor service discovery. Elke service heeft een specifieke verantwoordelijkheid:  

- **Post Service**: Beheert blogposts (CRUD-operaties).  
- **Review Service**: Verwerkt beoordelingen van blogposts.  
- **Comment Service**: Beheert reacties op blogposts.  
- **Config Service**: Centrale configuratie voor alle microservices.  
- **RabbitMQ**: Asynchrone berichtuitwisseling tussen microservices.  
- **OpenFeign**: Synchrone berichtuitwisseling tussen microservices
- **Spring Gateway**: API-gateway voor routing en beveiliging.  


### Wanneer gebruiken we synchrone en asynchrone communicatie?

In ons platform gebruiken we zowel synchrone als asynchrone communicatie tussen microservices, afhankelijk van de aard van de interactie en de vereisten voor prestaties en betrouwbaarheid.

- **Synchrone communicatie** (via OpenFeign) wordt gebruikt wanneer directe respons en bevestiging nodig zijn. Dit is handig voor operaties waarbij de gebruiker onmiddellijk feedback verwacht, zoals het ophalen van comments en Reviews.

- **Asynchrone communicatie** (via RabbitMQ) wordt gebruikt voor taken die niet onmiddellijk voltooid hoeven te worden en waarbij het belangrijk is om de services losjes gekoppeld te houden. Dit is nuttig voor achtergrondverwerking, zoals het verwerken van beoordelingen, waar vertraging acceptabel is en de betrouwbaarheid van berichtaflevering belangrijk is.
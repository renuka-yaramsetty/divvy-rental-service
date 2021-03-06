# divvy-rental-service

- [Introduction](#introduction)
- [Maintainers](#maintainers)
- [Development](#development)
  - [Endpoints](#Endpoints)
  - [npm scripts](#npm-scripts)

## Introduction

API for Chicago Divvy Bike Rental platform using the Divvy API and the historical trip data.

## Maintainers

- renuka.yaramsetty@gmail.com

## Development

1. To start developing locally, clone the project:

   ```bash
   git clone https://github.com/renuka-yaramsetty/divvy-rental-service.git
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Start divvy-rental-service server

   ```bash
   npm start
   ```

4. Use curl or postman or any API testing tool to run the endpoints locally

### Endpoints

authToken for development environment is available in ./config/config.json

#### Stations

Stations data is cached on server start and re-cached if the cache has expired (per config, default is 24 hrs) when getStationsData is invoked

1. Get the information of all stations from https://gbfs.divvybikes.com/gbfs/en/station_information.json

   ```bash
   curl -H "Authorization: authToken" http://localhost:8080/stations
   ```

2. Get the information for one station given a station id

   ```bash
   curl -H "Authorization: authToken" http://localhost:8080/stations/2
   ```

#### Trips

Trips data is read from local file and cached on server start

3. Given one or more stations, return the number of riders in the following age groups, [0-20,21-30,31-40,41-50,51+, unknown], who ended their trip at that station for a given day

   ```bash
   curl -H "Authorization: authToken" http://localhost:8080/stations/2/3/211/ridersByAge?date=2019-04-02
   curl -H "Authorization: authToken" http://localhost:8080/stations/2/3/211/ridersByAge?date=2019-04-02&includeAllGroups=1
   ```

4. Given one or more stations, return the last 20 trips that ended at each station for a single day
   ```bash
   curl -H "Authorization: authToken" http://localhost:8080/stations/2/3/recentTrips?date=2019-04-02
   ```

### npm scripts

| Name    | Responsibility                                                                                           |
| ------- | -------------------------------------------------------------------------------------------------------- |
| `start` | Used locally to run and develop the application. It will intellegently restart when a module is changed. |
| `test`  | Runs the full test suite: unit tests                                                                     |

To see a complete list of `npm` scripts, use:

```bash
npm run
```

To check which dependencies are outdated, run:

```bash
npm outdated
```


### cleanup
curl -X DELETE http://localhost:8001/services/spacex/routes/route1
curl -X DELETE http://localhost:8001/services/app/routes/route2
curl -X DELETE http://localhost:8001/services/app/routes/route3
curl -X DELETE http://localhost:8001/services/ui/routes/route4


curl -X DELETE http://localhost:8001/services/spacex
curl -X DELETE http://localhost:8001/services/app
curl -X DELETE http://localhost:8001/services/ui


### spacex setup
curl -i -s -X POST http://localhost:8001/services \
--data name=spacex \
--data url='http://spacex:8080'

curl -X GET http://localhost:8001/services/spacex

curl --request PATCH --url localhost:8001/services/spacex --data retries=6

curl -i -X POST http://localhost:8001/services/spacex/routes \
--data 'paths[]=/spacex' \
--data "strip_path=false" \
--data name=route1




curl -X GET http://localhost:8001/services/spacex/routes/route1

curl --request PATCH \
--url localhost:8001/services/spacex/routes/route1 \
--data tags="spacex"


curl http://localhost:8001/routes


### app

curl -i -s -X POST http://localhost:8001/services \
--data name=app \
--data url='http://app:8080'

curl -X GET http://localhost:8001/services/app

curl --request PATCH --url localhost:8001/services/app --data retries=6

curl -i -X POST http://localhost:8001/services/app/routes \
--data 'paths[]=/epl' \
--data "strip_path=false" \
--data name=route2

curl -i -X POST http://localhost:8001/services/app/routes \
--data 'paths[]=/pokemon' \
--data "strip_path=false" \
--data name=route3


curl -X GET http://localhost:8001/services/app/routes/route2
curl -X GET http://localhost:8001/services/app/routes/route3

curl --request PATCH \
--url localhost:8001/services/app/routes/route2 \
--data tags="epl"

curl --request PATCH \
--url localhost:8001/services/app/routes/route3 \
--data tags="pokemon"


### ui

curl -i -s -X POST http://localhost:8001/services \
--data name=ui \
--data url='http://ui:3000'

curl -X GET http://localhost:8001/services/ui

curl --request PATCH --url localhost:8001/services/ui --data retries=6

curl -i -X POST http://localhost:8001/services/ui/routes \
--data 'paths[]=/ui' \
--data "strip_path=true" \
--data name=route4

curl -X GET http://localhost:8001/services/ui/routes/route4

curl --request PATCH \
--url localhost:8001/services/ui/routes/route4 \
--data tags="ui"



curl http://localhost:8001/routes

### cleanup
run the delete commands from top of this file to cleanup.

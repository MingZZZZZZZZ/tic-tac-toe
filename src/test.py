import requests
import pandas as pd
import io

sub_key = 'fXA1jy2fi9i-rMpxyyj-khD0pNGNBLrvgtKUCh3Uh4c'
coord1 = '43.880605,-78.750496'
coord2 = '43.886162,-78.708241'



url = 'https://atlas.microsoft.com/route/directions/json?' \
      'subscription-key={}&' \
      'api-version=1.0&' \
      'query={}:{}&' \
      'ComputeTravelTimeFor=all&' \
      'arriveAt=2019-11-01T13:59:59'.format(sub_key, coord2, coord1)

response = requests.get(url).content
print(response)


# {"formatVersion":"0.0.12",
#  "routes":[
#        {"summary":
#               {"lengthInMeters":353,
#                "travelTimeInSeconds":68,
#                "trafficDelayInSeconds":0,
#                "departureTime":"2019-10-30T00:52:24+00:00",
#                "arrivalTime":"2019-10-30T00:53:31+00:00",
#                "noTrafficTravelTimeInSeconds":59,
#                "historicTrafficTravelTimeInSeconds":68,
#                "liveTrafficIncidentsTravelTimeInSeconds":68},
#         "legs":[
#               {"summary":
#                      {"lengthInMeters":353,
#                       "travelTimeInSeconds":68,
#                       "trafficDelayInSeconds":0,
#                       "departureTime":"2019-10-30T00:52:24+00:00",
#                       "arrivalTime":"2019-10-30T00:53:31+00:00",
#                       "noTrafficTravelTimeInSeconds":59,
#                       "historicTrafficTravelTimeInSeconds":68,
#                       "liveTrafficIncidentsTravelTimeInSeconds":68},
#                "points":[
#                      {"latitude":43.66798,"longitude":-79.38586},
#                      {"latitude":43.66755,"longitude":-79.38568},
#                      {"latitude":43.6667,"longitude":-79.38533},
#                      {"latitude":43.66656,"longitude":-79.38528},
#                      {"latitude":43.66606,"longitude":-79.38507},
#                      {"latitude":43.66583,"longitude":-79.38496},
#                      {"latitude":43.66531,"longitude":-79.38475},
#                      {"latitude":43.66494,"longitude":-79.3846}]}],
#         "sections":[
#               {"startPointIndex":0,
#                "endPointIndex":7,
#                "sectionType":"TRAVEL_MODE",
#                "travelMode":"car"}]}]}


# url = 'https://atlas.microsoft.com/traffic/flow/segment/json?' \
#       'subscription-key={}&' \
#       'api-version=1.0&' \
#       'unit=KMPH&' \
#       'query={}&' \
#       'style=absolute&zoom=10'.format(sub_key, coord1)
#
# response = requests.get(url).content
# print(response)





# {"flowSegmentData":
#        {"frc":"FRC3",
#         "currentSpeed":10,
#         "freeFlowSpeed":17,
#         "currentTravelTime":218,
#         "freeFlowTravelTime":128,
#         "confidence":0.9800000190734863,
#         "roadClosure":false,
#         "coordinates":{
#               "coordinate":[
#                     {"latitude":43.66529945798415,"longitude":-79.38294596799165},
#                     {"latitude":43.66566981580951,"longitude":-79.38309766580672},
#                     {"latitude":43.666208838472194,"longitude":-79.38332342592338},
#                     {"latitude":43.66644522183869,"longitude":-79.38343056668917},
#                     {"latitude":43.666921403674195,"longitude":-79.38362961293387},
#                     {"latitude":43.66705635382609,"longitude":-79.38368571104735},
#                     {"latitude":43.66790094602938,"longitude":-79.38403068296903},
#                     {"latitude":43.668328278097896,"longitude":-79.38419852946856},
#                     {"latitude":43.66898493577838,"longitude":-79.38445636815986},
#                     {"latitude":43.66908081360577,"longitude":-79.38449423921364},
#                     {"latitude":43.669717008512364,"longitude":-79.38474533715153},
#                     {"latitude":43.67005638159153,"longitude":-79.38489169987236},
#                     {"latitude":43.67039535758998,"longitude":-79.38503118917653},
#                     {"latitude":43.670539093536476,"longitude":-79.38508143922093}]},
#         "@version":"traffic-service 3.0.009"}}'


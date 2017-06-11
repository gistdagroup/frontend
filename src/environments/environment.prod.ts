export const environment = {
  production: true,
  api: {
    baseUrl: "http://gps.gistda.org:8080/api/",
    searchLocationsUrl: "locations?filter=:{filter}&access_token=:{access_token}",
    searchVideosUrl: "videos?filter=:{filter}&access_token=:{access_token}",
  }
};

// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  api: {
    baseUrl: "http://gps.gistda.org:8080/api/",
    searchLocationsUrl: "locations?filter=:{filter}&access_token=:{access_token}",
    searchVideosUrl: "videos?filter=:{filter}&access_token=:{access_token}",
  }
};

// : string = 'http://gps.gistda.org:8080/api/locations?filter=:{filter}&access_token=:{access_token}';

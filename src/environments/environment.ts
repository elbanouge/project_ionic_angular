// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

//         android:usesCleartextTraffic="true"
// https://78ba-160-164-239-87.eu.ngrok.io

export const environment = {
  production: false,
  apiBaseUrl: 'http://localhost:8080',
  // apiBaseUrl: 'http://192.168.43.176:8080',
  // apiBaseUrl: 'https://78ba-160-164-239-87.eu.ngrok.io',
};
// export const SERVER_URL = 'https://6a0b-160-178-46-159.eu.ngrok.io';

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

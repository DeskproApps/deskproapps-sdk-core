## v1.0.0-beta.7 - 2017-08-02
* [FIX] add build scripts in correct location

## v1.0.0-beta.6 - 2017-08-02
* [MAINTENANCE] update travis configuration to use dpat for running the test

## v1.0.0-beta.5 - 2017-08-01
* [MAINTENANCE] add travis build configuration

## v1.0.0-beta.4 - 2017-08-01
* [MAINTENANCE] install and use the local dpat as the build tool

## v1.0.0-beta.3 - 2017-08-01
* [FEATURE] add oauth api
* [MAINTENANCE] remove deprecated state events
* [MAINTENANCE] automatic npm deploys via travis

## v1.0.0-beta.2 - 2017-07-20
* [FIX] use application id instead of instance id when fetching application state

## v1.0.0-beta.1 - 2017-07-20

* [CHANGE] use new application state API
* [ADDITION] context properties include application environment related properties 

## v1.0.0-alpha.12 - 2017-07-12
 
* [FEATURE] add Properties API to allow retrieving of properties passed at runtime
* [FIX] Move all user interface methods onto the `app.ui` object 

## v1.0.0-alpha.11 - 2017-07-11
* [MAINTENANCE] update links after transferring the repository to the `Deskpro` organization

## v1.0.0-alpha.10 - 2017-07-05

* [FIX] correlation id not used when responding to incoming requests causing messages to be dropped

## v1.0.0-alpha.9 - 2017-06-23

* [FEATURE] add tabUrl property to `app.context` object
* [FEATURE] allow experimental properties to be passed from the Deskpro window

## v1.0.0-alpha.8 - 2017-06-21

* [FEATURE] read initialization params first from the location hash then fallback to the location query string
* [FEATURE] add Fetch API support for deskpro api request

## v1.0.0-alpha.7 - 2017-06-14

* [FIX] event matching fails if any event props pattern is not specified
* [FEATURE] expose UI API methods to allow changing, hiding and showing a badge count 

## v1.0.0-alpha.6 - 2017-06-13

* [FEATURE] allow interaction with the DeskPro Window via Deskpro Window API

## v1.0.0-alpha.5 - 2017-06-13

* [FEATURE] allow deskpro window to send requests to listening widgets
* [FEATURE] add possibility to send notifications for display in the main DeskPro window
* [FEATURE] allow apps to response to requests sent from the main DeskPro window
* [MAINTENANCE] enable travis ci integration

## vv1.0.0-alpha.4 - 2017-06-02

* [FIX] prevent resize events from entering an endless resize loop
* [MAINTENANCE] minor refactoring

## v1.0.0-alpha.3 - 2017-06-01

* [FEATURE] add Context API method to retrieve current user and tab data
* [MAINTENANCE] remove deprecated PostMessage API


## v1.0.0-alpha.2 - 2017-05-26

* [FEATURE] improve auto-resizing

## v1.0.0-alpha.1 - 2017-05-24

* [FEATURE] expose application settings via `settings` property on the application object 

## v1.0.0-alpha - 2017-05-22

* [FEATURE] use eventemitter for async communications 
* [FEATURE] Deskpro REST Api access  
* [CHANGE] improve API for the app class 
* [CHANGE] introduce new way of creating apps, by replacing the `connect` function with more robust `createApp` 
* [CHANGE] introduce new Context API to allow interaction with the parent deskpro window 
* [CHANGE] introduce new State API 
* [CHANGE] stop requiring dpat as a dev dependency, instead relying on the globally installed version

## v0.2.1 - 2017-05-02

* [FIX] remove hardcoded child window url

## v0.2.0 - 2017-04-28 

* [FEATURE] Retrieve the authenticated DeskPro user via the widget api 

## v0.1.0 - 2017-04-27

* Initial public release

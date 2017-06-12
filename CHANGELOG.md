## UPCOMING

* [FEATURE] allow deskpro window to send requests to listening widgets
* [FEATURE] add possibility to send notifications for display in the main deskpro window
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

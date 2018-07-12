

## [Unreleased][] 

## [2.0.0][] - 2018-07-12

### Added

 * properties of a context object can be retrieved via `ContextObject.get` using property paths
 * handlers for events received from the Deskpro window must always return a promise
 
### Changed

 * support multiple context objects by replacing `Context.object` property with `Context.get(objectType:String)` method  
 * deprecate method `ContextHostUITab.getTabData` 

## [1.0.2][] - 2018-07-03

### Fixed

 * in a production environment the verbosity of post-robot logs is now `error` instead of `info`

## [1.0.1][] - 2018-04-27

### Added

 * `OauthFacade.refreshAccess` method allows refreshing an access token whenever the oauth refresh token flow is supported by the provider 

## [v1.0.0-beta.29][] - 2018-03-29

### Changed

* `customFields` client no longer accessed via `dpapp.context.customFields`, instead `dpapp.context.object.customFields`
* host UI Tab methods no longer available directly via `dpapp.context`, instead via `dpapp.context.hostUI` object
* Deprecated method `OauthFacade.access` in favour of `OauthFacade.requestAccess`

## [v1.0.0-beta.28][] - 2018-03-23

### Added
* notifies Deskpro when the application badge's state changes 

## [v1.0.0-beta.27][] - 2018-03-22

### Fixed

* improved jsdoc coverage 
* improved docs publishing workflow 

## [v1.0.0-beta.26][] - 2017-11-23

### Added

* subscribe method that allows registering handlers for events coming from the helpdesk ui

## [v1.0.0-beta.26][] - 2017-11-23

### Added

* add a subscribe method that allows registering handlers for events coming from the helpdesk ui

## [v1.0.0-beta.25][] - 2017-11-14

### Fixed

* `FetchStorageAdapter` sends wrong request body when used in batch mode

## [v1.0.0-beta.24][] - 2017-11-13

### Fixed

* `app.storage.setAppStorage` fails when used in batch mode

## [v1.0.0-beta.23][] - 2017-10-27

### Added

* allow specifying protocol related requirements when requesting the oauth settings for a provider 

## [v1.0.0-beta.22][] - 2017-10-24

### Changed

* rename @deskproapps references to @deskpro

## [v1.0.0-beta.21][] - 2017-10-05

### Added

* [FEATURE] reduce log verbosity when app is running in production mode

### Fixed

* use instance id when reading from and writing to custom fields
  

## [v1.0.0-beta.20][] - 2017-10-03

### Added

* allow specifying fetch storage adapter in dev mode

### Fixed

* failure to use storage batch operations due to incorrect handling of api request format

## [v1.0.0-beta.19][] - 2017-10-03

### Added

* allow the application to communicate with the helpdesk using custom events

## [v1.0.0-beta.18][] - 2017-09-22

### Added

* allow application to be instantiated with generic contexts

## [v1.0.0-beta.17][] - 2017-09-20

### Fixed

* npm-shrinkwrap.json references optional dependencies

## [v1.0.0-beta.16][] - 2017-09-18

###Added

* adds change/fetch events to the storage module
* update and fetch custom fields for tickets, organizations and persons

## [v1.0.0-beta.15][] - 2017-09-07

### Changed

* Deprecate State API in favour of Storage API

## [v1.0.0-beta.14][] - 2017-08-15

### Changed

* Instantiate WindowBridge only when createApp is called

## [v1.0.0-beta.13][] - 2017-08-15

### Added

* Relay mouse events to app container
* Group base functions under `Widget` namespace

### Changed
 
* Use post-robot instead of xcomponent

## [v1.0.0-beta.12][] - 2017-08-09

### Changed

* use async keyword for methods which return a Promise

## [v1.0.0-beta.11][] - 2017-08-07

### Changed

* update dependencies

## [v1.0.0-beta.10][] - 2017-08-07

### Added

* add security api

## [v1.0.0-beta.9][] - 2017-08-02

### Fixed

* use correct webpack build options

## [v1.0.0-beta.8][] - 2017-08-02

### Fixed

* wrong path to jest in npm run test command

## [v1.0.0-beta.7][] - 2017-08-02

### Fixed

* add build scripts in correct location

## [v1.0.0-beta.6][] - 2017-08-02

### Changed

* update travis configuration to use dpat for running the test

## [v1.0.0-beta.5][] - 2017-08-01

### Changed

* add travis build configuration

## [v1.0.0-beta.4][] - 2017-08-01

### Changed

* install and use the local dpat as the build tool

## [v1.0.0-beta.3][] - 2017-08-01

### Added

* add oauth api

### Changed

* remove deprecated state events
* automatic npm deploys via travis

## [v1.0.0-beta.2][] - 2017-07-20

### Fixed

* use application id instead of instance id when fetching application state

## [v1.0.0-beta.1][] - 2017-07-20

### Added

* context properties include application environment related properties

### Changed

* use new application state API
 

## [v1.0.0-alpha.12][] - 2017-07-12
 
### Added
 
* add Properties API to allow retrieving of properties passed at runtime

### Fixed

* Move all user interface methods onto the `app.ui` object 

## [v1.0.0-alpha.11][] - 2017-07-11

### Changed

* update links after transferring the repository to the `Deskpro` organization

## [v1.0.0-alpha.10][] - 2017-07-05

### Fixed

* correlation id not used when responding to incoming requests causing messages to be dropped

## [v1.0.0-alpha.9][] - 2017-06-23

### Added

* add tabUrl property to `app.context` object
* allow experimental properties to be passed from the Deskpro window

## [v1.0.0-alpha.8][] - 2017-06-21

### Added

* read initialization params first from the location hash then fallback to the location query string
* add Fetch API support for deskpro api request

## [v1.0.0-alpha.7][] - 2017-06-14

### Added

* expose UI API methods to allow changing, hiding and showing a badge count
    
### Fixed

* event matching fails if any event props pattern is not specified
 

## [v1.0.0-alpha.6][] - 2017-06-13

### Added

* allow interaction with the DeskPro Window via Deskpro Window API

## [v1.0.0-alpha.5][] - 2017-06-13

### Added

* allow deskpro window to send requests to listening widgets
* add possibility to send notifications for display in the main DeskPro window
* allow apps to response to requests sent from the main DeskPro window

### Changed

* Enable travis ci integration

## [v1.0.0-alpha.4][] - 2017-06-02

### Fixed

* prevent resize events from entering an endless resize loop

### Changed

* minor refactoring

## [v1.0.0-alpha.3][] - 2017-06-01

### Added

* add Context API method to retrieve current user and tab data

### Changed

* remove deprecated PostMessage API

## [v1.0.0-alpha.2][] - 2017-05-26

### Added

* improve auto-resizing

## [v1.0.0-alpha.1][] - 2017-05-24

### Added

* expose application settings via `settings` property on the application object 

## [v1.0.0-alpha][] - 2017-05-22

### Added

* use eventemitter for async communications 
* Deskpro REST Api access  

### Changed

* improve API for the app class 
* introduce new way of creating apps, by replacing the `connect` function with more robust `createApp` 
* introduce new Context API to allow interaction with the parent deskpro window 
* introduce new State API 
* stop requiring dpat as a dev dependency, instead relying on the globally installed version

## [v0.2.1][] - 2017-05-02

### Fixed

* remove hardcoded child window url

## [v0.2.0][] - 2017-04-28 

### Added

* Retrieve the authenticated DeskPro user via the widget api 

## [v0.1.0][] - 2017-04-27

* Initial public release



[Unreleased]: https://github.com/deskpro/apps-sdk-core/compare/v2.0.0...HEAD
[2.0.0]: https://github.com/deskpro/apps-sdk-core/compare/v1.0.2...v2.0.0
[1.0.2]: https://github.com/deskpro/apps-sdk-core/compare/v1.0.1...v1.0.2
[1.0.1]: https://github.com/deskpro/apps-sdk-core/tree/v1.0.1
# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Updated getMe return type to add API v2 token

### Changed

- Updated getCheckoutSession to use API v2
- Updated getMe to use API v2
- Updated getMe return type to indicate name is optional
- Updated getMe return type to indicate timezone is optional
- Updated getMe return type to indicate Beeminder integration is optional
- Renamed getApiToken to resetApiToken
- Updated updateMe to use API v2
- Updated updateTask to use API v2
- Exported User type

### Removed

- Updated getMe return type to remove cards
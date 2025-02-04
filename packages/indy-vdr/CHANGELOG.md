# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [0.4.2](https://github.com/hyperledger/aries-framework-javascript/compare/v0.4.1...v0.4.2) (2023-10-05)

**Note:** Version bump only for package @credo-ts/indy-vdr

## [0.4.1](https://github.com/hyperledger/aries-framework-javascript/compare/v0.4.0...v0.4.1) (2023-08-28)

### Bug Fixes

- **indy-vdr:** role property not included in nym request ([#1488](https://github.com/hyperledger/aries-framework-javascript/issues/1488)) ([002be4f](https://github.com/hyperledger/aries-framework-javascript/commit/002be4f578729aed1c8ae337f3d2eeecce9e3725))

# [0.4.0](https://github.com/hyperledger/aries-framework-javascript/compare/v0.3.3...v0.4.0) (2023-06-03)

### Bug Fixes

- **anoncreds:** make revocation status list inline with the spec ([#1421](https://github.com/hyperledger/aries-framework-javascript/issues/1421)) ([644e860](https://github.com/hyperledger/aries-framework-javascript/commit/644e860a05f40166e26c497a2e8619c9a38df11d))
- did cache key not being set correctly ([#1394](https://github.com/hyperledger/aries-framework-javascript/issues/1394)) ([1125e81](https://github.com/hyperledger/aries-framework-javascript/commit/1125e81962ffa752bf40fa8f7f4226e186f22013))
- expose indy pool configs and action menu messages ([#1333](https://github.com/hyperledger/aries-framework-javascript/issues/1333)) ([518e5e4](https://github.com/hyperledger/aries-framework-javascript/commit/518e5e4dfb59f9c0457bfd233409e9f4b3c429ee))
- **indy-vdr:** do not force indy-vdr version ([#1434](https://github.com/hyperledger/aries-framework-javascript/issues/1434)) ([8a933c0](https://github.com/hyperledger/aries-framework-javascript/commit/8a933c057e0c88870779bf8eb98b4684de4745de))
- **indy-vdr:** export relevant packages from root ([#1291](https://github.com/hyperledger/aries-framework-javascript/issues/1291)) ([b570e0f](https://github.com/hyperledger/aries-framework-javascript/commit/b570e0f923fc46adef3ce20ee76a683a867b85f4))
- issuance with unqualified identifiers ([#1431](https://github.com/hyperledger/aries-framework-javascript/issues/1431)) ([de90caf](https://github.com/hyperledger/aries-framework-javascript/commit/de90cafb8d12b7a940f881184cd745c4b5043cbc))
- reference to indyLedgers in IndyXXXNotConfiguredError ([#1397](https://github.com/hyperledger/aries-framework-javascript/issues/1397)) ([d6e2ea2](https://github.com/hyperledger/aries-framework-javascript/commit/d6e2ea2194a4860265fe299ef8ee4cb4799ab1a6))
- remove named capture groups ([#1378](https://github.com/hyperledger/aries-framework-javascript/issues/1378)) ([a4204ef](https://github.com/hyperledger/aries-framework-javascript/commit/a4204ef2db769de53d12f0d881d2c4422545c390))
- seed and private key validation and return type in registrars ([#1324](https://github.com/hyperledger/aries-framework-javascript/issues/1324)) ([c0e5339](https://github.com/hyperledger/aries-framework-javascript/commit/c0e5339edfa32df92f23fb9c920796b4b59adf52))

### Features

- 0.4.0 migration script ([#1392](https://github.com/hyperledger/aries-framework-javascript/issues/1392)) ([bc5455f](https://github.com/hyperledger/aries-framework-javascript/commit/bc5455f7b42612a2b85e504bc6ddd36283a42bfa))
- add fetch indy schema method ([#1290](https://github.com/hyperledger/aries-framework-javascript/issues/1290)) ([1d782f5](https://github.com/hyperledger/aries-framework-javascript/commit/1d782f54bbb4abfeb6b6db6cd4f7164501b6c3d9))
- **anoncreds:** store method name in records ([#1387](https://github.com/hyperledger/aries-framework-javascript/issues/1387)) ([47636b4](https://github.com/hyperledger/aries-framework-javascript/commit/47636b4a08ffbfa9a3f2a5a3c5aebda44f7d16c8))
- **indy-vdr:** add indy-vdr package and indy vdr pool ([#1160](https://github.com/hyperledger/aries-framework-javascript/issues/1160)) ([e8d6ac3](https://github.com/hyperledger/aries-framework-javascript/commit/e8d6ac31a8e18847d99d7998bd7658439e48875b))
- **indy-vdr:** add IndyVdrAnonCredsRegistry ([#1270](https://github.com/hyperledger/aries-framework-javascript/issues/1270)) ([d056316](https://github.com/hyperledger/aries-framework-javascript/commit/d056316712b5ee5c42a159816b5dda0b05ad84a8))
- **indy-vdr:** did:sov resolver ([#1247](https://github.com/hyperledger/aries-framework-javascript/issues/1247)) ([b5eb08e](https://github.com/hyperledger/aries-framework-javascript/commit/b5eb08e99d7ea61adefb8c6c0c5c99c6c1ba1597))
- **indy-vdr:** module registration ([#1285](https://github.com/hyperledger/aries-framework-javascript/issues/1285)) ([51030d4](https://github.com/hyperledger/aries-framework-javascript/commit/51030d43a7e3cca3da29c5add38e35f731576927))
- **indy-vdr:** resolver and registrar for did:indy ([#1253](https://github.com/hyperledger/aries-framework-javascript/issues/1253)) ([efab8dd](https://github.com/hyperledger/aries-framework-javascript/commit/efab8ddfc34e47a3f0ffe35b55fa5018a7e96544))
- **indy-vdr:** schema + credential definition endorsement ([#1451](https://github.com/hyperledger/aries-framework-javascript/issues/1451)) ([25b981b](https://github.com/hyperledger/aries-framework-javascript/commit/25b981b6e23d02409e90dabdccdccc8904d4e357))
- **indy-vdr:** use [@hyperledger](https://github.com/hyperledger) packages ([#1252](https://github.com/hyperledger/aries-framework-javascript/issues/1252)) ([acdb20a](https://github.com/hyperledger/aries-framework-javascript/commit/acdb20a79d038fb4163d281ee8de0ccb649fdc32))
- IndyVdrAnonCredsRegistry revocation methods ([#1328](https://github.com/hyperledger/aries-framework-javascript/issues/1328)) ([fb7ee50](https://github.com/hyperledger/aries-framework-javascript/commit/fb7ee5048c33d5335cd9f07cad3dffc60dee7376))

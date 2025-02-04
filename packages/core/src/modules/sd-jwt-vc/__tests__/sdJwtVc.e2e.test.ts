import type { Key } from '@credo-ts/core'

import { AskarModule } from '../../../../../askar/src'
import { askarModuleConfig } from '../../../../../askar/tests/helpers'
import { agentDependencies } from '../../../../tests'

import {
  Agent,
  DidKey,
  DidsModule,
  getJwkFromKey,
  KeyDidRegistrar,
  KeyDidResolver,
  KeyType,
  TypedArrayEncoder,
  utils,
} from '@credo-ts/core'

const getAgent = (label: string) =>
  new Agent({
    config: { label, walletConfig: { id: utils.uuid(), key: utils.uuid() } },
    modules: {
      askar: new AskarModule(askarModuleConfig),
      dids: new DidsModule({
        resolvers: [new KeyDidResolver()],
        registrars: [new KeyDidRegistrar()],
      }),
    },
    dependencies: agentDependencies,
  })

describe('sd-jwt-vc end to end test', () => {
  const issuer = getAgent('sdjwtvcissueragent')
  let issuerKey: Key
  let issuerDidUrl: string

  const holder = getAgent('sdjwtvcholderagent')
  let holderKey: Key

  const verifier = getAgent('sdjwtvcverifieragent')
  const verifierDid = 'did:key:zUC74VEqqhEHQcgv4zagSPkqFJxuNWuoBPKjJuHETEUeHLoSqWt92viSsmaWjy82y'

  beforeAll(async () => {
    await issuer.initialize()
    issuerKey = await issuer.context.wallet.createKey({
      keyType: KeyType.Ed25519,
      seed: TypedArrayEncoder.fromString('00000000000000000000000000000000'),
    })

    const issuerDidKey = new DidKey(issuerKey)
    const issuerDidDocument = issuerDidKey.didDocument
    issuerDidUrl = (issuerDidDocument.verificationMethod ?? [])[0].id
    await issuer.dids.import({ didDocument: issuerDidDocument, did: issuerDidDocument.id })

    await holder.initialize()
    holderKey = await holder.context.wallet.createKey({
      keyType: KeyType.Ed25519,
      seed: TypedArrayEncoder.fromString('00000000000000000000000000000001'),
    })

    await verifier.initialize()
  })

  test('end to end flow', async () => {
    const credential = {
      vct: 'IdentityCredential',
      given_name: 'John',
      family_name: 'Doe',
      email: 'johndoe@example.com',
      phone_number: '+1-202-555-0101',
      address: {
        street_address: '123 Main St',
        locality: 'Anytown',
        region: 'Anystate',
        country: 'US',
      },
      birthdate: '1940-01-01',
      is_over_18: true,
      is_over_21: true,
      is_over_65: true,
    } as const

    const { compact, header, payload } = await issuer.sdJwtVc.sign({
      payload: credential,
      holder: {
        method: 'jwk',
        jwk: getJwkFromKey(holderKey),
      },
      issuer: {
        didUrl: issuerDidUrl,
        method: 'did',
      },
      disclosureFrame: {
        is_over_65: true,
        is_over_21: true,
        is_over_18: true,
        birthdate: true,
        email: true,
        address: { country: true, region: true, locality: true, __decoyCount: 2, street_address: true },
        __decoyCount: 2,
        given_name: true,
        family_name: true,
        phone_number: true,
      },
    })

    type Payload = typeof payload
    type Header = typeof header

    // parse SD-JWT
    const sdJwtVc = holder.sdJwtVc.fromCompact<Header, Payload>(compact)
    expect(sdJwtVc).toEqual({
      compact: expect.any(String),
      header: {
        alg: 'EdDSA',
        kid: '#z6MktqtXNG8CDUY9PrrtoStFzeCnhpMmgxYL1gikcW3BzvNW',
        typ: 'vc+sd-jwt',
      },
      payload: {
        _sd: [
          expect.any(String),
          expect.any(String),
          expect.any(String),
          expect.any(String),
          expect.any(String),
          expect.any(String),
          expect.any(String),
          expect.any(String),
          expect.any(String),
          expect.any(String),
        ],
        _sd_alg: 'sha-256',
        address: {
          _sd: [
            expect.any(String),
            expect.any(String),
            expect.any(String),
            expect.any(String),
            expect.any(String),
            expect.any(String),
          ],
        },
        cnf: {
          jwk: {
            crv: 'Ed25519',
            kty: 'OKP',
            x: 'oENVsxOUiH54X8wJLaVkicCRk00wBIQ4sRgbk54N8Mo',
          },
        },
        iat: expect.any(Number),
        iss: 'did:key:z6MktqtXNG8CDUY9PrrtoStFzeCnhpMmgxYL1gikcW3BzvNW',
        vct: 'IdentityCredential',
      },
      prettyClaims: {
        address: {
          country: 'US',
          locality: 'Anytown',
          region: 'Anystate',
          street_address: '123 Main St',
        },
        birthdate: '1940-01-01',
        cnf: {
          jwk: {
            crv: 'Ed25519',
            kty: 'OKP',
            x: 'oENVsxOUiH54X8wJLaVkicCRk00wBIQ4sRgbk54N8Mo',
          },
        },
        email: 'johndoe@example.com',
        family_name: 'Doe',
        given_name: 'John',
        iat: expect.any(Number),
        is_over_18: true,
        is_over_21: true,
        is_over_65: true,
        iss: 'did:key:z6MktqtXNG8CDUY9PrrtoStFzeCnhpMmgxYL1gikcW3BzvNW',
        phone_number: '+1-202-555-0101',
        vct: 'IdentityCredential',
      },
    })

    // Verify SD-JWT (does not require key binding)
    const { verification } = await holder.sdJwtVc.verify({
      compactSdJwtVc: compact,
    })
    expect(verification.isValid).toBe(true)

    // Store credential
    await holder.sdJwtVc.store(compact)

    // Metadata created by the verifier and send out of band by the verifier to the holder
    const verifierMetadata = {
      audience: verifierDid,
      issuedAt: new Date().getTime() / 1000,
      nonce: await verifier.wallet.generateNonce(),
    }

    const presentation = await holder.sdJwtVc.present<Header, Payload>({
      compactSdJwtVc: compact,
      verifierMetadata,
      presentationFrame: {
        vct: true,
        given_name: true,
        family_name: true,
        email: true,
        phone_number: true,
        address: {
          street_address: true,
          locality: true,
          region: true,
          country: true,
        },
        birthdate: true,
        is_over_18: true,
        is_over_21: true,
        is_over_65: true,
      },
    })

    const { verification: presentationVerification } = await verifier.sdJwtVc.verify({
      compactSdJwtVc: presentation,
      keyBinding: { audience: verifierDid, nonce: verifierMetadata.nonce },
      requiredClaimKeys: [
        'is_over_65',
        'is_over_21',
        'is_over_18',
        'birthdate',
        'email',
        'country',
        'region',
        'locality',
        'street_address',
        'given_name',
        'family_name',
        'phone_number',
      ],
    })

    expect(presentationVerification.isValid).toBeTruthy()
  })
})

import { PublicKey } from "@solana/web3.js";

export const IDLAccountVoter = {
    "version": "0.1.0",
    "name": "account_voter",
    "instructions": [
      {
        "name": "initialize",
        "accounts": [
          {
            "name": "newAccount",
            "isMut": true,
            "isSigner": false,
            "pda": {
              "seeds": [
                {
                  "kind": "const",
                  "type": "string",
                  "value": "accountVoter"
                },
                {
                  "kind": "account",
                  "type": "publicKey",
                  "path": "signer"
                }
              ]
            }
          },
          {
            "name": "signer",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "systemProgram",
            "isMut": false,
            "isSigner": false
          }
        ],
        "args": [
          {
            "name": "pseudo",
            "type": {
              "array": [
                "u8",
                256
              ]
            }
          },
          {
            "name": "mail",
            "type": {
              "array": [
                "u8",
                256
              ]
            }
          },
          {
            "name": "balanceTotal",
            "type": "u16"
          },
          {
            "name": "balanceSol",
            "type": "u16"
          },
          {
            "name": "totalTrade",
            "type": "u16"
          },
          {
            "name": "totalParticipation",
            "type": "u16"
          },
          {
            "name": "winTrade",
            "type": "u16"
          }
        ]
      }
    ],
    "accounts": [
      {
        "name": "NewAccount",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "pseudo",
              "type": {
                "array": [
                  "u8",
                  256
                ]
              }
            },
            {
              "name": "mail",
              "type": {
                "array": [
                  "u8",
                  256
                ]
              }
            },
            {
              "name": "balanceTotal",
              "type": "u16"
            },
            {
              "name": "balanceSol",
              "type": "u16"
            },
            {
              "name": "totalTrade",
              "type": "u16"
            },
            {
              "name": "totalParticipation",
              "type": "u16"
            },
            {
              "name": "winTrade",
              "type": "u16"
            }
          ]
        }
      }
    ]
};
export const PROGRAM_ID_ACCOUNTVOTER = new PublicKey('Bwxm317fm97PCMPCKb99QcM5UaUoC7RPn53vZLwCjvfL');
// export const PROGRAM_ID_ACCOUNTVOTER = new PublicKey('9td8WxnrQb1kGkzXGZZriwid4NLdNLh8MdNY4v2eQmzk');
// export const PROGRAM_ID_ACCOUNTVOTER = new PublicKey('6dPHkxoJGDyt4h37htgrm62zJU6aLdfHFcfX7KcHcyae');
import { PublicKey } from "@solana/web3.js";

export const IDLBob = {
  "version": "0.1.0",
  "name": "bob",
  "instructions": [
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "bobDataAccount",
          "isMut": true,
          "isSigner": true
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
      "args": []
    },
    {
      "name": "addAndStore",
      "accounts": [
        {
          "name": "bobDataAccount",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "a",
          "type": "u64"
        },
        {
          "name": "b",
          "type": "u64"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "BobData",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "result",
            "type": "u64"
          }
        ]
      }
    }
  ]
}

export const PROGRAM_ID_BOB = new PublicKey('61yHcSjDDYx9kZvPPFv1wZwhgc2bakGwin4eKZGUXRHr');
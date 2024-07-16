
import { PublicKey } from "@solana/web3.js";

export const IDLCounterCpi = {
  "version": "0.1.0",
  "name": "counter",
  "instructions": [
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "counterDataAccount",
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
      "name": "click",
      "accounts": [
        {
          "name": "counterDataAccount",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "CounterData",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "value",
            "type": "u64"
          }
        ]
      }
    }
  ]
};

export const PROGRAM_ID_COUNTER_CPI = new PublicKey('HrhY8fYaGuG6VZk9wf4d5aYxRqj1UzXV9E9rFw6GtRtm');
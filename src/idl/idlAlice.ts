import { PublicKey } from "@solana/web3.js";

export const IDLAlice = {
  "version": "0.1.0",
  "name": "alice",
  "instructions": [
    {
      "name": "askBobToAdd",
      "accounts": [
        {
          "name": "bobDataAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "bobProgram",
          "isMut": false,
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
  "errors": [
    {
      "code": 6000,
      "name": "CPIToBobFailed",
      "msg": "cpi to bob failed"
    }
  ]
}

export const PROGRAM_ID_ALICE = new PublicKey('iza4mmxcBhUL18MwRWSsKGKmTDDUJ8mytHYgXsdg4E3');
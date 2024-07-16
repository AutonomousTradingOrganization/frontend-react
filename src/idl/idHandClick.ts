import { PublicKey } from "@solana/web3.js";

export const IDLHandClick = {
  "version": "0.1.0",
  "name": "hand",
  "instructions": [
    {
      "name": "handClick",
      "accounts": [
        {
          "name": "counterDataAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "counterProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "CPIToCounterFailed",
      "msg": "cpi to 'counter' failed"
    }
  ]
}

export const PROGRAM_ID_HAND_CLICK = new PublicKey('6CCXg2Nx13yUpvDB6NkL2LhCnRNyg4H1dzhTseVqtNVQ');
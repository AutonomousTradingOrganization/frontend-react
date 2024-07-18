import { PublicKey } from "@solana/web3.js";

export const IDLAto = {
  "version": "0.1.0",
  "name": "ato",
  "instructions": [
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "atoData",
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
      "name": "setScheduler",
      "accounts": [
        {
          "name": "atoData",
          "isMut": true,
          "isSigner": false
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
          "name": "key",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "setPause",
      "accounts": [
        {
          "name": "atoData",
          "isMut": true,
          "isSigner": false
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
          "name": "to",
          "type": "bool"
        }
      ]
    },
    {
      "name": "proposalCreate",
      "accounts": [
        {
          "name": "propData",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "atoData",
          "isMut": true,
          "isSigner": false
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
          "name": "title",
          "type": "string"
        },
        {
          "name": "description",
          "type": "string"
        },
        {
          "name": "mode",
          "type": "u8"
        },
        {
          "name": "threshold",
          "type": "u64"
        },
        {
          "name": "deadline",
          "type": "u64"
        }
      ]
    },
    {
      "name": "proposalSetStatus",
      "accounts": [
        {
          "name": "propData",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "atoData",
          "isMut": true,
          "isSigner": false
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
          "name": "status",
          "type": "u8"
        }
      ]
    },
    {
      "name": "voterRegistration",
      "accounts": [
        {
          "name": "voterData",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "atoData",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "voter",
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
          "name": "name",
          "type": "string"
        },
        {
          "name": "email",
          "type": "string"
        }
      ]
    },
    {
      "name": "vote",
      "accounts": [
        {
          "name": "voteData",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "voterData",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "propData",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "atoData",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "voter",
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
          "name": "vote",
          "type": "bool"
        },
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "now",
          "type": "u64"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "AtoData",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "admin",
            "type": "publicKey"
          },
          {
            "name": "scheduler",
            "type": "publicKey"
          },
          {
            "name": "proposalIndexHead",
            "type": "u16"
          },
          {
            "name": "proposalIndexTail",
            "type": "u16"
          },
          {
            "name": "voterIndexHead",
            "type": "u16"
          },
          {
            "name": "voterIndexTail",
            "type": "u16"
          },
          {
            "name": "status",
            "type": "u8"
          },
          {
            "name": "paused",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "AtoProposal",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "signer",
            "type": "publicKey"
          },
          {
            "name": "deadline",
            "type": "u64"
          },
          {
            "name": "threshold",
            "type": "u64"
          },
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "voteYes",
            "type": "u16"
          },
          {
            "name": "voteNo",
            "type": "u16"
          },
          {
            "name": "voteIndexHead",
            "type": "u16"
          },
          {
            "name": "voteIndexTail",
            "type": "u16"
          },
          {
            "name": "index",
            "type": "u16"
          },
          {
            "name": "title",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "description",
            "type": {
              "array": [
                "u8",
                100
              ]
            }
          },
          {
            "name": "mode",
            "type": "u8"
          },
          {
            "name": "status",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "AtoVote",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "voter",
            "type": "publicKey"
          },
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "timestamp",
            "type": "u64"
          },
          {
            "name": "leet1",
            "type": "u16"
          },
          {
            "name": "proposalIndex",
            "type": "u16"
          },
          {
            "name": "voterIndex",
            "type": "u16"
          },
          {
            "name": "leet2",
            "type": "u16"
          },
          {
            "name": "vote",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "AtoVoter",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "voter",
            "type": "publicKey"
          },
          {
            "name": "index",
            "type": "u16"
          },
          {
            "name": "name",
            "type": {
              "array": [
                "u8",
                64
              ]
            }
          },
          {
            "name": "email",
            "type": {
              "array": [
                "u8",
                64
              ]
            }
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "AtoStatus",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "NotReady"
          },
          {
            "name": "Ready"
          },
          {
            "name": "Paused"
          }
        ]
      }
    },
    {
      "name": "AtoProposalStatus",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Waiting"
          },
          {
            "name": "Opened"
          },
          {
            "name": "Closed"
          },
          {
            "name": "Paused"
          },
          {
            "name": "Canceled"
          },
          {
            "name": "Error"
          },
          {
            "name": "MAX"
          }
        ]
      }
    },
    {
      "name": "AtoProposalMode",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Over"
          },
          {
            "name": "Lower"
          },
          {
            "name": "Delay"
          },
          {
            "name": "MAX"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "AdminOnly",
      "msg": "Admin only operation."
    },
    {
      "code": 6001,
      "name": "SchedulerOnly",
      "msg": "Scheduler only operation."
    },
    {
      "code": 6002,
      "name": "HeadIndexError",
      "msg": "Head index cannot exceed tail index."
    },
    {
      "code": 6003,
      "name": "ProgramPaused",
      "msg": "Program paused."
    },
    {
      "code": 6004,
      "name": "IncorrectProposalStatus",
      "msg": "Incorrect proposal status."
    },
    {
      "code": 6005,
      "name": "IncorrectProposalMode",
      "msg": "Incorrect proposal mode."
    },
    {
      "code": 6006,
      "name": "IncorrectTitleLenght",
      "msg": "Incorrect title length."
    },
    {
      "code": 6007,
      "name": "IncorrectDescriptionLenght",
      "msg": "Incorrect description length."
    },
    {
      "code": 6008,
      "name": "IncorrectNameLenght",
      "msg": "Incorrect name length."
    },
    {
      "code": 6009,
      "name": "IncorrectEmailLenght",
      "msg": "Incorrect email length."
    },
    {
      "code": 6010,
      "name": "TooBigDeadline",
      "msg": "Too big deadline."
    },
    {
      "code": 6011,
      "name": "TooSmallDeadline",
      "msg": "Too small deadline."
    },
    {
      "code": 6012,
      "name": "OverDeadline",
      "msg": "Over deadline."
    },
    {
      "code": 6013,
      "name": "IncorrectAmount",
      "msg": "Incorrect amount."
    }
  ],
  "metadata": {
    "address": "96cUc7C2AXWLQveYRz4ouuQKGpCCujBixEyveJkFoYYq"
  }
}

export const PROGRAM_ID_ATO = new PublicKey('96cUc7C2AXWLQveYRz4ouuQKGpCCujBixEyveJkFoYYq');
// export const PROGRAM_ID_ATO = new PublicKey('CSoyDTHvEZB6bcCdEFHR2HTf9gBdRD6qppjKwZYb3b1z');
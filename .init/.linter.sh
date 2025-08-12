#!/bin/bash
cd /home/kavia/workspace/code-generation/online-tic-tac-toe-1426-1453/tic_tac_toe_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi


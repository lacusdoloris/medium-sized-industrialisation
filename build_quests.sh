#!/usr/bin/env bash

set -euo pipefail

QUEST_DIR="$(realpath ./config/ftbquests/quests)"
OUTPUT_DIR="$(realpath ./config/heracles)"

if [[ ! -e "$QUEST_DIR" ]]; then
    echo "can't find quest dir"
    exit 1
fi

if [[ -e "odysseus" ]]; then
    echo "updating odysseus"
    cd odysseus
    git fetch origin && git reset --hard origin/main
else
    echo "cloning odysseus"
    git clone https://github.com/terrarium-earth/odysseus
    cd odysseus
fi;

echo "building odysseus in $PWD"
npm install && npm run build --workspaces

echo "generating heracles quest files"
npm run start --workspace=odysseus-cli -- --input="$QUEST_DIR"

echo "copying generated quest files"
cp -rv odysseus-cli/output/* "$OUTPUT_DIR"

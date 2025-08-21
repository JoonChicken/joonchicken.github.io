#!/bin/bash

echo Opening new detached tmux instance...
tmux -vv new -d -s mc

echo Starting server in tmux instance...
echo Type "\"tmux a\"" in a new terminal instance to view progress and to access the console.
tmux send -t mc "make fabric" ENTER;
#!/bin/bash

echo Stopping minecraft server...

tmux send -t mc "stop" ENTER;

echo Waiting 1 minute for server to stop...
#very stupid solution
secs=$((60))
while [ $secs -gt 0 ]; do
   echo -ne "$secs\033[0K\r"
   sleep 1
   : $((secs--))
done

echo Killing tmux session...
tmux kill-session -t mc

echo Done.
#!/bin/bash
#This script forces webpack to be run.

set -e

npm run webpack

exec "$@"
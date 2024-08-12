#!/bin/bash
set -e

install() {
  yarn
  yarn build
}

tests() {
  yarn test
}

run() {
  tail -f
}

case "$1" in
"install")
    echo "Install"
    install
    ;;
"tests")
    echo "Tests"
    tests
    ;;
"run")
    echo "Run"
    run
    ;;
*)
    echo "Custom command : $@"
    exec "$@"
    ;;
esac
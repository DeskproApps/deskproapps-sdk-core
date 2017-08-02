#!/usr/bin/env bash

echo Discoverying dpat installation directory
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
DPAT_ROOT="$(${DIR}/discover.sh --module dpat)"

if [ -z "${DPAT_ROOT}" ]
then
    echo dpat is not installed locally or globally. please install dpat
    exit 1;
fi

echo Adding dpat node_modules folder to NODE_PATH
NODE_PATH=${NODE_PATH}:${DPAT_ROOT}/node_modules

WEBPACK="${DPAT_ROOT}/node_modules/.bin/webpack"
[ -z "${DPA_PACKAGE}" ] && DPA_PACKAGE='compact standalone'
for package_mode in ${DPA_PACKAGE}; do
    DPA_PACKAGE_MODE=${package_mode} ${WEBPACK} "$@"
done
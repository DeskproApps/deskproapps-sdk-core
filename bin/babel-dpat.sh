#!/usr/bin/env bash

NPM_ROOT=$(npm root -g);
DPAT_BABEL='@deskproapps/dpat/node_modules/.bin/babel'

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

LOCAL_BABEL="$( cd "${DIR}/../node_modules/" && pwd )/${DPAT_BABEL}"
GLOBAL_BABEL="${NPM_ROOT}/${DPAT_BABEL}"

BABEL=
if [ -f ${LOCAL_BABEL} ]
then
    BABEL=${LOCAL_BABEL}
elif [ -f ${GLOBAL_BABEL} ]
then
    BABEL=${GLOBAL_BABEL}
fi

if [ -z "${BABEL}" ]
then
    echo 'dpat is not installed locally or globally. please install dpat'
    exit 1;
fi
echo $BABEL;
${BABEL} "$@"



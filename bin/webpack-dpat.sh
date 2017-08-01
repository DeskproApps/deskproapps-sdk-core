#!/usr/bin/env bash

NPM_ROOT=$(npm root -g);
DPAT_WEBPACK='@deskproapps/dpat/node_modules/.bin/webpack'

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

LOCAL_WEBPACK="$( cd "${DIR}/../node_modules/" && pwd )/${DPAT_WEBPACK}"
GLOBAL_WEBPACK="${NPM_ROOT}/${DPAT_WEBPACK}"

WEBPACK=
if [ -f ${LOCAL_WEBPACK} ]
then
    WEBPACK=${LOCAL_WEBPACK}
elif [ -f ${GLOBAL_WEBPACK} ]
then
    WEBPACK=${GLOBAL_WEBPACK}
fi

if [ -z "${WEBPACK}" ]
then
    echo 'dpat is not installed locally or globally. please install dpat'
    exit 1;
fi


[ -z "${DPA_PACKAGE}" ] && DPA_PACKAGE='slim standalone'

for package_mode in ${DPA_PACKAGE}; do
    DPA_PACKAGE_MODE=${package_mode} ${WEBPACK} "$@"
done


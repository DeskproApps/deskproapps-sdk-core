#!/usr/bin/env bash

set -e # Exit with nonzero exit code if anything fails

git config user.name "Travis CI"
git config user.email "${COMMIT_AUTHOR_EMAIL}"

# If there are no changes to the compiled out (e.g. this is a README update) then just bail.
if git diff --quiet -- docs/reference; then
    echo "No changes to the output on this push; exiting."
    exit 0
fi

# Commit the "changes", i.e. the new version.
# The delta will show diffs between new and old versions.
git add -A docs/reference
git commit -m "Publishing documentation"

# Get the deploy key by using Travis's stored variables to decrypt deploy_key.enc
ENCRYPTED_KEY_VAR="encrypted_${DEPLOY_KEY_LABEL}_key"
ENCRYPTED_IV_VAR="encrypted_${DEPLOY_KEY_LABEL}_iv"
ENCRYPTED_KEY=${!ENCRYPTED_KEY_VAR}
ENCRYPTED_IV=${!ENCRYPTED_IV_VAR}
openssl aes-256-cbc -K ${ENCRYPTED_KEY} -iv ${ENCRYPTED_IV} -in src/travis/deploy-key.enc -out src/travis/deploy-key -d
chmod 600 src/travis/deploy-key
eval `ssh-agent -s`
ssh-add deploy_key

# Now that we're all set up, we can push.
git push origin
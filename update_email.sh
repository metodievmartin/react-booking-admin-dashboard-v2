#!/bin/bash

# This script updates the author and committer email in the entire history of a Git repository.
# Make sure to navigate to the root of your Git repository before running this script.

# Define the old and new email/name values
OLD_EMAIL="martin.metodiev@tryzens.com"
CORRECT_EMAIL="martin.metodiew@gmail.com"

# Confirm the details before proceeding
echo "This script will rewrite the Git history for the repository at $(pwd)."
echo "Replacing all occurrences of:"
echo "  OLD_EMAIL: $OLD_EMAIL"
echo "With:"
echo "  CORRECT_EMAIL: $CORRECT_EMAIL"
read -p "Do you want to proceed? (yes/no): " CONFIRM

if [[ "$CONFIRM" != "yes" ]]; then
    echo "Aborting script."
    exit 1
fi

# Rewriting the Git history
git filter-branch --env-filter '
if [ "$GIT_COMMITTER_EMAIL" = "$OLD_EMAIL" ]; then
    export GIT_COMMITTER_EMAIL="$CORRECT_EMAIL"
fi
if [ "$GIT_AUTHOR_EMAIL" = "$OLD_EMAIL" ]; then
    export GIT_AUTHOR_EMAIL="$CORRECT_EMAIL"
fi
' --tag-name-filter cat -- --branches --tags

# Inform the user of completion
echo "Git history rewrite is complete."
echo "Review the commit history using 'git log --format=\"%an <%ae>\"'."
echo "If everything looks correct, push the changes using 'git push --force'."
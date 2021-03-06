#!/bin/bash
# The execution of this script stops if a command or pipeline has an error.
# For example, failure to install a dependent package will cause the script
# to stop execution.
set -e

# Specify a package version id (starts with 04t)
# If you know the package alias but not the id, use force:package:version:list to find it.
PACKAGE='04t1R000001QewqQAC'

# Specify the user name of the subscriber org.
USER_NAME=michaelmatonis@hotmail.com

# Specify the timeout in minutes for package installation.
WAIT_TIME=15
echo "Retrieving dependencies for package Id: "$PACKAGE
# Execute soql query to retrieve package dependencies in json format.
RESULT_JSON=`sfdx force:data:soql:query -u michaelmatonis@hotmail.com -t -q "SELECT Dependencies FROM SubscriberPackageVersion WHERE Id='04t1R000001QewqQAC'" --json`
echo $RESULT_JSON
read ABC
# Parse the json string using python to test whether the result json contains a list of ids or not.
DEPENDENCIES=`echo $RESULT_JSON | python -c 'import sys, json; print json.load(sys.stdin)["result"]["records"][0]["Dependencies"]'`
read DEF
echo "done"
# # If the parsed dependencies is None, the package has no dependencies. Otherwise, parse the result into a list of ids.
# # Then loop through the ids to install each of the dependent packages.
# if [[ "$DEPENDENCIES" != 'None' ]]; then
#     DEPENDENCIES=`echo $RESULT_JSON | python -c '

# import sys, json
# ids = json.load(sys.stdin)["result"]["records"][0]["Dependencies"]["ids"]
# dependencies = []

# for id in ids:
#     dependencies.append(id["subscriberPackageVersionId"])
# print " ".join(dependencies)
# '` 
#     echo "The package you are installing depends on these packages (in correct dependency order): "$DEPENDENCIES

#     for id in $DEPENDENCIES
#     do
#         echo "Installing dependent package: "$id
#         sfdx force:package:install --package $id -u $USER_NAME -w $WAIT_TIME --publishwait 10
#     done
# else
#     echo "The package has no dependencies"
# fi

# # After processing the dependencies, proceed to install the specified package.
# echo "Installing package: "$PACKAGE
# sfdx force:package:install --package $PACKAGE -u $USER_NAME -w $WAIT_TIME --publishwait 10


# exit 0;
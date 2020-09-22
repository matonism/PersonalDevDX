#!/bin/bash
# set the STRING variable
STRING="Hello World!"

# echo "Enter your Dev Hub Username"
# read DevHubUsername

echo "What folder would you like to deploy (default: force-app)"
read DefaultFolder

echo "What would you like to call your scratch org?"
read ScratchOrgAlias

echo "How long do you want your scratch org to last (1-30)?"
read ScratchOrgDuration

# echo "Should we install base-lib [y]? (or manually push metadata? [n])"
# read InstallBaseLib

echo "Creating Scratch Org ${ScratchOrgAlias}..."
sfdx force:org:create -f ./config/project-scratch-def.json -a $ScratchOrgAlias -d $ScratchOrgDuration -s

# echo 'Deploying Pre-Install base-lib Manual Metadata...'
# sfdx force:source:deploy -p ../sfdx-base-lib/manual-metadata/pre-install -u $ScratchOrgAlias

# if [ $InstallBaseLib == 'Y' ] || [ $InstallBaseLib == 'y' ] 
# then
#     JSON_DEPENDENCIES=`sfdx force:data:soql:query -u ${DevHubUsername} -t -q "SELECT SubscriberPackageVersionId FROM Package2Version WHERE Package2Id='0Ho1U0000004CJhSAM' ORDER BY MajorVersion DESC, MinorVersion DESC, PatchVersion DESC, BuildNumber DESC LIMIT 1" --json`
    # echo "Found the following package dependencies"
    # echo $JSON_DEPENDENCIES

    # Parse the json string using python to test whether the result json contains a list of ids or not.
#     BASE_PACKAGE_VERSION=`echo $JSON_DEPENDENCIES | python -c 'import sys, json; print(json.load(sys.stdin)["result"]["records"][0]["SubscriberPackageVersionId"])'`
#     echo $BASE_PACKAGE_VERSION

#     echo 'Installing Package Dependencies...'
#     sfdx force:package:install --wait 10 -b 10 -p $BASE_PACKAGE_VERSION -k NJ_SFDX_BASE_LIB_KEY --noprompt -u $ScratchOrgAlias

# else

#     echo 'Pushing base-lib manually...'
#     sfdx force:source:deploy -p ../sfdx-base-lib/force-app

# fi 

# echo 'Deploying Post-Install base-lib Manual Metadata...'
# sfdx force:source:deploy -p ../sfdx-base-lib/manual-metadata/post-install -u $ScratchOrgAlias

if [[ $DefaultFolder == "" ]] || [[ $InstallBaseLib == "force-app" ]] 
then
    echo "Pushing Local Metadata..."
    sfdx force:source:push -u $ScratchOrgAlias
else

    echo "Pushing ${DefaultFolder} manually..."
    sfdx force:source:deploy -p $DefaultFolder -u $ScratchOrgAlias

fi 

# echo 'Assigning Default Permission Sets...'
# sfdx force:user:permset:assign -n System_Admin -u $ScratchOrgAlias
# sfdx force:user:permset:assign -n Platform_Event_Message_Read_Write -u $ScratchOrgAlias

echo 'Opening Scratch Org...'
sfdx force:org:open -u $ScratchOrgAlias

echo "Operations have completed. Press enter to close the window"
read close
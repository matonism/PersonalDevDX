rem $1 = scratch org alias name
rem $2 = username alias

sfdx force:org:create -f ../config/project-scratch-def.json -a $1

sfdx force:user:create --setalias $2 --targetusername $1 --definitionfile ../config/user-def.json

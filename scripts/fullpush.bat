
@echo on
call sfdx force:org:create -f ./config/project-scratch-def.json -a 'testing-scratch' -s

echo installing managed package dependencies in %USER_NAME%...
sfdx force:package:install --package LockerServicePackage -u %USER_NAME% -w 1000 --publishwait 10

echo pushing source metadata to %USER_NAME%...
sfdx force:source:push -u %USER_NAME%

exit 0;
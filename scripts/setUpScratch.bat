@set /p ScratchOrgAlias=What would you like to call your scratch org?

@echo on
call sfdx force:org:create -f ./config/project-scratch-def.json -a %ScratchOrgAlias% -s
@echo on
call sfdx force:source:push
@echo on
call sfdx force:user:permset:assign -n Zoo_Manager
@echo on
call sfdx force:user:permset:assign -n Aircraft_Calendar
@echo on
call sfdx force:user:permset:assign -n Locker_Service_Demo
@echo on
call sfdx force:user:permset:assign -n Movie_Rental_Admin
@echo on
call sfdx force:user:permset:assign -n User_Panel_User

@echo on
call sfdx force:data:tree:import -f data-sets/Zoo__c-Animal__c.json
@echo on
call sfdx force:org:open


Explain That Again(R) version 1.0 03/03/2017

GENERAL USAGE NOTES
--------------------

- Create a new directory on your terminal, go to the new directory, then clone the the 
  repository by typing: 
	git clone “http://github.com/r-meagher/CS2212Group14.git”

  in this directory, type:
	grails run-app

----------------------------------------------

Installing
-----------

- Installing SDKman:
	curl -s get.sdkman.io | bash
	source “$HOME/.sdkman/bin/sdkman-init.sh”

- then restart your terminal, and type:
	sdk install grails
	sdk install groovy

- Installing node:
	Download and install version 6.10.0 LTS from https://nodejs.org/en/

- Installing react and react-facebook:
	git clone https://github.com/keppelen/react-facebook-login.git && cd react-facebook-login
	npm install react react-dom react-facebook-login --save

-Installing react-router:
	npm install --save react-router

——----------------------------------------------

Repository Organization
------------------------

- The features of managing administrators (adding adms and deleting adms) are implemented 
  in UserController.
- The login authentication using Facebook api is implemented in UserController.
- Creating sessions and deleting sessions are implemented in SessionController. 
- Creating classes and deleting classes are implemented in ClassController. 
- Showing the “don’t understand” graph is implemented in GraphController. 
  

==============================================

Group14 can be reached at:

Slack:		https://2212group14.slack.com
Web site:	https://r-meagher.github.io/CS2212Group14/

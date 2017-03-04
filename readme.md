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
——----------------------------------------------
Because the design of our application has two main components
(a cloud-based service to store and retrieve sessions, and a local service to
display the graph and manage chat windows), we decided to break our project into
two different Grails projects for stage 2, with <REDACTED> representing the cloud
server and <REDACTED> representing the local server on the Professor’s computer.

The cloud server so far manages the login and authentication of the user. It gives
the user the option to sign up via email (redirecting the User to an account creation link)
or to sign up via Facebook, at which point they are prompted to enter their Facebook
credentials and are automatically logged in afterward. The Facebook credentials are stored
as a cookie on the user’s computer, meaning that they are automatically logged back in on returning to the page.

Since the application is broken down into two applications, in order to fully test it each app must
be run separately. They can be found in their respective folders, Local and Cloud. To run, go into the
respective folder, input the grails run-app -https command, and navigate to the webpage that is prompted.
Adblockers may interfere with the Facebook authentication, so if it doesn’t work they may need to be disabled.
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
Slack:      https://2212group14.slack.com
Web site:   https://r-meagher.github.io/CS2212Group14/
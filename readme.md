# Explain That Again
### CS2212 Group 14

[<b>Visit our project site.</b>](https://r-meagher.github.io/CS2212Group14/)

GENERAL USAGE NOTES
--------------------
    
----------------------------------------------Installing----------------------------------------------
- Our project runs on PHP
- You need to first have homebrew install on your machine
    - brew install php70
    - brew install memcached
    - brew install mysql

- You next need to set your mysql password open your terminal and execute
    - SUDO mysql
    - ALTER USER 'root'@'localhost' IDENTIFIED BY '$NEWPASSWORD';

- Next you need to go into env.php in the main directory and alter line 9 to have yoru new password
    - ex.  putenv("MYSQL_PASSWORD=$NEWPASSWORD");

- At this point your project should run by running index.php, however, we strongly encourage downloading PhpStorm to run our project.
    
——---------------------------------Run instructions-------——---------------------------------
You must have cookies enabled, as well as popups.

——---------------------------------Repository Organization——---------------------------------

Our repository has been separated according to MVC design. All of our model data is contained
within the MySql database that is generated upon running the application.
Controllers are in the form of php scripts that access the mysql database, these can be found in
/public_html/controller.
All views can be found in public_html/html_elements, as well as in the root directory as well as 
being dynamically generated in public_html/assets/js.

==============================================
Group14 can be reached at:
Slack:      https://2212group14.slack.com
Web site:   https://r-meagher.github.io/CS2212Group14/

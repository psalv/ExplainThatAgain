# Explain That Again
### CS2212 Group 14

[<b>Visit our project site.</b>](https://r-meagher.github.io/CS2212Group14/) <br>
[<b>Go to Explain That Again.</b>](https://explainthatagain.herokuapp.com/index.php)

GENERAL USAGE NOTES
--------------------

--------------------------------------------Installation for windows----------------------------------------------
- First download php-7.0 from http://windows.php.net/download/

- Extract and rename the folder to php and move to C: drive.

- In your php folder rename php.ini-development to php.ini. 
    - Open php.ini with notepad and remove the semi-colon infront of extension_dir = "ext" and the semi-colon infront of                       extension=php_pdo_mysql.dll.
    
- Set environment variable for PHP:
    - From the Control Panel -> System -> Advanced system settings-> Advanced-> Environment Variables.
      Scroll down the system variables list and click on ‘Path’ followed by the ‘Edit’ button. Enter “;C:php” at the end of the Variable       value line (don’t forget the semi-colon).

- After setting up environment variable, a system reboot is required.

- Next you need to download the MySQL installer http://www.mysql.com/downloads/installer/5.6.html

- Go through the installation and enter MySQL root password and confirm password.

- Next you need to go into env.php in the main directory and alter line 9 to have your new password
    - ex.  putenv("MYSQL_PASSWORD=$NEWPASSWORD");

- To run the project locally, we highly recommend downloading [PhpStorm]( https://www.jetbrains.com/phpstorm/)

- Open this project within PhpStorm and navigate to public_html/index.php, and run this file locally to launch our project.

--------------------------------------------Installation for mac--------------------------------------------------
- Our project runs on PHP so downloading homebrew is highly recommended
    - ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

- After installing homebrew on your machine
    - brew install php70
    - brew install memcached
    - brew install mysql

- You next need to set your mysql password open your terminal and execute
    - SUDO mysql
    - ALTER USER 'root'@'localhost' IDENTIFIED BY '$NEWPASSWORD';

- Next you need to go into env.php in the main directory and alter line 9 to have your new password
    - ex.  putenv("MYSQL_PASSWORD=$NEWPASSWORD");

- To run the project locally, we highly recommend downloading [PhpStorm]( https://www.jetbrains.com/phpstorm/)

- Open this project within PhpStorm and navigate to public_html/index.php, and run this file locally to launch our project.
    
-------------------------------------------Run instructions-------------------------------------------------------
You must have cookies enabled, as well as popups.

-------------------------------------------Repository Organization------------------------------------------------

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

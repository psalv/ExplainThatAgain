package com.explainthatagain

import grails.plugin.springsecurity.annotation.Secured
import grails.web.RequestParameter
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.RequestParam


class UserController {

    static responseFormats = ['json']

    def userService

    def signUp(@RequestParameter('username') String username, @RequestParameter('password') String password) {
        log.debug("Signing up a new user: ${username}:[******]")
        def user = userService.signUp(username, password)
        def payload = [username: user.username] as Object
        println User.getAll()
        respond payload, status: HttpStatus.CREATED
    }

    def facebookSignin(@RequestParameter('username') String username, @RequestParameter('password') String password) {
        if (User.countByUsername(username) == 0) {
            signUp(username, password)
            respond username, status: HttpStatus.CREATED
        }
        else {
            respond username, status: HttpStatus.OK
        }
    }

    def handleUserExists(UserExistsException userExistsException) {
        def payload = [error: userExistsException.message] as Object
        respond payload, status: HttpStatus.BAD_REQUEST
    }

    def handleIllegalArgument(IllegalArgumentException ex) {
        def payload = [error: ex.message] as Object
        respond payload, status: HttpStatus.BAD_REQUEST
    }
}

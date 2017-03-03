package com.explainthatagain

import grails.transaction.Transactional
import com.explainthatagain.util.OptionalCategory

class UserService {

    public static final String ROLE_USER = 'ROLE_USER'

    @Transactional(rollbackFor = [UserExistsException, IllegalArgumentException])
    def signUp(String username, String password) {
        if(!username || !password) throw new IllegalArgumentException("username and password must not be blank")

        def lowerCaseUsername = username.toLowerCase()
        def role = Optional
            .ofNullable(Role.findByAuthority(ROLE_USER))
            .orElse(new Role(authority: ROLE_USER).save(flush: true))

        def user = use(OptionalCategory) {
            Optional
            .ofNullable(User.findByUsername(lowerCaseUsername))
            .andThrow { User user ->
                new UserExistsException("User ${lowerCaseUsername} is already signed up")
            }
            .orElse(new User(username: lowerCaseUsername, password: password).save(flush: true))
        } as User
        log.debug("Created user ${user}")

        UserRole.create(user, role, true)
        log.debug("Granted user role ${role.authority}#${role.id}")

        user
    }
}

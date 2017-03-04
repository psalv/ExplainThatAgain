package com.explainthatagain

/**
 *
 */
class UserExistsException extends Exception {
    UserExistsException() {
    }

    UserExistsException(String message) {
        super(message)
    }
}

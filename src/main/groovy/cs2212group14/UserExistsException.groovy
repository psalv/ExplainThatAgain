package cs2212group14

class UserExistsException extends  Exception {
    UserExistsException() {
    }

    UserExistsException(String message) {
        super(message)
    }
}

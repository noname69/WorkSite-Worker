package online.nonamelab.WorkSite_Work.exception.auth;

import online.nonamelab.WorkSite_Work.exception.core.BadRequestException;

public class InvalidCredentialsException extends BadRequestException {

    public InvalidCredentialsException() {
        super("Invalid username or password");
    }
}

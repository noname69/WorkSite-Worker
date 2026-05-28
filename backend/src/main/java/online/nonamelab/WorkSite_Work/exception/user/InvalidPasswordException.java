package online.nonamelab.WorkSite_Work.exception.user;

import online.nonamelab.WorkSite_Work.exception.core.BadRequestException;

public class InvalidPasswordException extends BadRequestException {

    public InvalidPasswordException() {
        super("Invalid password");
    }
}
package online.nonamelab.WorkSite_Work.exception.user;

import online.nonamelab.WorkSite_Work.exception.core.BadRequestException;

public class InvalidUserStateException extends BadRequestException {

    public InvalidUserStateException(String message) {
        super(message);
    }
}

package online.nonamelab.WorkSite_Work.exception.user;


import online.nonamelab.WorkSite_Work.exception.core.BadRequestException;

public class UsernameAlreadyExistsException extends BadRequestException {

    public UsernameAlreadyExistsException() {
        super("Username already exists");
    }
}

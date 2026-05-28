package online.nonamelab.WorkSite_Work.exception.user;


import online.nonamelab.WorkSite_Work.exception.core.BadRequestException;

public class EmailAlreadyExistsException extends BadRequestException {

    public EmailAlreadyExistsException() {
        super("Email already exists");
    }
}

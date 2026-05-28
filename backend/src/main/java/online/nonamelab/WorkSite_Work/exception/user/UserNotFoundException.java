package online.nonamelab.WorkSite_Work.exception.user;

import online.nonamelab.WorkSite_Work.exception.core.NotFoundException;

public class UserNotFoundException extends NotFoundException {

    public UserNotFoundException() {
        super("User not found");
    }
}

package online.nonamelab.WorkSite_Work.exception.user;

import online.nonamelab.WorkSite_Work.exception.core.ForbiddenException;

public class SelfActionNotAllowedException extends ForbiddenException {

    public SelfActionNotAllowedException(String action) {
        super("You cannot " + action + " your own account");
    }
}

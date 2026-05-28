package online.nonamelab.WorkSite_Work.exception.auth;

import online.nonamelab.WorkSite_Work.exception.core.UnauthorizedException;

public class InvalidAuthenticationPrincipalException extends UnauthorizedException {

    public InvalidAuthenticationPrincipalException() {
        super("Invalid authentication principal");
    }
}

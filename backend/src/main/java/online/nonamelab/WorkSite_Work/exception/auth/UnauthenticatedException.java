package online.nonamelab.WorkSite_Work.exception.auth;

import online.nonamelab.WorkSite_Work.exception.core.UnauthorizedException;

public class UnauthenticatedException extends UnauthorizedException {

  public UnauthenticatedException() {
    super("Authentication required");
  }
}

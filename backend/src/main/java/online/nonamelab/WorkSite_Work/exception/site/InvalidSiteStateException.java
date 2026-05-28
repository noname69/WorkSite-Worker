package online.nonamelab.WorkSite_Work.exception.site;

import online.nonamelab.WorkSite_Work.exception.core.BadRequestException;

public class InvalidSiteStateException extends BadRequestException {

    public InvalidSiteStateException(String message) {
        super(message);
    }
}

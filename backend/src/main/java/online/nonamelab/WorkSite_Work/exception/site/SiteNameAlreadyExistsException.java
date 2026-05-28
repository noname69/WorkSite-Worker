package online.nonamelab.WorkSite_Work.exception.site;

import online.nonamelab.WorkSite_Work.exception.core.BadRequestException;

public class SiteNameAlreadyExistsException extends BadRequestException {

    public SiteNameAlreadyExistsException() {
        super("Site name already exists");
    }
}

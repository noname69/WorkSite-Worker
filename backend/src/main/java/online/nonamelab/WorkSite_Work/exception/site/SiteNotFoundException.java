package online.nonamelab.WorkSite_Work.exception.site;

import online.nonamelab.WorkSite_Work.exception.core.NotFoundException;

public class SiteNotFoundException extends NotFoundException {
    public SiteNotFoundException() {
        super("Site not found");
    }
}

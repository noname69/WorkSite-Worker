package online.nonamelab.WorkSite_Work.exception;

public record ApiFieldError(
        String field,
        String message
) {
}

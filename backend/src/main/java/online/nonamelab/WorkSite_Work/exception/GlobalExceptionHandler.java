package online.nonamelab.WorkSite_Work.exception;

import jakarta.servlet.http.HttpServletRequest;
import online.nonamelab.WorkSite_Work.exception.core.ApiException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.List;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ApiError> handleBadCredentials(
            BadCredentialsException ex,
            HttpServletRequest request) {

        ApiError error = new ApiError(
                401,
                "BAD_CREDENTIALS",
                "Invalid username or password",
                request.getRequestURI(),
                LocalDateTime.now(),
                List.of()
        );

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
    }

    @ExceptionHandler(ApiException.class)
    public ResponseEntity<ApiError> handleApiException(
            ApiException ex,
            HttpServletRequest request
    ) {

        ApiError error = new ApiError(
                ex.getStatus().value(),
                ex.getStatus().name(),
                ex.getMessage(),
                request.getRequestURI(),
                LocalDateTime.now(),
                List.of()
        );

        return ResponseEntity.status(ex.getStatus()).body(error);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiError> handleValidation(
            MethodArgumentNotValidException ex,
            HttpServletRequest request) {

        List<ApiFieldError> fieldErrors = ex.getBindingResult()
                .getFieldErrors()
                .stream()
                .map(this::mapFieldError)
                .toList();

        ApiError error = new ApiError(
                HttpStatus.BAD_REQUEST.value(),
                "VALIDATION_ERROR",
                "Validation failed",
                request.getRequestURI(),
                LocalDateTime.now(),
                fieldErrors
        );

        return ResponseEntity.badRequest().body(error);
    }

    private ApiFieldError mapFieldError(FieldError error) {
        return new ApiFieldError(
                error.getField(),
                error.getDefaultMessage()
        );
    }

    @ExceptionHandler(DisabledException.class)
    public ResponseEntity<ApiError> handleDisabledUser(
            DisabledException ex,
            HttpServletRequest request
    ) {

        ApiError error = new ApiError(
                HttpStatus.UNAUTHORIZED.value(),
                "USER_DISABLED",
                "User account is inactive",
                request.getRequestURI(),
                LocalDateTime.now(),
                List.of()
        );

        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body(error);
    }

//    @ExceptionHandler(Exception.class)
//    public ResponseEntity<ApiError> handleUnknown(
//            Exception ex,
//            HttpServletRequest request
//    ) {
//
//        ApiError error = new ApiError(
//                500,
//                "INTERNAL_ERROR",
//                "Internal server error",
//                request.getRequestURI(),
//                LocalDateTime.now(),
//                List.of()
//        );
//
//        return ResponseEntity.internalServerError().body(error);
//    }
}

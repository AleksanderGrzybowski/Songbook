package songbook.song.exceptions;

import java.util.Collections;
import java.util.List;

public class ValidationException extends RuntimeException {
    
    public final List<FieldError> errors;
    
    public ValidationException(List<FieldError> errors) {
        this.errors = Collections.unmodifiableList(errors);
    }
    
    public static ValidationExceptionBuilder builder() {
        return new ValidationExceptionBuilder();
    }
    
    public static class FieldError {
        public final String field, cause;
        
        FieldError(String field, String cause) {
            this.field = field;
            this.cause = cause;
        }
    }
}

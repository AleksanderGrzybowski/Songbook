package songbook.song.exceptions;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class ValidationException extends RuntimeException {
    
    public final List<FieldError> errors;
    
    private ValidationException(List<FieldError> errors) {
        this.errors = Collections.unmodifiableList(errors);
    }
    
    public static ValidationExceptionBuilder builder() {
        return new ValidationExceptionBuilder();
    }
    
    public static class ValidationExceptionBuilder {
        private List<FieldError> errors = new ArrayList<>();
        
        public ValidationExceptionBuilder add(String field, String cause) {
            errors.add(new FieldError(field, cause));
            return this;
        }
        
        public ValidationExceptionBuilder add(boolean isValid, String field, String cause) {
            if (!isValid) {
                add(field, cause);
            }
            return this;
        }
        
        public void throwIfErrors() {
            if (errors.size() > 0) {
                throw build();
            }
        }
        
        public ValidationException build() {
            return new ValidationException(errors);
        }
    }
    
    public static class FieldError {
        public final String field, cause;
        
        FieldError(String field, String cause) {
            this.field = field;
            this.cause = cause;
        }
    }
}

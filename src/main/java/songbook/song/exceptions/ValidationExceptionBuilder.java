package songbook.song.exceptions;

import java.util.ArrayList;
import java.util.List;

import static songbook.song.exceptions.ValidationException.*;

public class ValidationExceptionBuilder {
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

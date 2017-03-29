package songbook.song;

import songbook.song.exceptions.ValidationException;

import java.util.List;

public class ValidationExceptionDto {
    public final List<ValidationException.FieldError> errors;

    ValidationExceptionDto(ValidationException e) {
        this.errors = e.errors;
    }
}

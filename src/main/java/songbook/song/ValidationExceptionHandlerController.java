package songbook.song;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import songbook.song.exceptions.ValidationException;

@ControllerAdvice
@RestController
public class ValidationExceptionHandlerController {
    
    @ExceptionHandler(ValidationException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ValidationExceptionDto handleValidationException(ValidationException e) {
        return new ValidationExceptionDto(e);
    }
}

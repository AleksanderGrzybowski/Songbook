package songbook;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/health")
public class HealthController {
    
    @RequestMapping(value = "", method = RequestMethod.GET)
    public BackendHealthy status() {
        return new BackendHealthy();
    }
    
    
    static class BackendHealthy {
        public final String status = "OK";
    }
}

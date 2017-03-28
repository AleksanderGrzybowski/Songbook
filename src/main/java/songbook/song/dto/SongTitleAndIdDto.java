package songbook.song.dto;

public class SongTitleAndIdDto {
    public final String title;
    
    public final Long id;
    
    public SongTitleAndIdDto(String title, Long id) {
        this.title = title;
        this.id = id;
    }
}

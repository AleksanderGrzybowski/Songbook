package songbook.song.dto;

public class SongWithLyricsDto {
    public final Long id;
    
    public final String title;
    
    public final String text;
    
    public SongWithLyricsDto(Long id, String title, String text) {
        this.id = id;
        this.title = title;
        this.text = text;
    }
    
    public SongWithLyricsDto() { // not sure why this is needed
        this(null, null, null);
    }
}

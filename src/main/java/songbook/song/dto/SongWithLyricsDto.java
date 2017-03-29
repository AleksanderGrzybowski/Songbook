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
    
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        
        SongWithLyricsDto that = (SongWithLyricsDto) o;
        
        if (id != null ? !id.equals(that.id) : that.id != null) return false;
        if (title != null ? !title.equals(that.title) : that.title != null) return false;
        return text != null ? text.equals(that.text) : that.text == null;
    }
    
    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (title != null ? title.hashCode() : 0);
        result = 31 * result + (text != null ? text.hashCode() : 0);
        return result;
    }
}

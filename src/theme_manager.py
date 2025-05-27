def set_theme(theme_name):
    """Returns the theme settings based on the given theme name."""
    themes = {
        "classic": {"board_color": "brown", "piece_style": "default"},
        "modern": {"board_color": "gray", "piece_style": "minimal"},
        "wooden": {"board_color": "wood_texture", "piece_style": "engraved"},
        "dark": {"board_color": "black", "piece_style": "sleek"},
    }
    
    # Normalize input to be case-insensitive
    theme_name = theme_name.lower()
    
    return themes.get(theme_name, themes["classic"])

import time

class ChessTimer:
    """A simple chess timer with pause/resume and time tracking."""

    def __init__(self, time_limit_seconds):
        self.initial_time = time_limit_seconds
        self.time_left = time_limit_seconds
        self.start_time = None
        self.running = False

    def start(self):
        """Start or resume the timer."""
        if not self.running:
            self.start_time = time.time()
            self.running = True

    def pause(self):
        """Pause the timer and update time left."""
        if self.running:
            elapsed = time.time() - self.start_time
            self.time_left -= elapsed
            self.running = False
            self.start_time = None

    def reset(self):
        """Reset the timer to the initial time."""
        self.time_left = self.initial_time
        self.start_time = None
        self.running = False

    def get_time_left(self):
        """Return the current time left in seconds."""
        if self.running:
            elapsed = time.time() - self.start_time
            return max(0, self.time_left - elapsed)
        return max(0, self.time_left)

    def get_time_formatted(self):
        """Return time left as MM:SS string."""
        total_seconds = int(self.get_time_left())
        minutes = total_seconds // 60
        seconds = total_seconds % 60
        return f"{minutes:02}:{seconds:02}"

    def is_running(self):
        return self.running



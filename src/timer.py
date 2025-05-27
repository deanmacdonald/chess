import time

class ChessTimer:
    def __init__(self, time_limit):
        self.time_left = time_limit
        self.start_time = None

    def start_timer(self):
        self.start_time = time.time()

    def stop_timer(self):
        if self.start_time:
            elapsed = time.time() - self.start_time
            self.time_left -= elapsed
            self.start_time = None

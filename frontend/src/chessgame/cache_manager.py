import os
import pickle
import time

CACHE_DIR = os.path.join(os.path.dirname(__file__), '..', '..', 'cache')
os.makedirs(CACHE_DIR, exist_ok=True)

def _get_path(name):
    return os.path.join(CACHE_DIR, f"{name}.pkl")

def save_to_cache(name, data):
    """Save data to cache under a given name."""
    path = _get_path(name)
    with open(path, 'wb') as f:
        pickle.dump({'timestamp': time.time(), 'data': data}, f)

def load_from_cache(name, max_age_seconds=None):
    """Load cached data. Optionally expires after `max_age_seconds`."""
    path = _get_path(name)
    if not os.path.exists(path):
        return None

    with open(path, 'rb') as f:
        content = pickle.load(f)

    if max_age_seconds:
        age = time.time() - content['timestamp']
        if age > max_age_seconds:
            return None  # Cache expired

    return content['data']

def clear_cache(name=None):
    """Clear a single cache file, or all if name is None."""
    if name:
        path = _get_path(name)
        if os.path.exists(path):
            os.remove(path)
    else:
        for file in os.listdir(CACHE_DIR):
            if file.endswith('.pkl'):
                os.remove(os.path.join(CACHE_DIR, file))

def list_cache():
    """List all cache files currently stored."""
    return [f for f in os.listdir(CACHE_DIR) if f.endswith('.pkl')]

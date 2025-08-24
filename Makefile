install:
    pip install -r requirements.txt
    pip install -r requirements-dev.txt

lint:
    ruff src
    isort src
    black src

test:
    pytest

typecheck:
    mypy src

format:
    black src
    isort src

security:
    bandit -r src
    safety check

notebooks:
    nbqa black notebooks/
    nbqa isort notebooks/
    nbqa ruff notebooks/
    nbqa mypy notebooks/


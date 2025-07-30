from setuptools import setup, find_packages

setup(
    name="chessgame",
    version="1.0",
    package_dir={"": "src"},
    packages=find_packages(where="src"),
    install_requires=[
        "PyQt5"
    ],
    entry_points={
        "console_scripts": [
            "run-chess = chessgame.main:main"
        ]
    }
)

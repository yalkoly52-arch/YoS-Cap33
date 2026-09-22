
import sqlite3
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
DATA_DIR = BASE_DIR / "data"
DB_PATH = DATA_DIR / "yoscap.db"


def get_connection():
    DATA_DIR.mkdir(parents=True, exist_ok=True)

    connection = sqlite3.connect(DB_PATH)
    connection.row_factory = sqlite3.Row

    return connection


def init_database():
    connection = get_connection()

    connection.execute(
        """
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            yos_id TEXT UNIQUE NOT NULL,
            google_id TEXT UNIQUE,
            email TEXT UNIQUE,
            name TEXT NOT NULL,
            avatar TEXT,
            phone TEXT UNIQUE,
            created_at TEXT NOT NULL
        )
        """
    )

    connection.commit()
    connection.close()
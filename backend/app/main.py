import secrets
import sqlite3
import string
from contextlib import asynccontextmanager
from datetime import datetime, timezone

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

from .database import get_connection, init_database


@asynccontextmanager
async def lifespan(app: FastAPI):
    init_database()
    yield


app = FastAPI(
    title="YoS Cap API",
    version="1.0.0",
    lifespan=lifespan,
)


# =========================
# Models
# =========================

class TestUser(BaseModel):
    name: str


class RegisterUser(BaseModel):
    name: str
    email: str | None = None
    phone: str | None = None
    avatar: str | None = None


# =========================
# YoS ID Generator
# =========================

def generate_yos_id():
    alphabet = string.ascii_uppercase + string.digits

    while True:
        code = "".join(
            secrets.choice(alphabet)
            for _ in range(8)
        )

        yos_id = f"YOS-{code}"

        connection = get_connection()

        try:
            existing = connection.execute(
                "SELECT id FROM users WHERE yos_id = ?",
                (yos_id,),
            ).fetchone()

        finally:
            connection.close()

        if existing is None:
            return yos_id


# =========================
# Root
# =========================

@app.get("/")
def root():
    return {
        "app": "YoS Cap",
        "status": "online",
        "message": "YoS Cap Backend is running",
    }


# =========================
# Health Check
# =========================

@app.get("/health")
def health():
    return {
        "status": "ok",
        "database": "connected",
    }


# =========================
# Test User
# =========================

@app.post("/users/test")
def create_test_user(user: TestUser):
    yos_id = generate_yos_id()

    connection = get_connection()

    try:
        cursor = connection.execute(
            """
            INSERT INTO users (
                yos_id,
                name,
                created_at
            )
            VALUES (?, ?, ?)
            """,
            (
                yos_id,
                user.name,
                datetime.now(timezone.utc).isoformat(),
            ),
        )

        connection.commit()

        return {
            "success": True,
            "user_id": cursor.lastrowid,
            "yos_id": yos_id,
            "name": user.name,
        }

    except sqlite3.IntegrityError as error:
        connection.rollback()

        raise HTTPException(
            status_code=409,
            detail=f"User creation conflict: {error}",
        )

    except Exception as error:
        connection.rollback()

        raise HTTPException(
            status_code=500,
            detail=f"Could not create user: {error}",
        )

    finally:
        connection.close()


# =========================
# Real Registration
# =========================

@app.post("/users/register")
def register_user(user: RegisterUser):
    yos_id = generate_yos_id()

    connection = get_connection()

    try:
        cursor = connection.execute(
            """
            INSERT INTO users (
                yos_id,
                email,
                name,
                avatar,
                phone,
                created_at
            )
            VALUES (?, ?, ?, ?, ?, ?)
            """,
            (
                yos_id,
                user.email,
                user.name,
                user.avatar,
                user.phone,
                datetime.now(timezone.utc).isoformat(),
            ),
        )

        connection.commit()

        return {
            "success": True,
            "user_id": cursor.lastrowid,
            "yos_id": yos_id,
            "name": user.name,
            "email": user.email,
            "phone": user.phone,
            "avatar": user.avatar,
        }

    except sqlite3.IntegrityError as error:
        connection.rollback()

        raise HTTPException(
            status_code=409,
            detail=f"Account already exists or data conflict: {error}",
        )

    except Exception as error:
        connection.rollback()

        raise HTTPException(
            status_code=500,
            detail=f"Could not register user: {error}",
        )

    finally:
        connection.close()


# =========================
# Get User By YoS ID
# =========================

@app.get("/users/{yos_id}")
def get_user(yos_id: str):
    connection = get_connection()

    try:
        user = connection.execute(
            """
            SELECT
                id,
                yos_id,
                google_id,
                email,
                name,
                avatar,
                phone,
                created_at
            FROM users
            WHERE yos_id = ?
            """,
            (yos_id,),
        ).fetchone()

    finally:
        connection.close()

    if user is None:
        raise HTTPException(
            status_code=404,
            detail="User not found",
        )

    return {
        "success": True,
        "user": dict(user),
    }
import socket

def send_move(move, conn):
    conn.sendall(move.encode())

def receive_move(conn):
    return conn.recv(1024).decode()

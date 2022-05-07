# Decentralized-Expense-Manager

This application is an expense manager for daily use. User can track and record expenses.
The Problem  we aim to solve using a decentraliced peer to peer application is to avoid using any 3rd party applications.

Arcitecture:

A server is hosted and all the peers register themself to the server. The sever has peer-ids and keys. keys are used to defferentiate between peers.
socket.io is used to established peer to peer network.

Use Case:

1) User A uses local storage for transaction details.
2) When User A wants to use another device. User registers from the new device to server with same key.
3) If the key matches in the server the data is transfered to the new device. Hence data privacy is eastablished.
4) The data is securly transmitted using RSA encryption.
5) Private key is used to decrypt the data in new device.

How to run?

1)install necessary packages using npm

2)https://localhost:4000


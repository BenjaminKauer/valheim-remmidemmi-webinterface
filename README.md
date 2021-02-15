# valheim-remmidemmi-webinterface

Voraussetzungen:
git und nodeJS installiert, der gewählte Port muss freigeben werden. Getestet unter nodeJS 12.14.0.

1. Repo klonen:
`git clone https://github.com/BenjaminKauer/valheim-remmidemmi-webinterface.git`
2. In Repo navigieren
`cd valheim-remmidemmi-webinterface`
3. Abhängigkeiten installieren
`npm i`
4. In binary Ordner navigieren
`cd bin`
5. Konfiguration bearbeiten (z.B. mit nano)
`nano .conf`
6. Ändere Passwort, schließe nano (optional: Ändere Port)
7. Node Process-Manager (PM2) global installieren
`npm i -g pm2`
8. Applikation als Daemon starten
`pm2 start -n valheim-ui app.js`
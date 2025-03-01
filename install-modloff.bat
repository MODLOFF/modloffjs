@echo off
echo ===================================
echo MODLOFF Kurulum Sihirbazi
echo ===================================
echo.

:: Node.js kontrolü
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [!] Node.js bulunamadi!
    echo [!] Lutfen once Node.js'i yukleyin: https://nodejs.org
    echo.
    pause
    exit /b 1
)

:: Git kontrolü
where git >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [!] Git bulunamadi!
    echo [!] Lutfen once Git'i yukleyin: https://git-scm.com
    echo.
    pause
    exit /b 1
)

echo [+] Gerekli yazilimlar kontrol edildi
echo [+] Node.js ve Git kurulu
echo.

:: Kurulum dizini belirleme
set INSTALL_DIR=%USERPROFILE%\AppData\Roaming\npm\node_modules\modloff
echo [+] Kurulum dizini: %INSTALL_DIR%

:: Eski kurulumu temizle
if exist "%INSTALL_DIR%" (
    echo [+] Eski kurulum temizleniyor...
    rd /s /q "%INSTALL_DIR%"
)

:: Kurulum dizinini oluştur
mkdir "%INSTALL_DIR%"
cd /d "%INSTALL_DIR%"

echo [+] MODLOFF indiriliyor...
git clone https://github.com/MODLOFF/modloffjs.git .

if %ERRORLEVEL% NEQ 0 (
    echo [!] MODLOFF indirilemedi!
    echo [!] Lutfen internet baglantinizi kontrol edin
    cd /d "%USERPROFILE%"
    rd /s /q "%INSTALL_DIR%"
    pause
    exit /b 1
)

echo [+] Bagimliliklar yukleniyor...
call npm install --production

if %ERRORLEVEL% NEQ 0 (
    echo [!] Bagimliliklar yuklenemedi!
    cd /d "%USERPROFILE%"
    rd /s /q "%INSTALL_DIR%"
    pause
    exit /b 1
)

:: CLI bağlantısını oluştur
echo [+] CLI baglantisi olusturuluyor...
if not exist "%USERPROFILE%\AppData\Roaming\npm" mkdir "%USERPROFILE%\AppData\Roaming\npm"
echo @echo off > "%USERPROFILE%\AppData\Roaming\npm\modloff.cmd"
echo node "%INSTALL_DIR%\src\cli.js" %%* >> "%USERPROFILE%\AppData\Roaming\npm\modloff.cmd"

echo.
echo ===================================
echo MODLOFF basariyla kuruldu!
echo.
echo Kullanim:
echo   modloff --version
echo   modloff new proje-adi
echo   modloff run dosya.modloff
echo ===================================
echo.

:: PATH kontrolü
echo [+] PATH kontrolu yapiliyor...
where modloff >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [!] UYARI: modloff komutu PATH'e eklenemedi
    echo [!] Sistemi yeniden baslatmayi deneyin
    echo.
)

echo [+] Kurulum tamamlandi! Kullanmaya baslayabilirsiniz.
echo [+] Sistemi yeniden baslatmaniz onerilir.
echo.
pause

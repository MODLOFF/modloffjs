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

:: Geçici dizin oluştur
set TEMP_DIR=%TEMP%\modloff-temp
if exist "%TEMP_DIR%" rd /s /q "%TEMP_DIR%"
mkdir "%TEMP_DIR%"
cd /d "%TEMP_DIR%"

echo [+] MODLOFF indiriliyor...
git clone https://github.com/MODLOFF/modloffjs.git .

if %ERRORLEVEL% NEQ 0 (
    echo [!] MODLOFF indirilemedi!
    echo [!] Lutfen internet baglantinizi kontrol edin
    cd /d "%USERPROFILE%"
    rd /s /q "%TEMP_DIR%"
    pause
    exit /b 1
)

echo [+] Bagimliliklar yukleniyor...
call npm install

if %ERRORLEVEL% NEQ 0 (
    echo [!] Bagimliliklar yuklenemedi!
    cd /d "%USERPROFILE%"
    rd /s /q "%TEMP_DIR%"
    pause
    exit /b 1
)

echo [+] MODLOFF global olarak kuruluyor...
call npm link

if %ERRORLEVEL% NEQ 0 (
    echo [!] MODLOFF kurulumu tamamlanamadi!
    cd /d "%USERPROFILE%"
    rd /s /q "%TEMP_DIR%"
    pause
    exit /b 1
)

:: Temizlik
cd /d "%USERPROFILE%"
rd /s /q "%TEMP_DIR%"

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
echo.
pause

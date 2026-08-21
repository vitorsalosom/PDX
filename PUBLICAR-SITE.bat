@echo off
chcp 65001 > nul
title Publicar site PDX
color 0D

echo.
echo  ===========================================
echo    PUBLICAR O SITE PDX
echo  ===========================================
echo.
echo  Este atalho baixa a versao mais recente do site
echo  (incluindo o que o cliente editou no painel)
echo  e publica no ar.
echo.
pause

set PASTA=%TEMP%\pdx-publicar
if exist "%PASTA%" rmdir /s /q "%PASTA%"
mkdir "%PASTA%" 2>nul

echo.
echo  [1 de 3] Baixando a versao mais recente...
curl -L -s -o "%PASTA%\site.zip" https://github.com/vitorsalosom/PDX/archive/refs/heads/main.zip
if not exist "%PASTA%\site.zip" goto erro_download

echo  [2 de 3] Preparando os arquivos...
tar -xf "%PASTA%\site.zip" -C "%PASTA%"
if not exist "%PASTA%\PDX-main\index.html" goto erro_arquivos

echo  [3 de 4] Limpando fotos que nao estao sendo usadas...
cd /d "%PASTA%\PDX-main"
node limpar-fotos-sem-uso.js

echo.
echo  [4 de 4] Publicando no Firebase...
echo.
call firebase deploy --only hosting --project pagode-do-xando
if errorlevel 1 goto erro_deploy

echo.
echo  ===========================================
echo    PRONTO! O site esta no ar.
echo    https://pagodedoxando.web.app
echo  ===========================================
echo.
rmdir /s /q "%PASTA%" 2>nul
pause
exit /b 0

:erro_download
echo.
echo  ERRO: nao consegui baixar os arquivos.
echo  Verifique sua conexao com a internet.
goto fim

:erro_arquivos
echo.
echo  ERRO: os arquivos baixados vieram incompletos.
echo  Tente novamente em alguns instantes.
goto fim

:erro_deploy
echo.
echo  ERRO ao publicar.
echo  Se aparecer algo sobre login, rode no terminal:
echo     firebase login
goto fim

:fim
echo.
pause
exit /b 1

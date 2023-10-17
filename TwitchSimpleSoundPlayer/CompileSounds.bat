@echo off

set /A first=1
set comma=,

SET a=,
SET b=World
SET c=%a% %b%!

break>"Sounds.js"
(
echo let SOUNDS_LIST = [
for /f tokens^=* %%i in ('where ./Sounds:*') do (
  echo     "%%~ni"%a%
)
echo ]
)>"Sounds.js"
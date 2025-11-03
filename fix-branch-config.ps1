Write-Host "Fixing Jenkins Branch Configuration" -ForegroundColor Green
Write-Host "====================================" -ForegroundColor Green

Write-Host "`nThe error shows Jenkins is looking for 'master' branch but your repo uses 'main' branch." -ForegroundColor Yellow

Write-Host "`nSTEP-BY-STEP FIX:" -ForegroundColor Cyan

Write-Host "`n1. GO TO YOUR JENKINS JOB:" -ForegroundColor Yellow
Write-Host "   • Open: http://localhost:8080/job/hospital-management-system/" -ForegroundColor White

Write-Host "`n2. CLICK CONFIGURE:" -ForegroundColor Yellow
Write-Host "   • Click 'Configure' on the left sidebar" -ForegroundColor White

Write-Host "`n3. FIND BRANCH SETTING:" -ForegroundColor Yellow
Write-Host "   • Scroll down to 'Pipeline' section" -ForegroundColor White
Write-Host "   • Find 'Branches to build' or 'Branch Specifier'" -ForegroundColor White

Write-Host "`n4. CHANGE BRANCH:" -ForegroundColor Yellow
Write-Host "   • Change from '*/master' to '*/main'" -ForegroundColor White
Write-Host "   • Make sure it says exactly: */main" -ForegroundColor White

Write-Host "`n5. SAVE:" -ForegroundColor Yellow
Write-Host "   • Click 'Save'" -ForegroundColor White

Write-Host "`n6. RUN PIPELINE:" -ForegroundColor Yellow
Write-Host "   • Click 'Build Now'" -ForegroundColor White
Write-Host "   • The pipeline should now work!" -ForegroundColor White

Write-Host "`nALTERNATIVE: DELETE AND RECREATE JOB" -ForegroundColor Cyan
Write-Host "   If the above doesn't work:" -ForegroundColor White
Write-Host "   • Delete the current 'hospital-management-system' job" -ForegroundColor White
Write-Host "   • Create a new Pipeline job" -ForegroundColor White
Write-Host "   • Set 'Branches to build' to '*/main' during creation" -ForegroundColor White

Write-Host "`nDIRECT LINKS:" -ForegroundColor Cyan
Write-Host "   • Job Configuration: http://localhost:8080/job/hospital-management-system/configure" -ForegroundColor White
Write-Host "   • Jenkins Dashboard: http://localhost:8080" -ForegroundColor White
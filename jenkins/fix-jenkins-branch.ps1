Write-Host "Jenkins Branch Configuration Fix" -ForegroundColor Green
Write-Host "=================================" -ForegroundColor Green

Write-Host "`nThe error occurred because Jenkins is looking for 'master' branch but your repo uses 'main' branch." -ForegroundColor Yellow

Write-Host "`nTO FIX THIS:" -ForegroundColor Cyan
Write-Host "1. Go to your Jenkins pipeline: http://localhost:8080/job/hospital-management-system/" -ForegroundColor White
Write-Host "2. Click 'Configure' on the left sidebar" -ForegroundColor White
Write-Host "3. Scroll down to 'Pipeline' section" -ForegroundColor White
Write-Host "4. Find 'Branches to build'" -ForegroundColor White
Write-Host "5. Change from '*/master' to '*/main'" -ForegroundColor White
Write-Host "6. Click 'Save'" -ForegroundColor White
Write-Host "7. Click 'Build Now' to run the pipeline" -ForegroundColor White

Write-Host "`nALTERNATIVELY, you can create a new pipeline with correct settings:" -ForegroundColor Cyan
Write-Host "• Delete the current 'hospital-management-system' job" -ForegroundColor White
Write-Host "• Create a new Pipeline job" -ForegroundColor White
Write-Host "• Set 'Branches to build' to '*/main' during creation" -ForegroundColor White
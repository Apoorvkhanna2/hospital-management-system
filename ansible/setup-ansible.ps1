Write-Host "Setting up Ansible for Hospital Management System" -ForegroundColor Green

# Check if Ansible is installed
try {
    ansible --version
    Write-Host "✅ Ansible is installed" -ForegroundColor Green
} catch {
    Write-Host "❌ Ansible is not installed. Installing..." -ForegroundColor Yellow
    pip install ansible
}

Write-Host "`nAnsible Setup Complete!" -ForegroundColor Green
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Update inventory.ini with your server IP and SSH key path" -ForegroundColor White
Write-Host "2. Run: ansible-playbook -i inventory.ini playbook.yml --extra-vars 'dockerhub_username=apoorv468 dockerhub_token=YOUR_TOKEN'" -ForegroundColor White
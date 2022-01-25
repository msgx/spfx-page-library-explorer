# This script checks if PnP PowerShell module is available and installs it if needed

$MODULE_NAME = "PnP.PowerShell";

Write-Output "Checking if PnP PowerShell installed:";
$modules = Get-InstalledModule -Name $MODULE_NAME -AllVersions -ErrorAction SilentlyContinue;
if ($modules -eq $null) {
  if ((Get-Command -Module PowerShellGet).Count -eq 0) {
    Write-Output "NuGet package provider is not available, installing it...";
    Install-PackageProvider -Name NuGet -Scope CurrentUser -Force | Out-Null;
  }
  Write-Output "Installing PnP PowerShell...";
  Install-Module -Name $MODULE_NAME -Scope CurrentUser -Force -ErrorAction Stop;
}
else {
  Write-Output "PnP PowerShell is already installed";
}

Write-Output "Available PnP PowerShell versions:";
Get-InstalledModule -Name $MODULE_NAME -AllVersions | Select-Object Name,Version,InstalledLocation;

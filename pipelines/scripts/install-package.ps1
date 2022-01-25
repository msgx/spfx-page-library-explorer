# This script installs SPFx solution by following this steps:
# 1. upload SPFx package to the site collection App Catalog;
# 2. deploy the package to the site collection;
# 3. add the solution app to the root site of the site collection.

param (
  [Parameter(Mandatory=$true)][string]$package,  # full path to package file
  [Parameter(Mandatory=$true)][string]$url,      # target site collection URL
  [Parameter(Mandatory=$true)][string]$login,    # deployment app client ID
  [Parameter(Mandatory=$true)][string]$password  # deployment app client secret
)

Write-Output "Connecting to '$url'...";
Connect-PnPOnline -Url $url -ClientId $login -ClientSecret $password;

$packageFilename = Split-Path -Path $package -Leaf;
Write-Output "Uploading SPFx package '$packageFilename' to site collection App Catalog...";
$app = Add-PnPApp -Path $package -Scope Site -Publish -Overwrite;
$appId = $app.Id;
$appTitle = $app.Title;
$appCatalogVersion = $app.AppCatalogVersion;
$appInstalledVersion = $app.InstalledVersion;
Write-Output "- package version: $appCatalogVersion";
Write-Output "- instance ID: $appId";
if ($appInstalledVersion -eq $null) {
  Write-Output "Installing '$appTitle' v$appCatalogVersion to the site collection...";
  Install-PnPApp -Scope Site -Identity $appId -Wait;
  Write-Output "Done";
}
elseif ($app.CanUpgrade -eq $true) {
  Write-Output "Upgrading '$appTitle' from v$appInstalledVersion to v$appCatalogVersion in the site collection...";
  Update-PnPApp -Scope Site -Identity $appId;
  Write-Output "Done";
}
else {
  Write-Output "The latest version of '$appTitle' (v$appInstalledVersion) has already been installed.";
}

# This script applies PnP provisioning template to the specified site.

param (
  [Parameter(Mandatory=$true)][string]$template,    # full path to template file
  [Parameter(Mandatory=$true)][string]$url,         # target site collection URL
  [Parameter(Mandatory=$true)][string]$clientId,    # deployment app client ID
  [Parameter(Mandatory=$true)][string]$clientSecret # deployment app client secret
)

Write-Output "Connecting to '$url'...";
Connect-PnPOnline -Url $url -ClientId $clientId -ClientSecret $clientSecret -WarningAction Ignore;

Write-Output "Applying PnP provisioning template...";
Invoke-PnPSiteTemplate -Path "$template";

$token = "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"
$repo = "denilsonsiewert/tv-ete"
$branch = "main"
$localFolder = "C:\\ExportTV"

function Upload-File($localPath, $remotePath) {
    $content = [System.Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes((Get-Content $localPath -Raw)))
    $url = "https://api.github.com/repos/$repo/contents/$remotePath"
    $headers = @{Authorization = "token $token"; "User-Agent" = "PowerShell"}
    $sha = $null
    try {
        $existing = Invoke-RestMethod -Uri $url -Headers $headers -Method GET
        $sha = $existing.sha
    } catch {}
    $body = @{message="Atualização automática";content=$content;branch=$branch}
    if ($sha) { $body.sha = $sha }
    $jsonBody = $body | ConvertTo-Json -Depth 10
    Invoke-RestMethod -Uri $url -Method PUT -Headers $headers -Body $jsonBody
}

Upload-File "$localFolder\\dados.json" "dados.json"
$grafFolder = "$localFolder\\Graficos"
Get-ChildItem $grafFolder -Filter *.png | ForEach-Object {
    $remotePath = "Graficos/$($_.Name)"
    Upload-File $_.FullName $remotePath
}
Write-Host "Upload concluído!"

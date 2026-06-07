# fetch_videos.ps1
# Safe downloader that places sample videos into public/videos
# Run from project root:
#   powershell -ExecutionPolicy Bypass -File .\fetch_videos.ps1


# Per-file source lists (primary then fallback mirrors)
$videoSources = @{
    'video-1.mp4' = @(
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
        'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4'
    )
    'video-2.mp4' = @(
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
        'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_5mb.mp4'
    )
    'video-3.mp4' = @(
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
        'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_10mb.mp4'
    )
    'video-4.mp4' = @(
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
        'https://sample-videos.com/video123/mp4/720/sample_960x400_ocean_with_audio.mp4'
    )
    'marketing-1.mp4' = @(
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        'https://sample-videos.com/video123/mp4/720/sample_960x400_ocean_with_audio.mp4'
    )
    'content-1.mp4' = @(
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4'
    )
}

$targetDir = Join-Path $PSScriptRoot 'public/videos'
if (-not (Test-Path $targetDir)) {
    New-Item -ItemType Directory -Path $targetDir -Force | Out-Null
}

foreach ($name in $videoSources.Keys) {
    $sources = $videoSources[$name]
    $out = Join-Path $targetDir $name
    if (Test-Path $out) {
        Write-Host ('Skipping {0} - file already exists.' -f $name) -ForegroundColor Yellow
        continue
    }

    $downloaded = $false
    foreach ($url in $sources) {
        Write-Host ('Trying {0} -> {1}' -f $name, $url)
        try {
            Invoke-WebRequest -Uri $url -OutFile $out -UseBasicParsing -ErrorAction Stop
            Write-Host ('Saved: {0}' -f $out) -ForegroundColor Green
            $downloaded = $true
            break
        }
        catch {
            Write-Host ('Failed: {0} ({1})' -f $url, $_.Exception.Message) -ForegroundColor Yellow
        }
    }

    if (-not $downloaded) {
        Write-Host ('All sources failed for {0}.' -f $name) -ForegroundColor Red
    }
}

Write-Host 'Done. Restart your dev server and test the Creative Ventures section.' -ForegroundColor Cyan
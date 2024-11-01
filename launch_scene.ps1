# Function to check for node_modules folder and run npm install if necessary
function Check-And-Install-Dependencies {
    param (
        [string]$path
    )
    if (-Not (Test-Path "$path\node_modules")) {
        Write-Output "Installing dependencies in $path"
        Push-Location $path
        npm install
        Pop-Location
    }
}

# Paths to check
$paths = @(
    "./main-scene",
    "./room-scene-1",
    "./room-scene-2"
)

# Check each path and install dependencies if needed
foreach ($path in $paths) {
    Check-And-Install-Dependencies -path $path
}

# Menu options
$options = @(
    "main-scene",
    "room-scene-1",
    "room-scene-2",
    "exit"
)

# Function to display the menu
function Show-Menu {
    param (
        [array]$options
    )
    $selectedIndex = 0

    while ($true) {
        Clear-Host
        for ($i = 0; $i -lt $options.Length; $i++) {
            if ($i -eq $selectedIndex) {
                Write-Host "-> $($options[$i])" -ForegroundColor Yellow
            } else {
                Write-Host "   $($options[$i])"
            }
        }

        $key = $host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

        switch ($key.VirtualKeyCode) {
            38 { # Up arrow
                if ($selectedIndex -gt 0) {
                    $selectedIndex--
                }
            }
            40 { # Down arrow
                if ($selectedIndex -lt $options.Length - 1) {
                    $selectedIndex++
                }
            }
            13 { # Enter
                return $options[$selectedIndex]
            }
        }
    }
}

# Show the menu and get the selected option
$selectedOption = Show-Menu -options $options

# Exit if the selected option is exit
if ($selectedOption -eq "exit") {
    Write-Host "Exiting..."
    exit
}

# Change to the selected directory and run commands
Write-Host "Switching to $selectedOption and running commands"
Push-Location "./$selectedOption"
npm run link-shared
npm run start
Pop-Location

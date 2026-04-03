#python ZSSR_real.py --scale 2 --shave 4 --train_lr '../RealworldData/Data/DIAlign/iPhone11_wideSRTele/Fair/out_20_warp.png' --train_hr '../RealworldData/Data/DIAlign/iPhone11_wideSRTele/Fair/HR.png' --test_lr '../RealworldData/Data/WideView/Fair.jpeg' --test_hr '../RealworldData/Data/TeleView/Fair.jpeg' --Invari_map '../RealworldData/Data/DIAlign/iPhone11_wideSRTele/Fair/PatchDisOut.npy' --output_path './Results_Real_Fair/' --dataset 'iPhone11_wideSRTele/Fair'

#python ZSSR_real.py --scale 2 --shave 4 --train_lr 'D:\ZeDuSR\zedusr\RealworldData\Data\DIAlign\iPhone11_wideSRTele\Car\out_20_warp.png' --train_hr 'D:\ZeDuSR\zedusr\RealworldData\Data\DIAlign\iPhone11_wideSRTele\Car\HR.png' --test_lr 'D:\ZeDuSR\zedusr\RealworldData\Data\WideView\Car.jpeg' --test_hr 'D:\ZeDuSR\zedusr\RealworldData\Data\TeleView\Car.jpeg' --Invari_map 'D:\ZeDuSR\zedusr\RealworldData\Data\DIAlign\iPhone11_wideSRTele\Car\PatchDisOut.npy' --output_path '.\Results_Real_Cat\' --dataset 'iPhone11_wideSRTele\Car'


# Run ZSSR_real.py script (PowerShell version)

$python = "python"

# Full path to the ZSSR_real.py script
$script = "D:\ZeDuSR\zedusr\SR\ZSSR_real.py"

# Input and output paths
$train_lr = "D:\ZeDuSR\zedusr\RealworldData\Data\DIAlign\iPhone11_wideSRTele\Car\out_20_warp.png"
$train_hr = "D:\ZeDuSR\zedusr\RealworldData\Data\DIAlign\iPhone11_wideSRTele\Car\HR.png"
$test_lr = "D:\ZeDuSR\zedusr\RealworldData\Data\WideView\Car.jpeg"
$test_hr = "D:\ZeDuSR\zedusr\RealworldData\Data\TeleView\Car.jpeg"
$invari_map = "D:\ZeDuSR\zedusr\RealworldData\Data\DIAlign\iPhone11_wideSRTele\Car\PatchDisOut.npy"
$output_path = ".\Results_Real_Car\"
$dataset = "iPhone11_wideSRTele\Car"

# Run the script
& $python $script `
    --scale 2 `
    --shave 4 `
    --train_lr $train_lr `
    --train_hr $train_hr `
    --test_lr $test_lr `
    --test_hr $test_hr `
    --Invari_map $invari_map `
    --output_path $output_path `
    --dataset $dataset


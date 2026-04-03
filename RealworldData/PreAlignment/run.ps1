# python C:/BSG team_z/PYTHON/zareen/ZeDuSR/RealworldData/PreAlignment/sift_align.py --mode 'iphone11_wideSRTele' --wide_dir 'C:/BSG team_z/PYTHON/zareen/ZeDuSR/RealworldData/Data/WideView' --tele_dir 'C:/BSG team_z/PYTHON/zareen/ZeDuSR/RealworldData/Data/TeleView' --Tele_savePath 'C:/BSG team_z/PYTHON/zareen/ZeDuSR/RealworldData/Data/TeleView_SIFTAlign' --WideCrop_savePath 'C:/BSG team_z/PYTHON/zareen/ZeDuSR/RealworldData/Data/WideView_crop' 

# python3 "/home/bxg-server/zareen/ZeDuSR/RealworldData/PreAlignment/sift_align.py" `
# --mode "iphone11_wideSRTele" `
# --wide_dir "/home/bxg-server/zareen/ZeDuSR/RealworldData/Data/WideView" `
# --tele_dir "/home/bxg-server/zareen/ZeDuSR/RealworldData/Data/TeleView" `
# --Tele_savePath "/home/bxg-server/zareen/ZeDuSR/RealworldData/Data/TeleView_SIFTAlign" `
# --WideCrop_savePath "/home/bxg-server/zareen/ZeDuSR/RealworldData/Data/WideView_crop"

#python3 ./sift_align.py --mode 'iphone11_wideSRTele' --wide_dir '../Data/WideView' --tele_dir '../Data/TeleView' --Tele_savePath '../Data/TeleView_SIFTAlign' --WideCrop_savePath '../Data/WideView_crop' 

#for .sh file
#python .\sift_align.py --mode "iphone11_wideSRTele" --wide_dir "..\Data\WideView" --tele_dir "..\Data\TeleView" --Tele_savePath "..\Data\TeleView_SIFTAlign" --WideCrop_savePath "..\Data\WideView_crop"


# Run SIFT alignment script (PowerShell version)

python .\sift_align.py `
    --mode "iphone11_wideSRTele" `
    --wide_dir "..\Data\WideView" `
    --tele_dir "..\Data\TeleView" `
    --Tele_savePath "..\Data\TeleView_SIFTAlign" `
    --WideCrop_savePath "..\Data\WideView_crop"
